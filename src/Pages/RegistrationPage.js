import { useState } from "react";
import './RegistrationPage.css';
import { Navigate } from "react-router-dom";

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); 
  const [messageType, setMessageType] = useState(''); 
  const[redirect,setRedirect]=useState(false);

  async function register(ev) {
    ev.preventDefault();
    try{
    const response = await fetch('http://localhost:4000/register', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.status === 200) {
      setMessage('Registration successful!');
      setMessageType('success');
      setRedirect(true);
    }
    else if(response.status===400){
      setMessage('User Already exists');
    }} catch(err) {
      setMessage('Registration failed. Please try again.');
      setMessageType('error');
    }
  }
  if (redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <form className="register" onSubmit={register}>
      <h1>Register</h1>
      <label>Username</label>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(ev) => setUsername(ev.target.value)}
      />
      <label>Password</label>
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
      />
      <button type="submit">Register</button>
      {message && <p className={`message ${messageType}`}>{message}</p>} 
    </form>
  );
}
