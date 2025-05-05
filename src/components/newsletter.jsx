import React from 'react';
import styles from '../styles/Newsletter.module.css';


const NewsLetter = () => {
	return (
		<>
		 	<section className={styles["newsletter-section"]}>
    				<h2>Join Our Newsletter</h2>
    				<p>Get travel inspiration and offers straight to your inbox.</p>
    				<form>
      					<input type="email" placeholder="Enter your email" required />
      					<button className={styles["newsletter-btn"]} type="submit">Subscribe</button>
    				</form>
  			</section>
		</>
	);
};


export default NewsLetter;
