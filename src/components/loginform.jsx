import React from 'react';
import styles from '../styles/Loginform.module.css';
import Link from 'next/link';


const LoginForm = () => {
	return (
		<>
			<section id={styles['login-section']}>
				<div className={styles["login-container"]}>
    					<div className={styles.logo}>
      						<img src="/supreme.svg" alt="Supreme adventures Logo" />
    					</div>
   					 <h2>Login</h2>
    					<form className={styles['login-form']}>
							<div className={styles["form-group"]}>
							<label htmlFor="identifier">Email/Username</label>
							<input type="text" id="identifier" name="identifier" placeholder="Email or username" required />
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
      						<p>Don’t have an account? <Link href="/register" className={styles.link}>Sign up</Link></p>
						<p>Forgot password? <Link href='/passwordresetemail' className={styles.link}>Reset password</Link></p>
    					</div>
  				</div>
			</section>
		</>
	);
};


export default LoginForm;
