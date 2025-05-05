import React from 'react';
import styles from '../styles/Reviewspreview.module.css';

const ReviewsPreview = () => {
	return (
		<>
			<section id={styles['testimonials-section']}>
    				<h2>What Our Customers Say</h2>
    				<div className={styles["testimonials-container"]}>
      					<div className={styles.testimonial}>
        					<p>“Our Dubai experience was incredible thanks to the amazing organization and attention to detail. Everything ran smoothly from start to finish!.”</p>
						<h4>- Shantel.</h4>
      					</div>
      					
					<div className={styles.testimonial}>
        					<p>“Seeing lions up close on the safari was an unforgettable moment. Highly recommend!”</p>
						<h4>- Omosh.</h4>
      					</div>

      					<div className={styles.testimonial}>
        					<p>“The Singapore tour was perfectly planned and stress-free. The guides were professional, friendly, and made sure we saw the best of the city!”</p>
						<h4>- Mark.</h4>
      					</div>

					<div className={styles.testimonial}>
						<p>“Our trip to Zanzibar was unforgettable. The tour company took care of every detail, allowing us to fully relax and enjoy the beautiful beaches and rich culture.”
						</p>
						<h4>- Shellmith.</h4>
    				</div>
  			</section>
		</>
	);
};

export default ReviewsPreview;
