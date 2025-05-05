import React from 'react';
import styles from '../styles/Reviewspreview.module.css';

const ReviewsPreview = () => {
	return (
		<>
			<section id={styles['testimonials-section']}>
    				<h2>What Our Customers Say</h2>
    				<div className={styles["testomonials-container"]}>
      					<div className={styles.testimonial}>
        					<p>“Our Dubai experience was incredible thanks to the amazing organization and attention to detail. Everything ran smoothly from start to finish!.”</p>
        					<br Maria./>
      					</div>
      					
					<div className={styles.testimonial}>
        					<p>“Seeing lions up close on the safari was an unforgettable moment. Highly recommend!”</p>
        					<br Omosh. />
      					</div>

      					<div className={styles.testimonial}>
        					<p>“The Singapore tour was perfectly planned and stress-free. The guides were professional, friendly, and made sure we saw the best of the city!”</p>
        					<br Anita R. />
      					</div>
    				</div>
  			</section>
		</>
	);
};

export default ReviewsPreview;
