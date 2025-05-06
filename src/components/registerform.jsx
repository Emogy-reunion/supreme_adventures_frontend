import React from 'react';
import Link from 'next/head';
import styles from '../styles/Registerform.module.css';


const RegisterForm = () => {
	return (
		<>
			<section className={styles['register-section']}>
				<div className={styles["signup-container"]}>
    					<div className={styles.logo}>
      						<img src="/supreme.svg" alt="Supreme adventures Logo" />
    					</div>
    					<h2>Create Account</h2>
    					
					<form className={styles['signup-form']}>
      						<div className={styles["form-group"]}>
        						<label htmlFor="first_name">First Name</label>
        						<input type="text" id="first_name" name="first_name" required />
      						</div>

						<div className={styles["form-group"]}>
                                                        <label htmlFor="last_name">Last Name</label>
                                                        <input type="text" id="last_name" name="last_name" required />
                                                </div>
      
      						<div className={styles["form-group"]}>
        						<label htmFor="email">Email Address</label>
        						<input type="email" id="email" name="email" required />
      						</div>

						<div className={styles["form-group"]}>
                                                        <label htmlFor="username">First Name</label>
                                                        <input type="text" id="username" name="username" required />
                                                </div>

      						<div className={styles["form-group"]}>
        						<label htmlFor="password">Create Password</label>
        						<input type="password" id="password" name="password" placeholder="Choose a strong password" required />
      						</div>

      						<div className={styles["form-group"]}>
        						<label htmlFor="confirm-password">Confirm Password</label>
        						<input type="password" id="confirm-password" name="confirm-password" placeholder="Retype your password" required />
      						</div>

						<div className={styles['button-container']}>
							<button type="submit" className={styles.btn}>Sign In</button>
						</div>
    					</form>

    					<div className={styles["footer-text"]}>
      						<p>Already have an account? <Link href="/login" className={styles.link}>sign in</Link></p>
    					</div>
  				</div>
			</section>
		</>
	);
};


export default RegisterForm;
