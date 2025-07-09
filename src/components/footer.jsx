import React from 'react';
import Link from 'next/link';
import styles from '../styles/Footer.module.css';
import { FaFacebookF, FaInstagram, FaWhatsapp, FaTiktok } from 'react-icons/fa';

const Footer = () => {
	return (
		<footer className={styles.footer}>
      			<div className={styles.container}>

   				<div className={styles.section}>
          				<h2 className={styles.logo}>Supreme Adventures</h2>
          				<p>Creating unforgettable tour experiences across the globe.</p>
        			</div>

        			<div className={styles.section}>
          				<h3>Quick Links</h3>
          				<ul className={styles.links}>
            					<li><Link href="/">Home</Link></li>
            					<li><Link href="/guest-tours">Tours</Link></li>
            					<li><Link href="/contact">Contact</Link></li>
          				</ul>
        			</div>

        			<div className={styles.section}>
          				<h3>Contact Us</h3>
          				<p>Email: officialsupremeadventures@gmail.com</p>
          				<p>Phone: 0759 080100</p>
          				<p>Nairobi, Kenya</p>
        			</div>

        			<div className={styles.section}>
          				<h3>Follow Us</h3>
          				<div className={styles.socials}>
            					<a href="https://instagram.com/supremeadventures" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            					<a href="https://www.tiktok.com/@supremeadventureske" target="_blank" rel="noopener noreferrer"><FaTiktok /></a>
            					<a href="https://facebook.com/supremeadventures" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
            					<a href="https://wa.me/254759080100" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
          				</div>
        			</div>
      			</div>

      			<div className={styles.bottom}>
        			<p>&copy; 2025 Supreme Adventures. All Rights Reserved.</p>
        			<p>
          				<Link href="/terms">Terms</Link> | <Link href="/privacy">Privacy Policy</Link>
        			</p>
      			</div>
    		</footer>
	);
};

export default Footer;			
