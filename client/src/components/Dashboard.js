// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
//
// const Dashboard = ({ token, onLogout }) => {
//   const [evaluations, setEvaluations] = useState([]);
//   const [cvs, setCvs] = useState([]);
//   const [selectedCandidate, setSelectedCandidate] = useState(null);
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();
//
//   // Decode token to get role
//   const role = token ? JSON.parse(atob(token.split('.')[1])).role : '';
//
//   const fetchEvaluations = async () => {
//     try {
//       const config = {
//         headers: { Authorization: `Bearer ${token}` }
//       };
//       const response = await axios.get('http://127.0.0.1:8000/api/evaluations', config);
//       setEvaluations(response.data);
//     } catch (error) {
//       console.error('Error fetching evaluations:', error);
//       setMessage(error.response?.data?.detail || 'Error fetching evaluations.');
//     }
//   };
//
//   const fetchCvs = async () => {
//     try {
//       const config = {
//         headers: { Authorization: `Bearer ${token}` }
//       };
//       const response = await axios.get('http://127.0.0.1:8000/api/cvs', config);
//       setCvs(response.data);
//     } catch (error) {
//       console.error('Error fetching CVs:', error);
//       setMessage(error.response?.data?.detail || 'Error fetching CVs.');
//     }
//   };
//
//   useEffect(() => {
//     fetchCvs();
//     fetchEvaluations();
//   }, [token]);
//
//   const getCvDetails = (username, job_id) => {
//     return cvs.find(cv => cv.username === username && cv.job_id === job_id) || {};
//   };
//
//   const getEvaluation = (username, job_id) => {
//     return evaluations.find(evaluation => evaluation.username === username && evaluation.job_id === job_id) || null;
//   };
//
//   const handleEvaluateCv = async (username, job_id) => {
//   try {
//     // Validate inputs
//     if (!username) {
//       setMessage('Cannot evaluate CV: Username is missing.');
//       return;
//     }
//     if (job_id === null || job_id === undefined) {
//       setMessage('Cannot evaluate CV: Job ID is missing.');
//       return;
//     }
//     console.log('Evaluating CV with:', { username, job_id });
//     const config = {
//       headers: { Authorization: `Bearer ${token}` }
//     };
//     const response = await axios.post('http://127.0.0.1:8000/api/evaluate-cv', { username, job_id }, config);
//     console.log('Evaluation response:', response.data);
//     setMessage(response.data.message || 'CV evaluated successfully!');
//     await fetchEvaluations();
//   } catch (error) {
//     console.error('Evaluation error:', error.response?.data);
//     let errorMessage = 'Error evaluating CV.';
//     if (error.response?.data?.detail) {
//       if (typeof error.response.data.detail === 'string') {
//         errorMessage = error.response.data.detail;
//       } else {
//         errorMessage = error.response.data.detail.msg || JSON.stringify(error.response.data.detail);
//       }
//     }
//     setMessage(errorMessage);
//   }
// };
//   const openModal = (candidate) => {
//     setSelectedCandidate(candidate);
//   };
//
//   const closeModal = () => {
//     setSelectedCandidate(null);
//   };
//
//   const getSkills = (structuredContent) => {
//     const cvSkills = structuredContent.skills || [];
//     const cleanedSkills = [];
//     for (const skillEntry of cvSkills) {
//       if (["achievements", "positions of responsibility", "courses taken"].some(section => skillEntry.toLowerCase().includes(section))) {
//         break;
//       }
//       if (skillEntry.includes("•")) {
//         const skillPart = skillEntry.split("•").slice(-1)[0].trim();
//         const skills = skillPart.replace(",", " ").split().map(s => s.trim().replace("*", ""));
//         cleanedSkills.push(...skills);
//       }
//     }
//     return cleanedSkills;
//   };
//
//   const handleLogout = () => {
//     onLogout();
//     navigate('/login');
//   };
//
//   return (
//     <div className="App">
//       <h1>CvAlign: Candidate Dashboard</h1>
//       <nav className="nav">
//         <Link to="/job-description" className="nav-link">Job Description</Link>
//         <Link to="/dashboard" className="nav-link">Dashboard</Link>
//         {role === 'admin' && (
//           <Link to="/job-openings" className="nav-link">Job Openings</Link>
//         )}
//         <button onClick={handleLogout} className="logout-button">Logout</button>
//       </nav>
//
//       {message && <p className="form-message">{message}</p>}
//
//       {cvs.length === 0 ? (
//         <p>No candidates have applied to your job description yet.</p>
//       ) : (
//         <table className="table">
//           <thead className="table-head">
//             <tr>
//               <th>Username</th>
//               <th>CV Filename</th>
//               <th>Job Role</th>
//               <th>Relevance Score</th>
//               <th>Feedback</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {cvs.map((cv) => {
//               const evaluation = getEvaluation(cv.username, cv.job_id);
//               return (
//                 <tr key={`${cv.username}-${cv.job_id}`} className="table-row">
//                   <td>{cv.username}</td>
//                   <td>
//                     <a href={cv.cloud_url} target="_blank" rel="noopener noreferrer" className="modal-link">
//                       {cv.filename}
//                     </a>
//                   </td>
//                   <td>{cv.job_title || 'Not specified'}</td>
//                   <td>{evaluation ? evaluation.relevance_score.toFixed(2) : 'Not evaluated'}</td>
//                   <td>{evaluation ? evaluation.feedback : 'Not evaluated'}</td>
//                   <td>
//                     {!evaluation ? (
//                       <button
//                         onClick={() => handleEvaluateCv(cv.username, cv.job_id)}
//                         className="table-button"
//                       >
//                         Evaluate
//                       </button>
//                     ) : (
//                       <button
//                         onClick={() => openModal(evaluation)}
//                         className="table-button"
//                       >
//                         View Details
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       )}
//
//       {selectedCandidate && (() => {
//         const cv = getCvDetails(selectedCandidate.username, selectedCandidate.job_id);
//         const structuredContent = cv.structured_content || {};
//         const jobSkills = ["leadership", "agile"];
//         const cvSkills = getSkills(structuredContent);
//         const matchingSkills = cvSkills.filter(skill => jobSkills.includes(skill.toLowerCase()));
//         const missingSkills = jobSkills.filter(skill => !cvSkills.some(cvSkill => cvSkill.toLowerCase() === skill.toLowerCase()));
//
//         return (
//           <div className="modal-overlay">
//             <div className="modal-content">
//               <h2 className="modal-heading">{selectedCandidate.username} - CV Details</h2>
//               <p><strong>Job Role:</strong> {selectedCandidate.job_title || 'Not specified'}</p>
//               <p><strong>Relevance Score:</strong> {selectedCandidate.relevance_score.toFixed(2)}</p>
//               <p><strong>Feedback:</strong> {selectedCandidate.feedback}</p>
//
//               <div className="modal-section">
//                 <h3 className="modal-subheading">Detailed Feedback</h3>
//                 <p><strong>Matching Skills:</strong> {matchingSkills.length > 0 ? matchingSkills.join(", ") : "None"}</p>
//                 <p><strong>Missing Skills:</strong> {missingSkills.length > 0 ? missingSkills.join(", ") : "None"}</p>
//                 <p><strong>Experience Summary:</strong> {structuredContent.experience?.length > 0 ? `${structuredContent.experience.length} entries found, including internships and projects.` : "No experience entries found."}</p>
//               </div>
//
//               <div className="modal-section">
//                 <h3 className="modal-subheading">CV Breakdown</h3>
//                 <div className="modal-section">
//                   <h4 className="modal-subheading">Skills:</h4>
//                   <ul className="modal-list">
//                     {(structuredContent.skills || []).map((skill, index) => (
//                       <li key={index}>{skill}</li>
//                     ))}
//                   </ul>
//                 </div>
//                 <div className="modal-section">
//                   <h4 className="modal-subheading">Experience:</h4>
//                   <ul className="modal-list">
//                     {(structuredContent.experience || []).map((exp, index) => (
//                       <li key={index}>{exp}</li>
//                     ))}
//                   </ul>
//                 </div>
//                 <div className="modal-section">
//                   <h4 className="modal-subheading">Education:</h4>
//                   <ul className="modal-list">
//                     {(structuredContent.education || []).map((edu, index) => (
//                       <li key={index}>{edu}</li>
//                     ))}
//                   </ul>
//                 </div>
//                 {structuredContent.positions_of_responsibility && (
//                   <div className="modal-section">
//                     <h4 className="modal-subheading">Positions of Responsibility:</h4>
//                     <ul className="modal-list">
//                       {(structuredContent.positions_of_responsibility || []).map((pos, index) => (
//                         <li key={index}>{pos}</li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//                 {cv.cloud_url && (
//                   <div className="modal-section">
//                     <h4 className="modal-subheading">CV Link:</h4>
//                     <a href={cv.cloud_url} target="_blank" rel="noopener noreferrer" className="modal-link">
//                       View CV
//                     </a>
//                   </div>
//                 )}
//               </div>
//
//               <button
//                 onClick={closeModal}
//                 className="modal-close-button"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         );
//       })()}
//     </div>
//   );
// };
//
// export default Dashboard;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = ({ token, onLogout }) => {
  const [evaluations, setEvaluations] = useState([]);
  const [cvs, setCvs] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Decode token to get role
  const role = token ? JSON.parse(atob(token.split('.')[1])).role : '';

  const fetchEvaluations = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const response = await axios.get('http://127.0.0.1:8000/api/evaluations', config);
      setEvaluations(response.data);
    } catch (error) {
      console.error('Error fetching evaluations:', error);
      setMessage(error.response?.data?.detail || 'Error fetching evaluations.');
    }
  };

  const fetchCvs = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const response = await axios.get('http://127.0.0.1:8000/api/cvs', config);
      setCvs(response.data);
    } catch (error) {
      console.error('Error fetching CVs:', error);
      setMessage(error.response?.data?.detail || 'Error fetching CVs.');
    }
  };

  useEffect(() => {
    fetchCvs();
    fetchEvaluations();
  }, [token]);

  const getCvDetails = (username, job_id) => {
    return cvs.find(cv => cv.username === username && cv.job_id === job_id) || {};
  };

  const getEvaluation = (username, job_id) => {
    return evaluations.find(evaluation => evaluation.username === username && evaluation.job_id === job_id) || null;
  };

  const handleEvaluateCv = async (username, job_id) => {
    try {
      if (!username) {
        setMessage('Cannot evaluate CV: Username is missing.');
        return;
      }
      if (job_id === null || job_id === undefined) {
        setMessage('Cannot evaluate CV: Job ID is missing.');
        return;
      }

      setIsLoading(true);
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const response = await axios.post('http://127.0.0.1:8000/api/evaluate-cv', { username, job_id }, config);
      setMessage(response.data.message || 'CV evaluated successfully!');
      await fetchEvaluations();
    } catch (error) {
      console.error('Evaluation error:', error.response?.data);
      let errorMessage = 'Error evaluating CV.';
      if (error.response?.data?.detail) {
        if (typeof error.response.data.detail === 'string') {
          errorMessage = error.response.data.detail;
        } else {
          errorMessage = error.response.data.detail.msg || JSON.stringify(error.response.data.detail);
        }
      }
      setMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = (candidate) => {
    setSelectedCandidate(candidate);
  };

  const closeModal = () => {
    setSelectedCandidate(null);
  };

  const getSkills = (structuredContent) => {
    const cvSkills = structuredContent.skills || [];
    const cleanedSkills = [];
    for (const skillEntry of cvSkills) {
      if (["achievements", "positions of responsibility", "courses taken"].some(section => skillEntry.toLowerCase().includes(section))) {
        break;
      }
      if (skillEntry.includes("•")) {
        const skillPart = skillEntry.split("•").slice(-1)[0].trim();
        const skills = skillPart.replace(",", " ").split().map(s => s.trim().replace("*", ""));
        cleanedSkills.push(...skills);
      }
    }
    return cleanedSkills;
  };

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  const getScoreColor = (score) => {
    if (score >= 8) return '#16a34a'; // green-600
    if (score >= 5) return '#ca8a04'; // yellow-600
    return '#dc2626'; // red-600
  };

  // Main container styles
  const appStyles = {
    minHeight: '100vh',
    backgroundColor: '#f9fafb',
    fontFamily: "'Inter', sans-serif",
    color: '#111827'
  };

  // Header styles
  const headerStyles = {
    backgroundColor: '#4338ca',
    color: 'white',
    padding: '1.5rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
  };

  // Navigation styles
  const navStyles = {
    display: 'flex',
    gap: '1rem',
    marginTop: '1.5rem'
  };

  const navLinkStyles = {
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    textDecoration: 'none',
    fontSize: '0.875rem',
    fontWeight: '500',
    backgroundColor: '#4f46e5'
  };

  const activeNavLinkStyles = {
    ...navLinkStyles,
    backgroundColor: '#3730a3'
  };

  const logoutButtonStyles = {
    backgroundColor: 'white',
    color: '#4338ca',
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    border: 'none',
    fontWeight: '500',
    cursor: 'pointer',
    marginLeft: 'auto'
  };

  // Message styles
  const messageStyles = (isSuccess) => ({
    padding: '1rem',
    borderRadius: '0.375rem',
    margin: '1rem 0',
    backgroundColor: isSuccess ? '#dcfce7' : '#fee2e2',
    color: isSuccess ? '#166534' : '#991b1b'
  });

  // Table styles
  const tableStyles = {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    overflow: 'hidden',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    margin: '1.5rem 0'
  };

  const tableHeadStyles = {
    backgroundColor: '#f3f4f6',
    textAlign: 'left',
    fontSize: '0.75rem',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: '#6b7280'
  };

  const tableCellStyles = {
    padding: '1rem',
    borderBottom: '1px solid #e5e7eb'
  };

  const tableRowStyles = {
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: '#f9fafb'
    }
  };

  // Button styles
  const buttonStyles = {
    backgroundColor: '#4f46e5',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    border: 'none',
    fontWeight: '500',
    cursor: 'pointer',
    fontSize: '0.875rem',
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: '#4338ca'
    }
  };

  const secondaryButtonStyles = {
    ...buttonStyles,
    backgroundColor: '#e5e7eb',
    color: '#374151',
    ':hover': {
      backgroundColor: '#d1d5db'
    }
  };

  // Modal styles
  const modalOverlayStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 50
  };

  const modalContentStyles = {
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    width: '90%',
    maxWidth: '56rem',
    maxHeight: '90vh',
    overflowY: 'auto',
    padding: '1.5rem',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
  };

  const modalSectionStyles = {
    margin: '1.5rem 0',
    padding: '1rem 0',
    borderTop: '1px solid #e5e7eb'
  };

  const modalCloseButtonStyles = {
    ...buttonStyles,
    marginTop: '1.5rem'
  };

  return (
    <div style={appStyles}>
      {/* Header */}
      <header style={headerStyles}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>CvAlign: Candidate Dashboard</h1>
            <button
              onClick={handleLogout}
              style={logoutButtonStyles}
            >
              Logout
            </button>
          </div>

          <nav style={navStyles}>
            <Link
              to="/job-description"
              style={navLinkStyles}
            >
              Job Description
            </Link>
            <Link
              to="/dashboard"
              style={activeNavLinkStyles}
            >
              Dashboard
            </Link>
            {role === 'admin' && (
              <Link
                to="/job-openings"
                style={navLinkStyles}
              >
                Job Openings
              </Link>
            )}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        {message && (
          <div style={messageStyles(message.includes('successfully'))}>
            {message}
          </div>
        )}

        {isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '5rem 0' }}>
            <div style={{
              width: '3rem',
              height: '3rem',
              border: '4px solid #e5e7eb',
              borderTopColor: '#4f46e5',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></div>
          </div>
        ) : cvs.length === 0 ? (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            padding: '2rem',
            textAlign: 'center',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            color: '#6b7280'
          }}>
            <p>No candidates have applied to your job description yet.</p>
          </div>
        ) : (
          <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', overflow: 'hidden', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={tableStyles}>
                <thead>
                  <tr>
                    <th style={{ ...tableCellStyles, ...tableHeadStyles }}>Username</th>
                    <th style={{ ...tableCellStyles, ...tableHeadStyles }}>CV</th>
                    <th style={{ ...tableCellStyles, ...tableHeadStyles }}>Job Role</th>
                    <th style={{ ...tableCellStyles, ...tableHeadStyles }}>Score</th>
                    <th style={{ ...tableCellStyles, ...tableHeadStyles }}>Feedback</th>
                    <th style={{ ...tableCellStyles, ...tableHeadStyles }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cvs.map((cv) => {
                    const evaluation = getEvaluation(cv.username, cv.job_id);
                    return (
                      <tr key={`${cv.username}-${cv.job_id}`} style={tableRowStyles}>
                        <td style={tableCellStyles}>
                          <div style={{ fontWeight: '500', color: '#111827' }}>{cv.username}</div>
                        </td>
                        <td style={tableCellStyles}>
                          <a
                            href={cv.cloud_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: '#4f46e5', textDecoration: 'none', ':hover': { textDecoration: 'underline' } }}
                          >
                            {cv.filename}
                          </a>
                        </td>
                        <td style={tableCellStyles}>
                          <div style={{ color: '#111827' }}>{cv.job_title || 'Not specified'}</div>
                        </td>
                        <td style={tableCellStyles}>
                          {evaluation ? (
                            <span style={{
                              padding: '0.25rem 0.5rem',
                              borderRadius: '9999px',
                              fontSize: '0.75rem',
                              fontWeight: '600',
                              color: getScoreColor(evaluation.relevance_score)
                            }}>
                              {evaluation.relevance_score.toFixed(2)}
                            </span>
                          ) : (
                            <span style={{ color: '#6b7280' }}>Not evaluated</span>
                          )}
                        </td>
                        <td style={tableCellStyles}>
                          <div style={{ color: '#111827', maxWidth: '20rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {evaluation ? evaluation.feedback : 'Not evaluated'}
                          </div>
                        </td>
                        <td style={tableCellStyles}>
                          {!evaluation ? (
                            <button
                              onClick={() => handleEvaluateCv(cv.username, cv.job_id)}
                              style={{ ...buttonStyles, opacity: isLoading ? 0.7 : 1 }}
                              disabled={isLoading}
                            >
                              {isLoading ? 'Processing...' : 'Evaluate'}
                            </button>
                          ) : (
                            <button
                              onClick={() => openModal(evaluation)}
                              style={secondaryButtonStyles}
                            >
                              View Details
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Modal */}
      {selectedCandidate && (() => {
        const cv = getCvDetails(selectedCandidate.username, selectedCandidate.job_id);
        const structuredContent = cv.structured_content || {};
        const jobSkills = ["leadership", "agile"];
        const cvSkills = getSkills(structuredContent);
        const matchingSkills = cvSkills.filter(skill => jobSkills.includes(skill.toLowerCase()));
        const missingSkills = jobSkills.filter(skill => !cvSkills.some(cvSkill => cvSkill.toLowerCase() === skill.toLowerCase()));

        return (
          <div style={modalOverlayStyles} onClick={closeModal}>
            <div style={modalContentStyles} onClick={(e) => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    {selectedCandidate.username} - CV Evaluation Details
                  </h2>
                  <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      backgroundColor: '#e0e7ff',
                      color: '#4f46e5'
                    }}>
                      Job: {selectedCandidate.job_title || 'Not specified'}
                    </span>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      backgroundColor: '#f0fdf4',
                      color: getScoreColor(selectedCandidate.relevance_score)
                    }}>
                      Score: {selectedCandidate.relevance_score.toFixed(2)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer' }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div style={{ marginTop: '1.5rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>Evaluation Summary</h3>
                  <p style={{ color: '#4b5563' }}>{selectedCandidate.feedback}</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', margin: '1.5rem 0' }}>
                  <div style={{ backgroundColor: '#f0fdf4', padding: '1rem', borderRadius: '0.5rem' }}>
                    <h4 style={{ fontWeight: '600', color: '#166534', marginBottom: '0.5rem' }}>Matching Skills</h4>
                    {matchingSkills.length > 0 ? (
                      <ul style={{ listStyleType: 'disc', paddingLeft: '1.25rem', color: '#166534' }}>
                        {matchingSkills.map((skill, index) => (
                          <li key={index} style={{ marginBottom: '0.25rem' }}>{skill}</li>
                        ))}
                      </ul>
                    ) : (
                      <p style={{ color: '#166534' }}>None</p>
                    )}
                  </div>
                  <div style={{ backgroundColor: '#fef2f2', padding: '1rem', borderRadius: '0.5rem' }}>
                    <h4 style={{ fontWeight: '600', color: '#991b1b', marginBottom: '0.5rem' }}>Missing Skills</h4>
                    {missingSkills.length > 0 ? (
                      <ul style={{ listStyleType: 'disc', paddingLeft: '1.25rem', color: '#991b1b' }}>
                        {missingSkills.map((skill, index) => (
                          <li key={index} style={{ marginBottom: '0.25rem' }}>{skill}</li>
                        ))}
                      </ul>
                    ) : (
                      <p style={{ color: '#991b1b' }}>None</p>
                    )}
                  </div>
                </div>

                <div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>CV Content Analysis</h3>
                  <div style={{ marginTop: '1rem' }}>
                    <h4 style={{ fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>Skills</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {(structuredContent.skills || []).map((skill, index) => (
                        <span key={index} style={{
                          backgroundColor: '#e0e7ff',
                          color: '#4f46e5',
                          fontSize: '0.75rem',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '9999px'
                        }}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginTop: '1.5rem' }}>
                    <h4 style={{ fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>Experience</h4>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                      {(structuredContent.experience || []).map((exp, index) => (
                        <li key={index} style={{
                          color: '#4b5563',
                          marginBottom: '0.5rem',
                          display: 'flex',
                          alignItems: 'flex-start'
                        }}>
                          <span style={{ color: '#9ca3af', marginRight: '0.5rem' }}>•</span>
                          {exp}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ marginTop: '1.5rem' }}>
                    <h4 style={{ fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>Education</h4>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                      {(structuredContent.education || []).map((edu, index) => (
                        <li key={index} style={{
                          color: '#4b5563',
                          marginBottom: '0.5rem',
                          display: 'flex',
                          alignItems: 'flex-start'
                        }}>
                          <span style={{ color: '#9ca3af', marginRight: '0.5rem' }}>•</span>
                          {edu}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {structuredContent.positions_of_responsibility && (
                    <div style={{ marginTop: '1.5rem' }}>
                      <h4 style={{ fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>Positions of Responsibility</h4>
                      <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {(structuredContent.positions_of_responsibility || []).map((pos, index) => (
                          <li key={index} style={{
                            color: '#4b5563',
                            marginBottom: '0.5rem',
                            display: 'flex',
                            alignItems: 'flex-start'
                          }}>
                            <span style={{ color: '#9ca3af', marginRight: '0.5rem' }}>•</span>
                            {pos}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {cv.cloud_url && (
                  <div style={{ marginTop: '1.5rem' }}>
                    <a
                      href={cv.cloud_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        color: '#4f46e5',
                        textDecoration: 'none',
                        fontWeight: '500'
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ marginRight: '0.5rem' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      View Full CV
                    </a>
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                <button
                  onClick={closeModal}
                  style={modalCloseButtonStyles}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Add animation keyframes for spinner */}
      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Dashboard;
