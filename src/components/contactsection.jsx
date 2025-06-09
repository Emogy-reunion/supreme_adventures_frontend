import React from 'react';
import styles from '../styles/Contact.module.css';
import { FaWhatsapp } from 'react-icons/fa';

const ContactSection = () => {
  return (
    <section className={styles.contactSection}>
	  <h2 className={styles.heading}>Get in Touch</h2>
	  <p className={styles.description}>
	  Have questions or want to book a trip? Reach out to us through the form below or contact us directly via WhatsApp.
	  </p>

	 <div className={styles["contact-container"]}>
    					<div className={styles.logo}>
      						<img src="/supreme.svg" alt="Supreme adventures Logo" />
    					</div>

   					 <h2 className={styles.heading}>Get in Touch</h2>
	  				 <p className={styles.description}>
        					Have questions or want to book a trip? Reach out to us through the form below or contact us directly via WhatsApp.
      					</p>

    					<form className={styles['contact-form']} onSubmit={handleSubmit}>
						<div className={styles["form-group"]}>
							<label htmlFor="Name"></label>
							<input type="text" id="name" name="name" placeholder="Your name" required />
						</div>

      						<div className={styles["form-group"]}>
        						<label htmlFor="email">Password</label>
        						<input type='email' placeholder="Enter your Email" required /
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
						</div>
						
						
						<div className={styles['button-container']}>
							<button type="submit" className={styles.btn}>Sign In</button>
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
}

export default ContactSection;
