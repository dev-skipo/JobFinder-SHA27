// src/components/PostForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function PostForm() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        requirement: '',
        salary: '',
        position: 'hiring',
        terms: 'full time',
        location: '',
        contactInfo: ''
    });

    const navigate = useNavigate(); // Initialize useNavigate

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token'); // Get JWT token from local storage
            await axios.post('http://localhost:5000/api/posts', formData, {
                headers: {
                    Authorization: `Bearer ${token}` // Include token in headers for authentication
                }
            });
            alert('Post created successfully!');
            navigate('/feeds'); // Redirect to feeds page after successful post creation
        } catch (error) {
            alert('Failed to create post!');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
            <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
            <input name="requirement" placeholder="Requirement" value={formData.requirement} onChange={handleChange} required />
            <input name="salary" placeholder="Salary" type="number" value={formData.salary} onChange={handleChange} required />
            
            <select name="position" value={formData.position} onChange={handleChange}>
                <option value="hiring">Hiring</option>
                <option value="looking for job">Looking for Job</option>
            </select>

            <select name="terms" value={formData.terms} onChange={handleChange}>
                <option value="full time">Full Time</option>
                <option value="part time">Part Time</option>
                <option value="contract">Contract</option>
                <option value="freelance">Freelance</option>
                <option value="internship">Internship</option>
                <option value="remote">Remote</option>
            </select>

            <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
            <input name="contactInfo" placeholder="Contact Info" value={formData.contactInfo} onChange={handleChange} required />

            <button type="submit">Create Post</button>
        </form>
    );
}

export default PostForm;