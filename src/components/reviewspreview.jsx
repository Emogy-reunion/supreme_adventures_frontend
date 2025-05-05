import React from 'react';
import styles from '../styles/Reviewspreview.module.css';

const ReviewsPreview = () => {
	return (
		<>
			<section id={styles['testimonials-section']}>
    				<h2>What Our Customers Say</h2>
    				<div className={styles["testomonials-container"]}>
      					<div classname={styles.testimonial}>
        					“The Paris tour was simply magical. Everything was perfectly organized.”
        					<br><br>– Sarah M.
      					</div>
      					
					<div className={styles.testimonial}>
        					“Seeing lions up close on the safari was an unforgettable moment. Highly recommend!”
        					<br><br>– John D.
      					</div>

      					<div className={styles.testimonial}>
        					“Loved the yoga retreat in Bali. Peaceful, beautiful, and totally worth it.”
        					<br><br>– Anita R.
      					</div>
    				</div>
  			</section>
		</>
	);
};

export default ReviewsPreview;
