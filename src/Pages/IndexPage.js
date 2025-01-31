import React from 'react';
import { useNavigate } from 'react-router-dom';
import './IndexPage.css';

const Home = () => {
  const navigate = useNavigate();  

  const handleButtonClick = () => {
    navigate('/login');  
  };

  return (
    <div className="home-page">
      <section className="intro-section">
        <h1>Welcome to My Blog!!!</h1>
        <p> Share all your thoughts,ideas and expertise content in the blog! </p>

        <button  className='
        lest-button'onClick={handleButtonClick}>Let's Get Started</button>
      </section>
    </div>
  );
};

export default Home;
