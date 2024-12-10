import React, { useState } from 'react';
import Home from './response';
import { FaPlaneDeparture } from "react-icons/fa";

const allowedUsers = [
  { email: 'test1@gmail.com', password: '123456' },
  { email: 'test2@gmail.com', password: '123456' },
];

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [users, setUsers] = useState(allowedUsers);
  const [newUser, setNewUser] = useState({ email: '', password: '' });

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = allowedUsers.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      setIsLoggedIn(true);
    } else {
      console.log('Invalid email or password');
    }
  };

  const handleRegisterSubmit = (event) => {
    event.preventDefault();
    setUsers([...users, newUser]);
    setIsRegistering(false);
    console.log('User registered:', newUser);
  };

  if (isLoggedIn) {
    return <Home />;
  }

  return (
    <div className="Login ">
      <div className="login-container">
        <div className="login-header">
          <h2>{isRegistering ? 'Register' : 'Login'} <FaPlaneDeparture/></h2>
        </div>
        {isRegistering ? (
          <form onSubmit={handleRegisterSubmit}>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="btn-login">Register</button>
            <button type="button" className="btn-login" onClick={() => setIsRegistering(false)}>Back to Login</button>
          </form>
        ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <br />
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-login">Login</button>
            <button type="button" className="btn-login" onClick={() => setIsRegistering(true)}>Register</button>
          </form>
        )}
      </div>
      <div className="user-table">
        <h2>Registered Users</h2>
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.email}</td>
                <td>{user.password}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Login;