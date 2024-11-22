// backend/controllers/postController.js
const Post = require('../models/Post');

exports.createPost = async (req, res) => {
    const { title, description, requirement, salary, position, terms, location, contactInfo } = req.body;

    try {
        const newPost = new Post({
            title,
            description,
            requirement,
            salary,
            position,
            terms,
            location,
            contactInfo,
            userId: req.user.id // Get user ID from the authenticated request
        });

        await newPost.save();
        res.status(201).json({ message: 'Post created successfully', postId: newPost._id });
    } catch (error) {
        res.status(500).json({ error });
    }
};

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('userId', 'fullName'); // Optionally populate user info if needed
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error });
    }
};

exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('userId', 'fullName'); // Populate userId with fullName
        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.json(post);
    } catch (error) {
        res.status(500).json({ error });
    }
};

exports.updatePost = async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPost) return res.status(404).json({ message: 'Post not found' });
        res.json(updatedPost);
    } catch (error) {
        res.status(500).json({ error });
    }
};

exports.deletePost = async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        if (!deletedPost) return res.status(404).json({ message: 'Post not found' });
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ error });
    }
};


// New function to get posts by user ID
exports.getPostsByUserId = async (req, res) => {
    try {
        const posts = await Post.find({ userId: req.params.userId }); // Fetch posts where userId matches
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error });
    }
};


// New function to get related posts by user ID
exports.getRelatedPosts = async (req, res) => {
    try {
        const { userId } = req.params; // Get user ID from request parameters
        const relatedPosts = await Post.find({ userId }).limit(4); // Fetch 4 posts by the same user
        res.json(relatedPosts);
    } catch (error) {
        res.status(500).json({ error });
    }
};