import React from 'react';
import { FaInstagram, FaTiktok, FaFacebookF, FaEnvelope, FaPhone } from 'react-icons/fa';
import styles from '../styles/socialmediaSection.module.css';


const SocialMediaSection = () => {
	return (
		<section className={styles.socialSection}>
      			<h3>Connect With Us</h3>
      			<div className={styles.icons}>
        			<a href="https://www.instagram.com/supremeadventures" target="_blank" rel="noopener noreferrer">
          				<FaInstagram />
        			</a>
        
				<a href="https://www.tiktok.com/@supremeadventureske" target="_blank" rel="noopener noreferrer">
          				<FaTiktok />
        			</a>
        
				<a href="https://www.facebook.com/SupremeAdventures" target="_blank" rel="noopener noreferrer">
          				<FaFacebookF />
        			</a>

        			<a href="mailto:officialsupremeadventures@gmail.com">
          				<FaEnvelope />
        			</a>
        			
				<a href="tel:+254759080100">
          				<FaPhone />
        			</a>
      			</div>
    		</section>
  	);
};

export default SocialMediaSection;

