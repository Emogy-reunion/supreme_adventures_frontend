import React from 'react';
import '../styles/Loading.module.css';


const Loading = () => {
	return (
		<div className="loading-container">
      			<div className="loading-brand">
        		<img src="/supreme.svg" alt="Supreme Adventures Logo" className="loading-logo" />
        		<h1 className="loading-title">Supreme Adventures</h1>
      		</div>
      		<div className="spinner"></div>
      			<p className="loading-message">Loading, please wait...</p>
    		</div>
  );
};



export default Loading;
