import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function JobOpenings({ token, onLogout }) {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Decode token to get role
  const role = token ? JSON.parse(atob(token.split('.')[1])).role : '';

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/job-descriptions', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setJobs(response.data);
        setMessage({ text: '', type: '' });
      } catch (error) {
        setMessage({
          text: 'Error fetching job openings: ' + (error.response?.data?.detail || 'Unknown error'),
          type: 'error'
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobs();
  }, [token]);

  const handleViewDetails = (job) => {
    setSelectedJob(job);
  };

  const handleCloseDetails = () => {
    setSelectedJob(null);
    setFile(null);
    setMessage({ text: '', type: '' });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleApply = async (jobId) => {
    if (!file) {
      setMessage({ text: 'Please select a file.', type: 'error' });
      return;
    }
    if (jobId === undefined || jobId === null) {
      setMessage({ text: 'Error: Job ID is missing.', type: 'error' });
      return;
    }
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('job_id', jobId);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/upload-cv', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage({
        text: 'Application submitted successfully!',
        type: 'success'
      });
      setFile(null);
      document.querySelector('input[type="file"]').value = null;
    } catch (error) {
      setMessage({
        text: error.response?.data?.detail || 'Error submitting application.',
        type: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f5f7fa',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '16px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        padding: '30px',
        position: 'relative'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px',
          borderBottom: '1px solid #edf2f7',
          paddingBottom: '20px'
        }}>
          <h1 style={{
            color: '#2d3748',
            fontSize: '28px',
            fontWeight: '700',
            margin: '0',
            background: 'linear-gradient(to right, #667eea, #764ba2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Listed Jobs
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <nav style={{ display: 'flex', gap: '15px' }}>
              <Link to="/job-openings" style={{
                color: '#4a5568',
                textDecoration: 'none',
                fontWeight: '600',
                padding: '8px 12px',
                borderRadius: '8px',
                transition: 'all 0.2s',
                ':hover': {
                  backgroundColor: '#edf2f7',
                  color: '#667eea'
                }
              }}>
                Listed Jobs
              </Link>
              {role === 'admin' && (
                <Link to="/dashboard" style={{
                  color: '#4a5568',
                  textDecoration: 'none',
                  fontWeight: '600',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  transition: 'all 0.2s',
                  ':hover': {
                    backgroundColor: '#edf2f7',
                    color: '#667eea'
                  }
                }}>
                  Dashboard
                </Link>
              )}
            </nav>

            <button onClick={handleLogout} style={{
              backgroundColor: '#fff5f5',
              color: '#c53030',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              ':hover': {
                backgroundColor: '#fed7d7'
              }
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="#c53030" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 17L21 12L16 7" stroke="#c53030" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 12H9" stroke="#c53030" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Logout
            </button>
          </div>
        </div>

        {/* Message */}
        {message.text && (
          <div style={{
            padding: '14px',
            borderRadius: '8px',
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

        {/* Loading State */}
        {isLoading ? (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '200px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              border: '4px solid rgba(102, 126, 234, 0.2)',
              borderTopColor: '#667eea',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              '@keyframes spin': {
                to: { transform: 'rotate(360deg)' }
              }
            }}></div>
          </div>
        ) : (
          /* Job Listings */
          jobs.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '40px',
              color: '#718096'
            }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginBottom: '16px' }}>
                <path d="M21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13" stroke="#a0aec0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 10L12 15L17 10" stroke="#a0aec0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 15V3" stroke="#a0aec0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p style={{ fontSize: '18px', fontWeight: '500' }}>No job openings available at the moment.</p>
              <p style={{ fontSize: '14px', marginTop: '8px' }}>Check back later or try refreshing the page.</p>
            </div>
          ) : (
            <div style={{
              overflowX: 'auto',
              borderRadius: '12px',
              border: '1px solid #edf2f7',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)'
            }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                minWidth: '600px'
              }}>
                <thead style={{
                  backgroundColor: '#f8fafc',
                  borderBottom: '1px solid #e2e8f0'
                }}>
                  <tr>
                    <th style={{
                      padding: '16px',
                      textAlign: 'left',
                      color: '#4a5568',
                      fontWeight: '600',
                      fontSize: '14px'
                    }}>Job Title</th>
                    <th style={{
                      padding: '16px',
                      textAlign: 'left',
                      color: '#4a5568',
                      fontWeight: '600',
                      fontSize: '14px'
                    }}>Posted By</th>
                    <th style={{
                      padding: '16px',
                      textAlign: 'left',
                      color: '#4a5568',
                      fontWeight: '600',
                      fontSize: '14px'
                    }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map(job => (
                    <tr key={job.id} style={{
                      borderBottom: '1px solid #edf2f7',
                      transition: 'background-color 0.2s',
                      ':hover': {
                        backgroundColor: '#f8fafc'
                      },
                      ':last-child': {
                        borderBottom: 'none'
                      }
                    }}>
                      <td style={{
                        padding: '16px',
                        color: '#2d3748',
                        fontWeight: '500'
                      }}>{job.jobTitle}</td>
                      <td style={{
                        padding: '16px',
                        color: '#4a5568'
                      }}>{job.created_by}</td>
                      <td style={{ padding: '16px' }}>
                        <button
                          onClick={() => handleViewDetails(job)}
                          style={{
                            backgroundColor: '#ebf8ff',
                            color: '#3182ce',
                            border: 'none',
                            padding: '8px 16px',
                            borderRadius: '6px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            ':hover': {
                              backgroundColor: '#bee3f8',
                              transform: 'translateY(-1px)'
                            }
                          }}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="#3182ce" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#3182ce" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )}

        {/* Job Details Modal */}
        {selectedJob && (
          <div style={{
            position: 'fixed',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: '1000',
            backdropFilter: 'blur(5px)'
          }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              width: '90%',
              maxWidth: '600px',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
              padding: '30px',
              position: 'relative'
            }}>
              <button
                onClick={handleCloseDetails}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px',
                  borderRadius: '50%',
                  transition: 'all 0.2s',
                  ':hover': {
                    backgroundColor: '#f8fafc'
                  }
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18" stroke="#4a5568" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 6L18 18" stroke="#4a5568" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <h2 style={{
                color: '#2d3748',
                fontSize: '24px',
                fontWeight: '700',
                marginBottom: '20px',
                paddingRight: '30px'
              }}>{selectedJob.jobTitle}</h2>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'max-content 1fr',
                gap: '12px 20px',
                marginBottom: '24px'
              }}>
                <div style={{ color: '#718096', fontWeight: '500' }}>Posted By:</div>
                <div>{selectedJob.created_by}</div>

                <div style={{ color: '#718096', fontWeight: '500' }}>Required Skills:</div>
                <div>{selectedJob.skills}</div>

                <div style={{ color: '#718096', fontWeight: '500' }}>Preferred Experience:</div>
                <div>{selectedJob.experience}</div>

                <div style={{ color: '#718096', fontWeight: '500' }}>Desired Traits:</div>
                <div>{selectedJob.traits || 'N/A'}</div>
              </div>

              {role === 'job_seeker' && (
                <div style={{
                  borderTop: '1px solid #edf2f7',
                  paddingTop: '24px',
                  marginTop: '24px'
                }}>
                  <h3 style={{
                    color: '#2d3748',
                    fontSize: '18px',
                    fontWeight: '600',
                    marginBottom: '16px'
                  }}>Apply for this Job</h3>

                  <form onSubmit={(e) => { e.preventDefault(); handleApply(selectedJob.id); }} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px'
                  }}>
                    <div>
                      <label style={{
                        display: 'block',
                        marginBottom: '8px',
                        color: '#4a5568',
                        fontWeight: '500'
                      }}>Upload CV (PDF or DOCX)</label>
                      <div style={{
                        border: '1px dashed #cbd5e0',
                        borderRadius: '8px',
                        padding: '20px',
                        textAlign: 'center',
                        transition: 'all 0.2s',
                        backgroundColor: file ? '#f0fff4' : '#f8fafc',
                        borderColor: file ? '#9ae6b4' : '#cbd5e0'
                      }}>
                        <input
                          type="file"
                          accept=".pdf,.docx"
                          onChange={handleFileChange}
                          required
                          disabled={isSubmitting}
                          style={{
                            display: 'none'
                          }}
                          id="cv-upload"
                        />
                        <label htmlFor="cv-upload" style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          cursor: 'pointer'
                        }}>
                          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginBottom: '12px' }}>
                            <path d="M21 15V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V15" stroke="#4a5568" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M17 8L12 3L7 8" stroke="#4a5568" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 3V15" stroke="#4a5568" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          {file ? (
                            <span style={{ color: '#2f855a', fontWeight: '500' }}>{file.name}</span>
                          ) : (
                            <>
                              <span style={{ color: '#4a5568', fontWeight: '500' }}>Click to upload CV</span>
                              <span style={{ color: '#a0aec0', fontSize: '14px', marginTop: '4px' }}>PDF or DOCX (Max 5MB)</span>
                            </>
                          )}
                        </label>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      style={{
                        backgroundColor: isSubmitting ? '#a0aec0' : '#48bb78',
                        color: 'white',
                        border: 'none',
                        padding: '14px',
                        borderRadius: '8px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '8px',
                        ':hover': {
                          backgroundColor: isSubmitting ? '#a0aec0' : '#38a169',
                          transform: isSubmitting ? 'none' : 'translateY(-1px)'
                        }
                      }}
                    >
                      {isSubmitting ? (
                        <>
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
                          Applying...
                        </>
                      ) : (
                        <>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 13L9 17L19 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Submit Application
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default JobOpenings;