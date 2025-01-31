import React, { useState } from "react";
import Header from "../Header";
import "./HomePage.css";

const HomePage = () => {
  const defaultBlogs = [
    {
      author: "John Doe",
      title: "Introduction to Blogging",
      description: "Learn the basics of creating your own blog and sharing content with the world."
    },
    {
      author: "Jane Smith",
      title: "How to Write Engaging Content",
      description: "Tips and tricks for writing blog posts that captivate your readers."
    },
    {
      author: "Bob Johnson",
      title: "Monetizing Your Blog",
      description: "Discover different strategies to turn your blog into a source of income."
    },
    {
      author: "Emily White",
      title: "SEO Optimization for Blogs",
      description: "Improve your blog's visibility and ranking with essential SEO techniques."
    }
  ];

  const [showBlogs, setShowBlogs] = useState(false);  // State to control blog visibility

  const toggleBlogs = () => {
    setShowBlogs(prevState => !prevState);  // Toggle the visibility of blogs
  };

  return (
    <div>
      <Header />
      <main className="home-content">
        <h1>Welcome to Blog World!!</h1>
        <p>
          Blog Diaries makes it simple to create, manage, and share your blogs.
          Explore featured posts, connect with like-minded individuals, and grow
          your audience effortlessly.
        </p>

        {/* Featured Blogs Section */}
        <div className="featured-section">
          <button className="show-blogs-btn" onClick={toggleBlogs}>Featured Blogs
          </button>

          {/* Display blogs only when the button is clicked */}
          {showBlogs && (
            <div className="blog-grid">
              {defaultBlogs.map((blog, index) => (
                <div key={index} className="blog-card">
                  <p><strong>Author:</strong> {blog.author}</p>
                  <h3>{blog.title}</h3>
                  
                  <p>{blog.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
