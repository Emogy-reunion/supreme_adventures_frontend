import React from 'react';
import styles from '../components/Updatepasswordform.module';


const UpdatePasswordForm = ({ userId }) => {
	return (
			<>
				<section id={styles['update-password-section']}>
					<div className={styles['update-container']}>
    						<div className={styles.logo}>
      							<img src="/supreme.svg" alt="Supreme adventures Logo" />
    						</div>
   					 	<h2>Update Password</h2>
						<p>Please enter and confirm your new password to complete the reset process.</p>
						<form className={styles['update-password-form']}>
							<div className={styles['form-group']}>
								<label htmlFor='password'>Email</label>
								<input type='password' id='password' name='password' placeholder='Enter you new password...' required />
							</div>

							<div className={styles['form-group']}>
                                                                <label htmlFor='confirmpassword'>Email</label>
                                                                <input type='password' id='confirmpassword' name='confirmpassword' placeholder='Confirm you new password...' required />
                                                        </div>
							
							<div className={styles["form-group"]}>
								<label htmlFor='showpassword'>Show password</label>
								<input type='checkbox' id='showpassword' name='showpassword' />
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
