import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IndexPage from "./Pages/IndexPage";
import RegisterPage from "./Pages/RegistrationPage";
import BlogPage from "./Pages/BlogPage";
import CreatePostPage from "./Pages/CreatePostPage";
import LoginPage from './Pages/LoginPage';
import HomePage from './Pages/HomePage'; 
import { UserContextProvider } from "./UserContext";
import ProfilePage from './Pages/Profile';
import SubscribePage from './Pages/SubscribePage';

const App = () => {
  const [posts, setPosts] = useState([]); 

  return (
    <UserContextProvider>
      <Router>
        <div>
          <Routes>
            <Route 
              path="/home" 
              element={<HomePage posts={posts} setPosts={setPosts} />} 
            />  
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<IndexPage />} />
            <Route path="/subscribe" element={<SubscribePage />} />
            <Route 
              path="/create" 
              element={<CreatePostPage posts={posts} setPosts={setPosts} />} 
            />
            <Route 
              path="/myblogs" 
              element={<BlogPage posts={posts} />} 
            />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </div>
      </Router>
    </UserContextProvider>
  );
};

export default App;
