import React, { useState } from "react";
import "./SubscribePage.css";

const SubscribePage = () => {
  const [email, setEmail] = useState(""); 
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false); 

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubscribe = async (e) => {
    e.preventDefault(); 

    if (!email.trim()) {
      alert("Please enter an email address!");
      return;
    }
    if (!validateEmail(email)) {
      alert("Please enter a valid email address!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:4000/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubscribed(true);
        setEmail(""); 
        setTimeout(() => setSubscribed(false), 3000); // Hide success message after 3 sec
      } else {
        alert(data.message || "Failed to subscribe!");
      }
    } catch (error) {
      console.error("Error subscribing:", error);
      alert("An error occurred while subscribing!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="subscribe-container">
      <h2>Subscribe to our Blog</h2>
      {!subscribed ? (
        <form className="subscription-form" onSubmit={handleSubscribe}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="email-input"
            disabled={loading} // Disable input while loading
          />
          <button type="submit" className="subscribe-btn" disabled={loading}>
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
      ) : (
        <p className="success-message">✅ Subscription added successfully!</p>
      )}
    </div>
  );
};

export default SubscribePage;
