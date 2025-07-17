import React from 'react';
import styles from '../styles/Loginform.module.css';
import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import Loading from '../components/loading';

const LoginForm = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [formErrors, setFormErrors] = useState({});
	const [globalError, setGlobalError] = useState(null);
	const [successMessage, setSuccessMessage] = useState(null);
	const { setUserRole, setAuthStatus } = useAuth();
	const [loading, setLoading] = useState(false);
	const router = useRouter();


	const handleToggle = () => {
		setShowPassword((prev) => !prev);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		
		setGlobalError(null);
		setSuccessMessage(null);
		setFormErrors({});

		const formData = new FormData(event.target);
		const formJson = Object.fromEntries(formData.entries());
		
		setLoading(true);
		const start = Date.now();
		try {
			const response = await fetch(`/api/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formJson),
				credentials: 'include',
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
					setGlobalError('An unexpected error occurred. Please try again.');
					setTimeout(() => {
                                                setGlobalError(null);
                                        }, 5000);
				}
			} else {
				setUserRole(data.role)
				setAuthStatus(data.role);
				setSuccessMessage(data.success);
				setTimeout(() => {
					setSuccessMessage(null);
					if (data.role === 'admin') {
						router.replace('/admin_dashboard');
					} else {
						router.replace('/member_dashboard');
					}
				}, 2000);
			}
		} catch(error) {
			alert('Network error. Please try again.');
		} finally {
			const end = Date.now();
			const elapsed = end - start;
			const minLoadingTime = 800; // milliseconds

			setTimeout(() => {
				setLoading(false);
			}, Math.max(minLoadingTime - elapsed, 0));
		}
	};


	return (
		<>
			<section id={styles['login-section']}>
				{loading && (
					<div className={styles.loadingOverlay}>
						<Loading />
					</div>
				)}
				<div className={styles["login-container"]}>
    					<div className={styles.logo}>
      						<img src="/supreme.svg" alt="Supreme adventures Logo" />
    					</div>

   					 <h2>Login</h2>
					
					<div className={styles.formWrapper}>
    						<form className={styles['login-form']} onSubmit={handleSubmit}>
							{(globalError || successMessage) && (
								<div className={globalError ? styles['error'] : styles['success-message']}>
									<p>{globalError || successMessage}</p>
								</div>
							)}
							<div className={styles["form-group"]}>
								<label htmlFor="identifier">Email or Username</label>
								<input type="text" id="identifier" name="identifier" placeholder="Email or username" required />
								{formErrors.identifier && (
									<p className={styles['error-message']}>{formErrors.identifier}</p>
								)}
							</div>

      							<div className={styles["form-group"]}>
        							<label htmlFor="password">Password</label>
        							<input type={showPassword ? 'text': 'password'} id="password" name="password" placeholder="Enter your password" required />
								{formErrors.password && (
									<p className={styles['error-message']}>{formErrors.password}</p>
								)}
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
					</div>

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
