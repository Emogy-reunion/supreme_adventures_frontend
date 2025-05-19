import Link from 'next/link';
import styles from "../styles/Passwordresetfailure.module.css";

const PasswordResetFailure = () => {
	return (
		<section className={styles['failure-container']}>
			<div className={styles.card}>
				<div className={styles.logo}>
					<img src="/supreme.svg" alt="Supreme adventures Logo" />
				</div>
				<h2>Password Reset Failed</h2>
				<p>The password reset link may have expired, is invalid, or something went wrong.</p>
        			<Link href="/reset-password" className={styles['reset-link']}>Request a new reset link</Link>
			</div>
    		</section>
  );
};

export default PasswordResetFailure;
