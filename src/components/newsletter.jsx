import React from 'react';
import styles from '../styles/Newsletter.module.css';


const NewsLetter = () => {
	return (
		<>
		 	<section className="newsletter-section">
    				<h2>Join Our Newsletter</h2>
    				<p style="text-align:center;">Get travel inspiration and offers straight to your inbox.</p>
    				<form>
      					<input type="email" placeholder="Enter your email" required />
      					<button className="newsletter-btn" type="submit">Subscribe</button>
    				</form>
  			</section>
		</>
	);
};


export default NewsLetter;
