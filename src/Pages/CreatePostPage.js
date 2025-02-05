import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import './CreatePostPage.css';

const CreatePostPage = () => {
  const [title, setTitle] = useState('');
  const [customTitle, setCustomTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [externalLink, setExternalLink] = useState('');
  const navigate = useNavigate();

  const predefinedTitles = [
    "Introduction to Blogging",
    "How to Write Engaging Content",
    "Monetizing Your Blog",
    "Tech Trends of 2025",
    "Healthy Living Tips",
    "Travel Diaries",
    "Other"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || (title === "Other" && !customTitle) || !content || !author || !category) {
      alert('Please fill all the required fields');
      return;
    }

    const blogData = {
      title: title === "Other" ? customTitle : title, // Use custom title if "Other" is selected
      content,
      author,
      category,
      externalLink,
    };

    try {
      const response = await fetch('https://blog-backend-jd7l.onrender.com/blogs/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogData),
      });

      const data = await response.json();
      if (response.status === 200) {
        alert(data.message);
        navigate('/myblogs');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error creating blog:', error);
      alert('There was an error creating your blog. Please try again.');
    }
  };

  return (
    <div>
      <Header />
      <div className="create-blog-form">
        <h2>Create Blog</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
          <div className="form-group">
            <label>Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>
            <label>Title</label>
            <select value={title} onChange={(e) => setTitle(e.target.value)} required>
              <option value="">Select a Title</option>
              {predefinedTitles.map((t, index) => (
                <option key={index} value={t}>{t}</option>
              ))}
            </select>
            {title === "Other" && (
              <input
                type="text"
                placeholder="Enter custom title"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                required
              />
            )}
          </div>
          <div className="form-group">
            <label>Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>External Link (optional)</label>
            <input
              type="text"
              value={externalLink}
              onChange={(e) => setExternalLink(e.target.value)}
            />
          </div>
          <button className='btn-type' type="submit">Post Blog</button>
        </form>
      </div>
    </div>
  );
};

export default CreatePostPage;
