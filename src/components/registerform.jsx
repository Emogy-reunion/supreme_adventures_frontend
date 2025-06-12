import React from 'react';
import Link from 'next/head';
import styles from '../styles/Registerform.module.css';
import { useState } from 'react';
import { useRouter } from 'next/router';


const RegisterForm = () => {

	const router = useRouter();
	const [showPassword, setShowPassword] = useState(false)
	const [formErrors, setFormErrors] = useState({});
	const [globalError, setGlobalError] = useState(null);
	const [successMessage, setSuccessMessage] = useState(null);
	const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

	const handleToggle = () => {
		setShowPassword((prev) => !prev);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setFormErrors({});
		setGlobalError(null);
		setSuccessMessage(null);

		const formData = new FormData(event.target);
		const formJson = Object.fromEntries(formData.entries());

		try {
			const response = await fetch(`${baseUrl}/register`, {
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
					setGlobalError(data);

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
		} catch (error) {
			alert('Network error. Please try again.');
		}
	};

	return (
		<>
			<section className={styles['register-section']}>
				<div className={styles["signup-container"]}>
    					<div className={styles.logo}>
      						<img src="/supreme.svg" alt="Supreme adventures Logo" />
    					</div>
    					<h2>Create Account</h2>
    					
					<form className={styles['signup-form']} onSubmit={handleSubmit}>

						{(globalError || successMessage) && (
							<div className={ globalError ? styles["error"] : styles["success-message"]}>
								<p>{globalError || successMessage}</p>
							</div>
						)}
						
      						<div className={styles["form-group"]}>
        						<label htmlFor="first_name">First Name</label>
        						<input type="text" id="first_name" name="first_name" required />
							{formErrors.first_name && (
								<p className={styles["error-message"]}>{formErrors.first_name}</p>
							)}
      						</div>

						<div className={styles["form-group"]}>
                                                        <label htmlFor="last_name">Last Name</label>
                                                        <input type="text" id="last_name" name="last_name" required />
							{formErrors.last_name && (
                                                                <p className={styles["error-message"]}>{formErrors.last_name}</p>
                                                        )}
                                                </div>
      						<div className={styles["form-group"]}>
        						<label htmlFor="email">Email Address</label>
        						<input type="email" id="email" name="email" required />
							{formErrors.email && (
                                                                <p className={styles["error-message"]}>{formErrors.email}</p>
                                                        )}
      						</div>

						<div className={styles["form-group"]}>
                                                        <label htmlFor="username">Username</label>
                                                        <input type="text" id="username" name="username" required />
							{formErrors.username && (
                                                                <p className={styles["error-message"]}>{formErrors.username}</p>
                                                        )}
                                                </div>

						<div className={styles["form-group"]}>
							<label htmlFor="phone_number">Phone Number</label>
  							<input
    								type="tel"
    								id="phone_number"
    								name="phone_number"
    								required
    								pattern="^(07\d{8}|(\+2547\d{8}))$"
    								placeholder="e.g. 0712345678 or +254712345678"
  							/>
							{formErrors.phone_number && (
                                                                <p className={styles["error-message"]}>{formErrors.phone_number}</p>
                                                        )}
						</div>

      						<div className={styles["form-group"]}>
        						<label htmlFor="password">Create Password</label>
        						<input type={showPassword ? "text" : "password"} id="password" name="password" placeholder="Choose a strong password" required />
							{formErrors.password && (
                                                                <p className={styles["error-message"]}>{formErrors.password}</p>
                                                        )}
      						</div>

      						<div className={styles["form-group"]}>
        						<label htmlFor="confirmpassword">Confirm Password</label>
        						<input type={showPassword ? "text" :"password"} id="confirmpassword" name="confirmpassword" placeholder="Retype your password" required />
							{formErrors.confirmpassword && (
                                                                <p className={styles["error-message"]}>{formErrors.confirmpassword}</p>
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
