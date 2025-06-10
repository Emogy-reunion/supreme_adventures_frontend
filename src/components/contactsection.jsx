import React from 'react';
import styles from '../styles/Contact.module.css';
import { FaWhatsapp } from 'react-icons/fa';
import { useState } from 'react';

const ContactSection = () => {
	const [globalError, setGlobalError] = useState(null);
	const [formErrors, setFormErrors] = useState({});
	const [successMessage, setSuccessMessage] = useState(null);

	const handleSubmit = async (event) => {
		event.preventDefault();
		setGlobalError(null);
		setSuccessMessage(null);
		setFormErrors({});

		const formData = new FormData(event.target);
		const formJson = Object.fromEntries(formData.entries());

		const response = await fetch('http://127.0.0.1:5000/guest_contact', {
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
			body: JSON.stringify(formJson),
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

					setTimeout(() => {
						setFormErrors({});
					}, 5000);
				} else if(data.error) {
					setGlobalError(data.error);
					setTimeout(() => {
						setGlobalError(null);
					}, 5000);
				} else {
					throw new Error('Error: ', Json.stringify(data));
				}
			} else {
				setSuccessMessage(data.success);

				setTimeout(() => {
					setSuccessMessage(null);
				}, 3000);
			}
		} catch (error) {
			alert('Network error! Please try again!');
		}
	};

	return (
		<section className={styles.contactSection}>
			<div className={styles["contact-container"]}>
				<div className={styles.logo}>
      					<img src="/supreme.svg" alt="Supreme adventures Logo" />
    				</div>
				
				<h2 className={styles.heading}>Get in Touch</h2>
	  			<p className={styles.description}>
        				Have questions or want to book a trip? Reach out to us through the form below or contact us directly via WhatsApp.
      				</p>

    				<form className={styles['contact-form']} onSubmit={handleSubmit}>
					{(globalError || successMessage) && (
						<div className={ globalError ? styles["error"] : styles["success-message"]}>
							<p>{globalError || successMessage}</p>
						</div>
					)}

					<div className={styles["form-group"]}>
						<label htmlFor="Name">Name</label>
						<input type="text" id="name" name="name" placeholder="Your name" required />
						{formErrors.name && (
							<p className={styles["error-message"]}>{formErrors.name}</p>
						)}
					</div>

      					<div className={styles["form-group"]}>
        					<label htmlFor="email">Email</label>
        					<input type='email' id='email' name='email' placeholder="Enter your Email" required />
						{formErrors.email && (
							<p className={styles["error-message"]}>{formErrors.email}</p>
						)}
      					</div>
	  					
	  				<div className={styles["form-group"]}>
  						<label htmlFor="message">Message</label>
  						<textarea
    						id="message"
    						name="message"
    						placeholder="Write your message here"
    						required
    						className={styles.textarea}
    						rows="5"
  						></textarea>
						{formErrors.message && (
                                                        <p className={styles["error-message"]}>{formErrors.message}</p>
                                                )}
					</div>
						
						
					<div className={styles['button-container']}>
						<button type="submit" className={styles.btn}>Contact us</button>
					</div>
    				</form> 

        		<div className={styles.whatsappBox}>
          			<p>Prefer chatting on WhatsApp?</p>
          			<a
            				href="https://wa.me/254724933300"
            				className={styles.whatsappLink}
            				target="_blank"
            				rel="noopener noreferrer"
          			>
            				<FaWhatsapp size={24} /> Chat with Us on WhatsApp
          			</a>
        		</div>
	  	</div>
	</section>
	);
};

export default ContactSection;
