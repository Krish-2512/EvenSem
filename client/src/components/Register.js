//import React, { useState } from 'react';
//import axios from 'axios';
//import { Link, useNavigate } from 'react-router-dom';
//
//function Register() {
//  const [formData, setFormData] = useState({ username: '', password: '', role: 'job_seeker' });
//  const [message, setMessage] = useState('');
//  const navigate = useNavigate();
//
//  const handleChange = (e) => {
//    setFormData({ ...formData, [e.target.name]: e.target.value });
//  };
//
//  const handleSubmit = async (e) => {
//    e.preventDefault();
//    try {
//      await axios.post('http://127.0.0.1:8000/register', formData);
//      setMessage('Registration successful! Redirecting to login...');
//      setTimeout(() => navigate('/login'), 2000);
//    } catch (error) {
//      setMessage(error.response?.data?.detail || 'Registration failed.');
//    }
//  };
//
//  return (
//    <div className="App">
//      <h1>Register for CvAlign</h1>
//      <form onSubmit={handleSubmit} className="form">
//        <div>
//          <label className="form-label">Username:</label>
//          <input
//            type="text"
//            name="username"
//            value={formData.username}
//            onChange={handleChange}
//            required
//            className="form-input"
//          />
//        </div>
//        <div>
//          <label className="form-label">Password:</label>
//          <input
//            type="password"
//            name="password"
//            value={formData.password}
//            onChange={handleChange}
//            required
//            className="form-input"
//          />
//        </div>
//        <div>
//          <label className="form-label">Role:</label>
//          <select
//            name="role"
//            value={formData.role}
//            onChange={handleChange}
//            required
//            className="form-input"
//          >
//            <option value="job_seeker">Job Seeker</option>
//            <option value="recruiter">Recruiter</option>
//            <option value="hiring_manager">Hiring Manager</option>
//            <option value="admin">Admin</option>
//          </select>
//        </div>
//        <button type="submit" className="form-button">Register</button>
//      </form>
//      {message && <p className="form-message">{message}</p>}
//      <p>
//        Already have an account? <Link to="/login" className="modal-link">Login here</Link>
//      </p>
//    </div>
//  );
//}
//
//export default Register;


import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'job_seeker'
  });
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post('http://127.0.0.1:8000/register', formData);
      setMessage({
        text: 'Registration successful! Redirecting to login...',
        type: 'success'
      });
      setTimeout(() => navigate('/login'), 1500);
    } catch (error) {
      setMessage({
        text: error.response?.data?.detail || 'Registration failed. Please try again.',
        type: 'error'
      });
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
      background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '16px',
        boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
        padding: '40px',
        width: '100%',
        maxWidth: '500px',
        transition: 'all 0.3s ease',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <h1 style={{
          color: '#2d3748',
          textAlign: 'center',
          marginBottom: '30px',
          fontSize: '32px',
          fontWeight: '700',
          background: 'linear-gradient(to right, #4facfe, #00f2fe)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '0.5px'
        }}>Join CvAlign</h1>

        <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#4a5568',
              fontSize: '14px',
              fontWeight: '600'
            }}>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '14px 16px',
                borderRadius: '10px',
                border: '1px solid #e2e8f0',
                backgroundColor: '#f8fafc',
                fontSize: '15px',
                transition: 'all 0.3s',
                boxSizing: 'border-box',
                outline: 'none',
                ':focus': {
                  borderColor: '#4facfe',
                  boxShadow: '0 0 0 3px rgba(79, 172, 254, 0.2)'
                }
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#4a5568',
              fontSize: '14px',
              fontWeight: '600'
            }}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '14px 16px',
                borderRadius: '10px',
                border: '1px solid #e2e8f0',
                backgroundColor: '#f8fafc',
                fontSize: '15px',
                transition: 'all 0.3s',
                boxSizing: 'border-box',
                outline: 'none',
                ':focus': {
                  borderColor: '#4facfe',
                  boxShadow: '0 0 0 3px rgba(79, 172, 254, 0.2)'
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
              fontWeight: '600'
            }}>Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '14px 16px',
                borderRadius: '10px',
                border: '1px solid #e2e8f0',
                backgroundColor: '#f8fafc',
                fontSize: '15px',
                transition: 'all 0.3s',
                boxSizing: 'border-box',
                outline: 'none',
                cursor: 'pointer',
                appearance: 'none',
                backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%234a5568%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 16px center',
                backgroundSize: '12px',
                ':focus': {
                  borderColor: '#4facfe',
                  boxShadow: '0 0 0 3px rgba(79, 172, 254, 0.2)'
                }
              }}
            >
              <option value="job_seeker">Job Seeker</option>
              <option value="recruiter">Recruiter</option>
              <option value="hiring_manager">Hiring Manager</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '16px',
              backgroundColor: isLoading ? '#a0aec0' : '#4facfe',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s',
              boxShadow: '0 4px 14px rgba(79, 172, 254, 0.35)',
              ':hover': {
                backgroundColor: isLoading ? '#a0aec0' : '#3aa0f6',
                transform: isLoading ? 'none' : 'translateY(-2px)'
              },
              ':active': {
                transform: 'translateY(0)'
              }
            }}
          >
            {isLoading ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ marginRight: '8px' }}>Registering...</span>
                <div style={{
                  width: '18px',
                  height: '18px',
                  border: '3px solid rgba(255, 255, 255, 0.3)',
                  borderTopColor: 'white',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  '@keyframes spin': {
                    to: { transform: 'rotate(360deg)' }
                  }
                }}></div>
              </span>
            ) : 'Create Account'}
          </button>
        </form>

        {message.text && (
          <div style={{
            padding: '14px',
            borderRadius: '10px',
            marginBottom: '20px',
            backgroundColor: message.type === 'success' ? '#f0fff4' : '#fff5f5',
            color: message.type === 'success' ? '#2f855a' : '#c53030',
            border: `1px solid ${message.type === 'success' ? '#c6f6d5' : '#fed7d7'}`,
            textAlign: 'center',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            {message.text}
          </div>
        )}

        <p style={{
          textAlign: 'center',
          color: '#718096',
          fontSize: '15px',
          marginTop: '24px'
        }}>
          Already have an account?{' '}
          <Link to="/login" style={{
            color: '#4facfe',
            textDecoration: 'none',
            fontWeight: '600',
            transition: 'all 0.2s',
            ':hover': {
              color: '#3aa0f6',
              textDecoration: 'underline'
            }
          }}>Sign in here</Link>
        </p>

        <div style={{
          textAlign: 'center',
          marginTop: '24px',
          color: '#a0aec0',
          fontSize: '12px',
          borderTop: '1px solid #edf2f7',
          paddingTop: '20px'
        }}>
          By registering, you agree to our <a href="#" style={{ color: '#4facfe', textDecoration: 'none' }}>Terms</a> and{' '}
          <a href="#" style={{ color: '#4facfe', textDecoration: 'none' }}>Privacy Policy</a>
        </div>
      </div>
    </div>
  );
}

export default Register;