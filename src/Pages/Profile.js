import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [name] = useState('Kavi');
  const [portfolioLink] = useState('https://kavishanthinig.github.io/Professional_Portfolio/');
  const [profileImage, setProfileImage] = useState("https://cdn-icons-png.flaticon.com/512/9131/9131529.png");

  // Function to handle closing the profile page
  const handleClose = () => {
    navigate(-1);
  };

  // Function to handle logout
  const handleLogout = () => {
    navigate('/login');
  };

  // Function to handle changing the profile picture
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  return (
    <div className="profile-container-wrapper">
      <div className="profile-sidebar">
        <button className="close-btn" onClick={handleClose}>✖</button>
        <h1>Profile</h1>

        <div className="profile-container">
          <div className="profile-image" style={{ backgroundImage: `url(${profileImage})` }}></div>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageChange} 
            style={{ display: 'none' }} 
            id="fileInput"
          />
          <button className="change-photo-btn" onClick={() => document.getElementById('fileInput').click()}>
            Change Photo
          </button>
          
          <div className="profile-details">
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Portfolio : </strong>
              <a href={portfolioLink} target="_blank" rel="noopener noreferrer">
                {portfolioLink}
              </a>
            </p>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
