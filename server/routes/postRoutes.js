const express = require('express');
const { createPost, getAllPosts, getPostById, updatePost, deletePost, getRelatedPosts } = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createPost);
router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.put('/:id', authMiddleware, updatePost);
router.delete('/:id', authMiddleware, deletePost);
router.get('/user/:userId', getRelatedPosts); 

module.exports = router;