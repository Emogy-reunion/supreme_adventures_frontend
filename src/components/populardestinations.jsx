import React from 'react';
import styles from '../styles/Popular.module.css';
import Image from 'next/image';


const PopularDestinations = () => {
	return (
		<>
			<section id={styles.destinations}>
    				<h2>Popular Tours</h2>
    				<div className={styles['card-container']}>
      					<div className={styles.card}>
						<Image 
    							src="/dubai.jpg" 
    							alt="Paris" 
    							width={500} 
    							height={300} 
    							className={styles.image}
  						/>
  						<div className={styles['card-content']}>
    							<h3>Dubai Getaway</h3>
    							<p>Experience luxury in the heart of the desert — stunning skyscrapers, golden dunes, and unforgettable adventures await in Dubai.</p>
  						</div>
					</div>

      					<div className={styles.card}>
  						<Image 
    							src="/safari.jpg" 
    							alt="Safari" 
    							width={500} 
    							height={300} 
    							className={styles.image}
  						/>
  						<div className={styles['card-content']}>
    							<h3>Kenya Safari</h3>
    							<p>Spot the Big Five on this luxury safari experience in the heart of Africa.</p>
  						</div>
					</div>

      					<div className={`${styles.card} ${styles.hide}`}>
  						<Image 
    							src="/zanzibar.jpg" 
    							alt="Zanzibar" 
    							width={500} 
    							height={300} 
    							className={styles.image}
  						/>
  						<div className={styles['card-content']}>
    							<h3>Zanzibar Retreat</h3>
    							<p>Escape to paradise — relax on white-sand beaches, explore turquoise waters, and unwind in the serene beauty of Zanzibar.</p>
  						</div>
					</div>
    				</div>
  			</section>
		</>
	);
};

export default PopularDestinations;
