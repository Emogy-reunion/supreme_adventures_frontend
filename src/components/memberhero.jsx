import React from 'react';
import styles from '../styles/AdminHero.module.css';

const MemberHero = () => {
	return (
		<section className={styles.hero}>
			<div className={styles.overlay}></div>
  			<div className={styles.content}>
    				<h1 className={styles.title}>Member Portal</h1>
    				<p className={styles.subtitle}>
      					Welcome back! Manage your tours, bookings, and profile easily and securely.
    				</p>
    				<p className={styles.note}>
      					Explore new adventures, update your preferences, and keep track of your upcoming trips.
    				</p>
    				<p className={styles.help}>
      					Need help? Visit the support section or contact us anytime.
    				</p>
  			</div>
		</section>

	);
};

export default MemberHero;
