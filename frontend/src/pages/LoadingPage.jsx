import React from 'react';
import '../styles/LoadingPage.css'; // Import the CSS file for styling

const LoadingPage = () => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p className='loading-text'>Loading...</p>
    </div>
  );
};

export default LoadingPage;
