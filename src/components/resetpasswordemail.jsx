import React from 'react';
import styles from '../styles/Resetpasswordemail.module.css';

const ResetPasswordEmail = () => {
	return (
			<>
				<section className={styles['reset-password']}>
					<div className={styles['reset-container']}>
						<form>
							<div className={styles['form-group']}>
								<label htmlFor='resetpassword'>Email</label>
								<input type='email' id='resetpassword' name='resetpassword' placeholder='Enter you email...' required>
							</div>
					</div>
				</section>
			</>
	);
};


export default ResetPasswordEmail;

