import React from 'react';
import Link from 'next/link';
import styles from '../styles/Resetpasswordemail.module.css';
import { useState } from 'react';

const ResetPasswordEmail = () => {
	const [globalError, setGlobalError] = useState(null);
	const [formErrors, setFormErrors] = useState({});
	const [successMessage, setSuccessMessage] = useState(null);

	const handleSubmit = async (event) => {
		event.preventDefault();

		setGlobalError(null);
		setFormErrors({});
		setSuccessMessage(null);

		const formData = new FormData(event.target);
		const formJson = Object.fromEntries(formData.entries());

		try {
			const response = await fetch('http://127.0.0.1:5000/reset_password', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formJson),
			});

			const data = await response.json();

			if (!response.ok) {
				if (data.errors) {
					const formattedErrors = Object.keys(data.errors).reduce((acc, key) => {
						acc[key] = data.errors[key].join(', ');
						return acc;
					}, {});
					setFormErrors(formattedErrors);

					setTimeout(() => {
						setFormErrors({});
					}, 5000);
				} else if (data.error) {
					setGlobalError(data.error);

					setTimeout(() => {
						setGlobalError(null);
					}, 5000);
				} else {
					throw new Error('Error: ', JSON.stringify(data));
				}
			} else {
				setSuccessMessage(data.success);

				setTimeout(() => {
					setSuccessMessage(null);
				}, 5000);
			}
		} catch(error) {
			alert('Network error. Please try again!');
		}
	};

	return (
			<>
				<section id={styles['reset-section']}>
					<div className={styles['reset-container']}>
    						<div className={styles.logo}>
      							<img src="/supreme.svg" alt="Supreme adventures Logo" />
    						</div>
   					 	<h2>Reset Password</h2>
						<p>Enter your email address and we will send you a link to reset your password.</p>
						<form className={styles['reset-form']} onSubmit={handleSubmit}>
							{(globalError || successMessage) && (
								<div className={globalError ? styles['error'] : styles['success-message']}>
									<p>{globalError || successMessage}</p>
								</div>
							)}
							<div className={styles['form-group']}>
								<label htmlFor='resetpassword'>Email</label>
								<input type='email' id='resetpassword' name='resetpassword' placeholder='Enter you email...' required />
								{formErrors.email (
									<p className={styles['error-message']}>{formErrors.email}</p>
								)}
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
