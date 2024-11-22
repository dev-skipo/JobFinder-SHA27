const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    requirement: { type: String, required: true },
    salary: { type: Number, required: true },
    position: { type: String, enum: ['hiring', 'looking for job'], required: true },
    terms: { type: String, enum: ['full time', 'part time', 'contract', 'freelance', 'internship', 'remote'], required: true },
    location: { type: String, required: true },
    contactInfo: { type: String, required: true },
    postedAt: { type: Date, default: Date.now },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // User posted
});

module.exports = mongoose.model('Post', PostSchema);