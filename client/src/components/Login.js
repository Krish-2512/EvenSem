import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/login', new URLSearchParams({
        username: formData.username,
        password: formData.password,
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      const token = response.data.access_token;
      onLogin(token);
      setMessage({ text: 'Login successful! Redirecting...', type: 'success' });

      const payload = JSON.parse(atob(token.split('.')[1]));
      const role = payload.role;
      setTimeout(() => {
        if (role === 'job_seeker') {
          navigate('/job-openings');
        } else if (role === 'recruiter' || role === 'admin') {
          navigate('/dashboard');
        } else {
          navigate('/job-description');
        }
      }, 1500);
    } catch (error) {
      setMessage({ text: 'Login failed. Please check your credentials.', type: 'error' });
      console.error(error.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '12px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
        padding: '40px',
        width: '100%',
        maxWidth: '450px',
        transition: 'all 0.3s ease',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <h1 style={{
          color: '#2d3748',
          textAlign: 'center',
          marginBottom: '30px',
          fontSize: '28px',
          fontWeight: '600',
          background: 'linear-gradient(to right, #667eea, #764ba2)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>Welcome to CvAlign</h1>

        <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#4a5568',
              fontSize: '14px',
              fontWeight: '500'
            }}>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px 15px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                backgroundColor: '#f8fafc',
                fontSize: '14px',
                transition: 'all 0.3s',
                boxSizing: 'border-box',
                outline: 'none',
                ':focus': {
                  borderColor: '#667eea',
                  boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.2)'
                }
              }}
            />
          </div>

          <div style={{ marginBottom: '25px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#4a5568',
              fontSize: '14px',
              fontWeight: '500'
            }}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px 15px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                backgroundColor: '#f8fafc',
                fontSize: '14px',
                transition: 'all 0.3s',
                boxSizing: 'border-box',
                outline: 'none',
                ':focus': {
                  borderColor: '#667eea',
                  boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.2)'
                }
              }}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '14px',
              backgroundColor: isLoading ? '#a0aec0' : '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s',
              boxShadow: '0 4px 6px rgba(102, 126, 234, 0.3)',
              ':hover': {
                backgroundColor: isLoading ? '#a0aec0' : '#5a67d8',
                transform: 'translateY(-1px)'
              },
              ':active': {
                transform: 'translateY(0)'
              }
            }}
          >
            {isLoading ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ marginRight: '8px' }}>Logging in...</span>
                <div style={{
                  width: '16px',
                  height: '16px',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  borderTopColor: 'white',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  '@keyframes spin': {
                    to: { transform: 'rotate(360deg)' }
                  }
                }}></div>
              </span>
            ) : 'Login'}
          </button>
        </form>

        {message && (
          <div style={{
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '20px',
            backgroundColor: message.type === 'success' ? '#f0fff4' : '#fff5f5',
            color: message.type === 'success' ? '#2f855a' : '#c53030',
            border: `1px solid ${message.type === 'success' ? '#c6f6d5' : '#fed7d7'}`,
            textAlign: 'center',
            fontSize: '14px'
          }}>
            {message.text}
          </div>
        )}

        <p style={{
          textAlign: 'center',
          color: '#718096',
          fontSize: '14px',
          marginTop: '20px'
        }}>
          Don't have an account?{' '}
          <Link to="/register" style={{
            color: '#667eea',
            textDecoration: 'none',
            fontWeight: '600',
            ':hover': {
              textDecoration: 'underline'
            }
          }}>Register here</Link>
        </p>

        <div style={{
          textAlign: 'center',
          marginTop: '20px',
          color: '#a0aec0',
          fontSize: '12px'
        }}>
          By logging in, you agree to our Terms and Privacy Policy
        </div>
      </div>
    </div>
  );
}

export default Login;
