// src/components/EditPost.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditPost() {
    const { id } = useParams(); // Get the post ID from the URL
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
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/posts/${id}`);
                setFormData(response.data);
            } catch (err) {
                alert('Failed to fetch post data');
            }
        };

        fetchPost();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:5000/api/posts/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert('Post updated successfully!');
            navigate(`/feeds/${id}`); // Redirect back to post details after editing
        } catch (err) {
            alert('Failed to update post');
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

            <button type="submit">Update Post</button>
        </form>
    );
}

export default EditPost;