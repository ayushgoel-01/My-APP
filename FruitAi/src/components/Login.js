import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import '../components/Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [signIn, setSignIn] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = signIn ? '/login' : '/register';

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth${endpoint}`, formData);
      navigate('/Home');
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message); // Handle server response error
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  return (
    <div className="container">
      <div className="login-form">
        <h1>{signIn ? 'Login' : 'Register'}</h1>
        <p className="top-para">
          By signing in you are agreeing to our <a href="#">Terms</a> and <a href="#">Privacy Policy</a>
        </p>

        <div className="buttons">
          <p className={`login ${signIn ? 'active' : ''}`} onClick={() => setSignIn(true)}>
            Login
          </p>
          <p className={`register-btn ${!signIn ? 'active' : ''}`} onClick={() => setSignIn(false)}>
            Register
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {!signIn && (
            <div className="form-group">
              <FontAwesomeIcon className="icon" icon={faUser} />
              <input type="text" id="name" placeholder="Name" onChange={handleChange} required />
            </div>
          )}

          <div className="form-group">
            <FontAwesomeIcon className="icon" icon={faEnvelope} />
            <input type="email" id="email" placeholder="Email" onChange={handleChange} required />
          </div>

          <div className="form-group">
            <FontAwesomeIcon className="icon" icon={faLock} />
            <input type="password" id="password" placeholder="Password" onChange={handleChange} required />
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit" className="login-btn">
            {signIn ? 'Login' : 'Register'}
          </button>
        </form>

        <p className="last-p">or connect with</p>

        <div className="social-buttons">
          <div><img src={require('../images/facebook 1.png')} alt="facebook" /></div>
          <div><img src={require('../images/instagram 1.png')} alt="instagram" /></div>
          <div><img src={require('../images/pinterest 1.png')} alt="pinterest" /></div>
          <div><img src={require('../images/linkedin 1.png')} alt="linkedin" /></div>
        </div>

        <div className="fingerprint-icon">
          <img src={require('../images/fingerprint 1.png')} alt="fingerprint" />
        </div>
      </div>
    </div>
  );
};

export default Login;
