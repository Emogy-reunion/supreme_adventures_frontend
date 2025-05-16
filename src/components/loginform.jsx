import React from 'react';
import styles from '../styles/Loginform.module.css';
import Link from 'next/link';
import { useState } from 'react';


const LoginForm = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [formErrors, setFormErrors] = useState({});
	const [globalError, setGlobalError] = useState(null);
	const [successMessage, setSuccessMessage] = useState(null):


	const handleToggle = () => {
		setShowPassword((prev) => !prev);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		
		// clear existing error messages
		setGlobalError(null);
		setSuccessMessage(null);
		setFormErrors(null);

		const formData = new FormData(event.target);
		const formJson = Object.fromEntries(formData.entries());

		const response = await fetch('http://127.0.0.1:5000/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: Json.stringify(formJson),
		});


		try {
			const data = await response.json();

			if (!response.ok) {
				if (data.errors) {
					const formattedErrors = Object.keys(data.errors).reduce((acc, key) => {
						acc[key] = data.errors[key].join(', ');
						return acc;
					}, {});

					setFormErrors(formattedErrors);
				} else (data.error) {
					setGlobalError(data.error);
				} else {
					throw new Error('A network error occured: ', Json.stringify(error));
				}
			} else {
				setSuccessMessage(data.success);
			}
		} catch(error) {
			alert('Network error. Please try again.');
		}
	};


	return (
		<>
			<section id={styles['login-section']}>
				<div className={styles["login-container"]}>
    					<div className={styles.logo}>
      						<img src="/supreme.svg" alt="Supreme adventures Logo" />
    					</div>
   					 <h2>Login</h2>
    					<form className={styles['login-form']} onsubmit={handleSubmit}>
							<div className={styles["form-group"]}>
							<label htmlFor="identifier">Email/Username</label>
							<input type="text" id="identifier" name="identifier" placeholder="Email or username" required />
						</div>

      						<div className={styles["form-group"]}>
        						<label htmlFor="password">Password</label>
        						<input type={showPassword ? 'text': 'password'} id="password" name="password" placeholder="Enter your password" required />
      						</div>
						
						<div className={`${styles['check-box']} ${styles["form-group"]}`}>
							<label htmlFor='showpassword'>Show password</label>
							<input type='checkbox'
								id='showpassword'
								name='showpassword'
								checked={showPassword}
								onChange={handleToggle}/>
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
