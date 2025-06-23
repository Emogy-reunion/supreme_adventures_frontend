import React from 'react';
import Link from 'next/link';
import styles from '../styles/Discover.module.css';
import { useAuth } from '../context/AuthContext';

const DiscoverSection = () => {
	const { authStatus } = useAuth();
	const isAuthenticated = authStatus === 'logged_in';

	return (
		<section className={styles["newsletter-section"]}>
    			<h2>Ready for Your Next Adventure?</h2>
    			<p>
        			{isAuthenticated
            				? 'Manage your bookings and explore personalized offers.'
            				: 'Plan, discover, and enjoy unforgettable experiences with us.'}
    			</p>
    			<Link
        			href={isAuthenticated ? '/member_dashboard' : '/tours'}
        			className={styles["newsletter-btn"]}
    			>
        			{isAuthenticated ? 'Go to Dashboard' : 'Browse Tours'}
    			</Link>
		</section>
	);
};

export default DiscoverSection;
