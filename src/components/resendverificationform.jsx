import React from 'react';
import styles from '../styles/Resendverificationform.module.css';
import Link from 'next/link';


const ResendVerificationForm = () => {
	return (
		<>
			<section className={styles['reverification-section']}>
      				<div className={styles['reverification-container']}>
					<div className={styles.logo}>
      						<img src="/supreme.svg" alt="Supreme adventures Logo" />
    					</div>
        				<h2>Resend Verification Email</h2>
        				<p>Please enter your email to resend the verification link.</p>
        				
					<form className={styles['reverification-form']}>
          					<div className={styles['form-group']}>
            						<label htmlFor="email">Email Address</label>
            						<input type="email" id="email" name="email" placeholder='Enter your email ...' required />
          					</div>
						
						<div className={styles['button-container']}>
          						<button type="submit" className={styles.btn}>Send Verification Link</button>
						</div>
        				</form>
					<div className={styles["footer-text"]}>
      						<p>Already verified? <Link href="/login" className={styles.link}>sign in</Link></p>
    					</div>
      				</div>
    			</section>
		</>
	);
};


export default ResendVerificationForm;
