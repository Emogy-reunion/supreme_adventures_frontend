import React from 'react';
import Link from 'next/link';
import styles from '../styles/Updatepasswordform.module.css';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Loading from '../components/loading'


const UpdatePasswordForm = ({ token }) => {
	const router = useRouter();
	const [showPassword, setShowPassword] = useState(false);
	const [globalError, setGlobalError] = useState(null);
	const [successMessage, setSuccessMessage] = useState(null);
	const [formErrors, setFormErrors] = useState({});
	const [loading, setLoading] = useState(false);

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


		setLoading(true);
		const start = Date.now();

		try {
			const response = await fetch('/api/update_password', {
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
					setGlobalError(data.error);

                                        setTimeout(() => {
                                                setGlobalError(null);
                                        }, 5000);
				}
			} else {
				setSuccessMessage(data.success);

				setTimeout(() => {
					setSuccessMessage(null);
					router.push('/login');
				}, 3000);
			}
		} catch(error) {
			alert('Network error. Please try again!');
		} const end = Date.now();
			const elapsed = end - start;
			const minLoadingTime = 800; // milliseconds

			setTimeout(() => {
				setLoading(false);
			}, Math.max(minLoadingTime - elapsed, 0));
		}
	};

	return (
			<>
				<section id={styles['update-password-section']}>
					{loading && (
					<div className={styles.loadingOverlay}>
						<Loading />
					</div>
					)}
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
									<p className={styles['error-message']}>{formErrors.password}</p>
								)}
							</div>

							<div className={` ${styles['form-group']} ${styles['check-box']}`}>
                                                                <label htmlFor='confirmpassword'>Email</label>
                                                                <input type={showPassword ? 'text' : 'password'} id='confirmpassword' name='confirmpassword' placeholder='Confirm you new password...' required />
								{formErrors.confirmpassword && (
                                                                        <p className={styles['error-message']}>{formErrors.confirmpassword}</p>
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
