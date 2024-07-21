import React, { useState } from 'react';
import axios from 'axios';
import "./App.css";

const UserForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `http://localhost:3001/login?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
    try {
      const response = await axios.get(url);
      alert(response.data);
    } catch (error) {
      console.error('Error:', error);
      alert('Error: ' + (error.response ? error.response.data : error.message));
    }
  };

  return (
    <div className="card">
      <h1>User Authentication</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default UserForm;









