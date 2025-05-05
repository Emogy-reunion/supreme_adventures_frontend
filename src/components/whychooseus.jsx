import React from 'react';
import styles from '../styles/Whychooseus.module.css';


const WhyChooseUs = () => {
	return (
		<>
			<section id={styles['why-choose-us-container']}>
				<h2>Why Choose Supreme Adventures?</h2>
				
				<div className={styles["icon-container"]}>
      					<div className={styles["icon-box"]}>
        					<img src="https://img.icons8.com/ios-filled/50/globe--v1.png" alt="Global" />
        					<h3>Expert Guides</h3>
        					<p>Travel with experienced professionals who know the hidden gems.</p>
      					</div>

      					<div className={styles["icon-box"]}>
        					<img src="https://img.icons8.com/ios-filled/50/discount.png" alt="Price"/>
        					<h3>Best Prices</h3>
        					<p>Affordable and transparent pricing. No surprises.</p>
      					</div>

      					<div className={styles["icon-box"]}>
        					<img src="https://img.icons8.com/ios-filled/50/phone.png" alt="Support"/>
        					<h3>24/7 Support</h3>
        					<p>We’re here anytime you need us, wherever you are.</p>
      					</div>
    				</div>
  			</section>
		</>
	);
};


export default WhyChooseUs;
