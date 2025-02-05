import React, { useEffect, useState } from 'react';
import Header from '../Header';
import './BlogPage.css';

const MyBlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [updatedBlog, setUpdatedBlog] = useState({
    title: '',
    content: '',
    category: '',
  });
  const [editingPostId, setEditingPostId] = useState(null); // Track which post is being edited

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('https://blog-backend-jd7l.onrender.com/blogs');
        const data = await response.json();
        setBlogs(data.blogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    fetchBlogs();
  }, []);

  const handleUpdate = async (e, blogId) => {
    e.preventDefault(); // Prevent form reload
  
    try {
      const response = await fetch(`https://blog-backend-jd7l.onrender.com/blogs/update/${blogId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBlog), // Send the updated data
      });
  
      if (response.ok) {
        const updatedBlogData = await response.json();
        alert('Blog updated successfully!');
  
        // Update the UI with the updated blog
        setBlogs((prevBlogs) =>
          prevBlogs.map((blog) =>
            blog._id === blogId ? { ...blog, ...updatedBlogData.blog } : blog
          )
        );
  
        // Exit edit mode
        setEditingPostId(null);
        setUpdatedBlog({ title: '', content: '', category: '' });
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Error updating blog');
      }
    } catch (error) {
      console.error('Error updating blog:', error);
      alert('There was an error updating the blog. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://blog-backend-jd7l.onrender.com/blogs/delete/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (response.status === 200) {
        alert(data.message);
        setBlogs(blogs.filter((blog) => blog._id !== id));
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('There was an error deleting the blog. Please try again.');
    }
  };

  const handleFavorite = (blogId) => {
    setBlogs((prevBlogs) =>
      prevBlogs.map((blog) =>
        blog._id === blogId ? { ...blog, isFavorited: !blog.isFavorited } : blog
      )
    );
  };

  return (
    <div>
      <Header />
      <div className="my-blogs">

        {/* Favorited Blogs Section */}
        <h2>F<strong>avorited Blogs</strong></h2>
        <marquee behavior="scroll" direction="left" scrollamount="6">
          <ul>
            {blogs.filter(blog => blog.isFavorited).length > 0 ? (
              blogs.filter(blog => blog.isFavorited).map((blog) => (
                <li key={blog._id}>
                  {editingPostId === blog._id ? (
                    <form onSubmit={(e) => handleUpdate(e, blog._id)}>
                      <h2>Edit Blog Post</h2>
                      <div>
                        <label>Title:</label>
                        <input
                          type="text"
                          value={updatedBlog.title}
                          onChange={(e) => setUpdatedBlog({ ...updatedBlog, title: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label>Content:</label>
                        <textarea
                          value={updatedBlog.content}
                          onChange={(e) => setUpdatedBlog({ ...updatedBlog, content: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label>Category:</label>
                        <input
                          type="text"
                          value={updatedBlog.category}
                          onChange={(e) => setUpdatedBlog({ ...updatedBlog, category: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <button type="submit">Update Post</button>
                        <button type="button" onClick={() => setEditingPostId(null)}>Cancel</button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <h2>Author: {blog.author}</h2>
                      <p><strong>Title:</strong> {blog.title}</p>
                      <p><strong>Content:</strong> {blog.content}</p>
                      <p><em>Category: {blog.category}</em></p>
                      
                      <div>
                        <button onClick={() => {
                          setEditingPostId(blog._id);
                          setUpdatedBlog({ title: blog.title, content: blog.content, category: blog.category });
                        }}>Edit</button>
                        <button onClick={() => handleDelete(blog._id)}>Delete</button>
                        <button onClick={() => handleFavorite(blog._id)}>
                          {blog.isFavorited ? '❤️ Favorited' : '🤍 Favorite'}
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))
            ) : (
              <p>No favorited blogs</p>
            )}
          </ul>
        </marquee>

        {/* All Blogs Section */}
        <h2>All Blogs</h2>
        <ul>
          {blogs.filter(blog => !blog.isFavorited).length > 0 ? (
            blogs.filter(blog => !blog.isFavorited).map((blog) => (
              <li key={blog._id}>
                {editingPostId === blog._id ? (
                  <form onSubmit={(e) => handleUpdate(e, blog._id)}>
                    <h2>Edit Blog Post</h2>
                    <div>
                      <label>Title:</label>
                      <input
                        type="text"
                        value={updatedBlog.title}
                        onChange={(e) => setUpdatedBlog({ ...updatedBlog, title: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label>Content:</label>
                      <textarea
                        value={updatedBlog.content}
                        onChange={(e) => setUpdatedBlog({ ...updatedBlog, content: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label>Category:</label>
                      <input
                        type="text"
                        value={updatedBlog.category}
                        onChange={(e) => setUpdatedBlog({ ...updatedBlog, category: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <button type="submit">Update Post</button>
                      <button type="button" onClick={() => setEditingPostId(null)}>Cancel</button>
                    </div>
                  </form>
                ) : (
                  <>
                    <h2>Author: {blog.author}</h2>
                    <p><strong>Title:</strong> {blog.title}</p>
                    <p><strong>Content:</strong> {blog.content}</p>
                    <p><em>Category: {blog.category}</em></p>
                    
                    <div>
                      <button onClick={() => {
                        setEditingPostId(blog._id);
                        setUpdatedBlog({ title: blog.title, content: blog.content, category: blog.category });
                      }}>Edit</button>
                      <button onClick={() => handleDelete(blog._id)}>Delete</button>
                      <button onClick={() => handleFavorite(blog._id)}>
                        {blog.isFavorited ? '❤️ Favorited' : '🤍 Favorite'}
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))
          ) : (
            <p>No blogs found</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default MyBlogPage;
