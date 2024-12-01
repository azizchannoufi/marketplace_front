import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginSignup.css';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from '../../firebase-config'; // Firebase app initialization
import axios from 'axios';

function LoginSignup({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true); // Initially set to true for Login view
  const [email, setEmail] = useState(''); // State for email
  const [password, setPassword] = useState(''); // State for password
  const [fullName, setFullName] = useState(''); // State for full name (signup)
  const [role, setRole] = useState(''); // State for role (signup)

  const toggleForm = () => {
    setIsLogin(!isLogin); // Toggle between Login and Signup views
    setEmail(''); // Reset email
    setPassword(''); // Reset password
    setFullName(''); // Reset full name
    setRole(''); // Reset role
  };

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth(app);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const token = await user.getIdToken();
  
      // Enregistrer le uid et le token dans le localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('uid', user.uid);
  
      // Appeler la fonction de parent pour mettre à jour l'état
      onLogin({ uid: user.uid });
  
      alert('Login successful!');
    } catch (error) {
      console.error('Login error:', error.message);
      alert('Invalid email or password');
    }
  };
  // Signup handler
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // const auth = getAuth(app);
      // const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // const user = userCredential.user;

      // Send additional user info to backend
      await axios.post('http://localhost:3001/api/users', {
        email,
        password,
        full_name: fullName,
        role,
      });

      alert('Signup successful! You can now log in.');
      toggleForm(); // Switch to login form
    } catch (error) {
      console.error('Signup error:', error.message);
      alert('Signup failed. Please try again.');
    }
  };

  return (
    <div className="login-signup-container d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: '400px' }}>
        <div className={`form-container ${isLogin ? 'show-login' : 'show-signup'}`}>
          {isLogin ? (
            <div className="login-form">
              <h2 className="text-center mb-4">Login</h2>
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mt-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100 mt-4">
                  Login
                </button>
              </form>
              <p className="text-center mt-3">
                Don’t have an account?{' '}
                <span onClick={toggleForm} className="toggle-link text-primary" style={{ cursor: 'pointer' }}>
                  Sign up here
                </span>
              </p>
            </div>
          ) : (
            <div className="signup-form">
              <h2 className="text-center mb-4">Sign Up</h2>
              <form onSubmit={handleSignup}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mt-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mt-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mt-3">
                  <select
                    className="form-control"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                  >
                    <option value="">Select Role</option>
                    <option value="visiteur">Visiteur</option>
                    <option value="vendeur">Vendeur</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-success w-100 mt-4">
                  Sign Up
                </button>
              </form>
              <p className="text-center mt-3">
                Already have an account?{' '}
                <span onClick={toggleForm} className="toggle-link text-success" style={{ cursor: 'pointer' }}>
                  Log in here
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginSignup;
