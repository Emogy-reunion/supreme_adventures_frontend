import React from 'react';
import styles from '../styles/Verificationstatus.module';
import Link from 'next/link';


const VerificationStatus = ({ status }) => {

	if (status === 'true') {
		return (
			<>
				<section className={styles['verification-section']>
					<div className={styles['success-card']}>
						<div className={styles.logo}>
      							<img src="/supreme.svg" alt="Supreme adventures Logo" />
    						</div>
        					<h2>Email Verified Successfully!</h2>
        					<p>Welcome! Your email has been confirmed, and your account is now fully activated.</p>
        					<Link to="/login" className={styles.button}>Go to Login</Link>
					</div>
				</section>
			</>
		);
	} else {
		return (
			<>
				<section className={styles['verification-section']>
      					<div className={styles['failure-card']}>
						<div className={styles.logo}>
      							<img src="/supreme.svg" alt="Supreme adventures Logo" />
    						</div>
        					<h2>Verification Failed!</h2>
        					<p>Sorry, we couldn’t verify your email. The link may be invalid or expired.</p>
        					<Link to="/resend-verification" className={styles.button}>Resend Verification Email</Link>
    					</div>
				</section>
			</>
		);
	}
};

export default VerificationStatus;
