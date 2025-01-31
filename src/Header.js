import React from "react";
import { Link } from "react-router-dom"; // For navigation
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <nav className="nav">
        <ul className="nav-links"> {/* Ensure this class is defined in your CSS */}
          <li>
            <Link to="/subscribe">Subscribe</Link>
          </li>
          <li>
            <Link to="/create">Create Post</Link>
          </li>
          <li>
            <Link to="/myblogs">My Blogs</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
