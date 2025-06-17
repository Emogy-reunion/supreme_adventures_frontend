import React from 'react';
import styles from '../styles/AdminHero.module.css';

const AdminHero = () => {
	return (
		<section className={styles.hero}>
			<div className={styles.overlay}></div>
  			<div className={styles.content}>
    				<h1 className={styles.title}>Admin Portal</h1>
   	 			<p className={styles.subtitle}>
      					Welcome back, administrator. Manage tours, users, and bookings securely.
    				</p>
    				<p className={styles.note}>
      					Monitor system performance, approve new tours, and manage user roles efficiently.
    				</p>
    				<p className={styles.securityNotice}>
      					🔒 Remember to review recent login activity regularly to ensure account security.
    				</p>
  			</div>
		</section>

	);
};

export default AdminHero;
