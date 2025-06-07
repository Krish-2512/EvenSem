import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function JobDescription({ token, onLogout }) {
  const [formData, setFormData] = useState({
    jobTitle: '',
    skills: '',
    experience: '',
    traits: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const role = token ? JSON.parse(atob(token.split('.')[1])).role : '';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/job-description',
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage(response.data.message);
      setFormData({ jobTitle: '', skills: '', experience: '', traits: '' });
    } catch (error) {
      setMessage(error.response?.data?.detail || 'Error saving job description.');
    }
  };

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  const styles = {
    container: {
      maxWidth: '600px',
      margin: '40px auto',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f9f9f9',
    },
    heading: {
      textAlign: 'center',
      marginBottom: '20px',
      fontSize: '24px',
      fontWeight: 'bold',
    },
    nav: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '20px',
      flexWrap: 'wrap',
      gap: '10px',
    },
    navLink: {
      textDecoration: 'none',
      color: '#007bff',
      padding: '8px 12px',
      borderRadius: '4px',
      backgroundColor: '#e7f1ff',
    },
    logoutButton: {
      padding: '8px 12px',
      border: 'none',
      backgroundColor: '#ff4d4f',
      color: '#fff',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
    },
    label: {
      marginBottom: '4px',
      fontWeight: 'bold',
    },
    input: {
      padding: '10px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      fontSize: '14px',
    },
    button: {
      padding: '12px',
      backgroundColor: '#28a745',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontWeight: 'bold',
      marginTop: '10px',
    },
    message: {
      textAlign: 'center',
      marginBottom: '15px',
      color: '#555',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Create Job Description</h1>

      <nav style={styles.nav}>
        <Link to="/job-description" style={styles.navLink}>Job Description</Link>
        <Link to="/dashboard" style={styles.navLink}>Dashboard</Link>
        {role === 'admin' && (
          <Link to="/job-openings" style={styles.navLink}>Job Openings</Link>
        )}
        <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
      </nav>

      {message && <p style={styles.message}>{message}</p>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <div>
          <label style={styles.label}>Job Title:</label>
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div>
          <label style={styles.label}>Required Skills:</label>
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            required
            placeholder="e.g., Python, JavaScript, leadership"
            style={styles.input}
          />
        </div>
        <div>
          <label style={styles.label}>Preferred Experience:</label>
          <input
            type="text"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            required
            placeholder="e.g., 2+ years, internship"
            style={styles.input}
          />
        </div>
        <div>
          <label style={styles.label}>Desired Traits:</label>
          <input
            type="text"
            name="traits"
            value={formData.traits}
            onChange={handleChange}
            placeholder="e.g., proactive, team player"
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>Save Job Description</button>
      </form>
    </div>
  );
}

export default JobDescription;
