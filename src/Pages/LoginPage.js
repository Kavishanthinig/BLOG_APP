import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import './LoginPage.css';

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();

  // Handle login
  async function login(ev) {
    ev.preventDefault();

    try {
      const response = await fetch("https://blog-backend-jd7l.onrender.com/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const userInfo = await response.json();
        setUserInfo(userInfo);
        alert("Login Successful");
        setRedirect(true);
        
      } else {
        alert("Invalid username or password");
      }
    } catch (err) {
      console.error("Error during login:", err);
      alert("Login failed. Please try again.");
    }
  }
  const handleCreateAccount = () => {
    navigate("/register");
  };

  if (redirect) {
    return <Navigate to="/home" />;
  }

  return (
    <form className="login" onSubmit={login}>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(ev) => setUsername(ev.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
      />
      <button type="submit">Login</button>

      <div className="create-account-container">
        <p>New user?</p>
        <button type="button" onClick={handleCreateAccount}>
          Create Account
        </button>
      </div>
    </form>
  );
}
