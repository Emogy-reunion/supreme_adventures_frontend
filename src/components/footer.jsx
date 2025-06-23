import React from 'react';
import Link from 'next/link';
import styles from '../styles/Footer.module.css';


const Footer = () => {
	return (
		<>
			<footer className={styles.footer}>
  				<p>&copy; 2025 Supreme Adventures. All Rights Reserved.</p>
    				<p>		
					<Link href="/" className={styles.link}>Home</Link> |{" "}
    					<Link href="/guest-tours" className={styles.link}>Tours</Link> |{" "}
    					<Link href="/contact" className={styles.link}>Contact</Link>
  				</p>
			</footer>
		</>
	);
};


export default Footer;
			
