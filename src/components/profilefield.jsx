import React from 'react';
import styles from '../styles/profile.css';

const  ProfileField = ({ label, value }) => {
	return (
		<div className={styles["profile-row"]}>
			<span className={styles["profile-label"]}>{label}</span>
			<span className={styles["profile-value"]}>{value}</span>
		</div>
	);
};

export default ProfileField;
