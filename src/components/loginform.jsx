import React from 'react';
import styles from '../styles/Loginform.module.css';
import Link from 'next/link';


const LoginForm = () => {
	return (
		<>
			<section id={styles['login-section']}>
				<div className={styles["login-container"]}>
    					<div className={styles.logo}>
      						<img src="https://img.icons8.com/emoji/96/airplane-emoji.png" alt="Wanderlust Logo" />
    					</div>
   					 <h2>Login</h2>
    					<form>
      						<div className={styles["form-group"]}>
        						<label htmlFor="email">Email Address / Username </label>
        						<input type="email" id="email" name="email" placeholder="you@example.com" required />
      						</div>

      						<div className={styles["form-group"]}>
        						<label htmlFor="password">Password</label>
        						<input type="password" id="password" name="password" placeholder="Enter your password" required />
      						</div>
						
						<div className={styles['button-container']}>
							<button type="submit" className={styles.btn}>Sign In</button>
						</div>
    					</form>

    					<div className={styles["footer-text"]}>
      						<p>Don’t have an account? <Link href="#" className={styles.link}>Sign up</Link></p>
						<p>Forgot password? <Link href='#' className={styles.link}>Reset password</Link></p>
    					</div>
  				</div>
			</section>
		</>
	);
};


export default LoginForm;
