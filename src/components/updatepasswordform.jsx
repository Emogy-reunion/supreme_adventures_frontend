import React from 'react';
import Link from 'next/link';
import styles from '../styles/Updatepasswordform.module.css';
import { useState } from 'react';


const UpdatePasswordForm = ({ token }) => {
	const [showPassword, setShowPassword] = useState(false);
	const [globalError, setGlobalError] = useState(null);
	const [successMessage, setSuccessMessage] = useState(null);
	const [formErrors, setFormErrors] = useState({});

	const handleToggle = () => {
		setShowPassword((prev) => {
			return !prev;
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		
		// clear any existing errors
		setFormErrors({});
		setGlobalError(null);
		setSuccessMessage(null);

		const formData = new FormData(event.target);
		formData.append('token', token); // add user id to retrieve user you want to update their password
		const formJson = Object.fromEntries(formData.entries());

		try {
			const response = await fetch('http://127.0.0.1:5000/update_password', {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body : JSON.stringify(formJson),
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
				<section id={styles['update-password-section']}>
					<div className={styles['update-container']}>
    						<div className={styles.logo}>
      							<img src="/supreme.svg" alt="Supreme adventures Logo" />
    						</div>
   					 	<h2>Update Password</h2>
						<p>Please enter and confirm your new password to complete the reset process.</p>
						<form className={styles['update-password-form']} onSubmit={handleSubmit}>
							{(globalError || successMessage) && (
								<div className={globalError ? styles.error : styles['success-message']}>
									<p>{globalError || successMessage}</p>
								</div>
							)}
							<div className={styles['form-group']}>
								<label htmlFor='password'>Email</label>
								<input type={showPassword ? 'text' : 'password'} id='password' name='password' placeholder='Enter you new password...' required />
								{formErrors.password && (
									<p>{formErrors.password}</p>
								)}
							</div>

							<div className={` ${styles['form-group']} ${styles['check-box']}`}>
                                                                <label htmlFor='confirmpassword'>Email</label>
                                                                <input type={showPassword ? 'text' : 'password'} id='confirmpassword' name='confirmpassword' placeholder='Confirm you new password...' required />
								{formErrors.confirmpassword && (
                                                                        <p>{formErrors.confirmpassword}</p>
                                                                )}
                                                        </div>

							<div className={`${styles["form-group"]} ${styles['check-box']}`}>
                                                        	<label htmlFor='showpasswords'>Show passwords</label>
                                                        	<input
									type='checkbox'
									id='showpasswords'
									checked={showPassword}
									onChange={handleToggle}
									name='showpasswords' />
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

export default UpdatePasswordForm;
