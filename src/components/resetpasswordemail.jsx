import React from 'react';
import Link from 'next/link';
import styles from '../styles/Resetpasswordemail.module.css';

const ResetPasswordEmail = () => {
	return (
			<>
				<section id={styles['reset-section']}>
					<div className={styles['reset-container']}>
    						<div className={styles.logo}>
      							<img src="/supreme.svg" alt="Supreme adventures Logo" />
    						</div>
   					 	<h2>Reset Password</h2>
						<p>Enter your email address and we will send you a link to reset your password.</p>
						<form className={styles['reset-form']}>
							<div className={styles['form-group']}>
								<label htmlFor='resetpassword'>Email</label>
								<input type='email' id='resetpassword' name='resetpassword' placeholder='Enter you email...' required />
							</div>
							
							<div className={styles['button-container']}>
								<button type="submit" className={styles.btn}>Reset password</button>
							</div>
						</form>

						<div className={styles["footer-text"]}>
      							<p>Remembered your password? <Link href="/login" className={styles.link}>Sign in</Link></p>
    						</div>
					</div>
				</section>
			</>
	);
};


export default ResetPasswordEmail;

