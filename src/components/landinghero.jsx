import React from 'react';
import { useState, useEffect } from 'react';
import Typewriter from 'react-simple-typewriter'
import styles from '../styles/Hero.module.css';


const LandingHero = () => {
	const [showContent, setShowContent] = useState(false);

	useEffect(() => {
		const delay = 3750;
		const timer = setTimeout(() => setShowContent(true), delay);
		return () => clearTimeout(timer);
	}, []);
        return (
                <>
                        <section className={styles['hero-container']}>
				<div className={styles.hero}>
                                	<div className={styles['hero-content']}>
                                        	<h1>
						<Typewriter
							words={['Where do you wish to go?']}
							loop={1}
							cursor
							cursorstyle='|'
							typeSpeed={70}
							deleteSpeed={50}
							delaySpeed={1000}
						/>
						</h1>
                                        	{showContent && (
							<div className={styles['fade-in']}>
								<p>Discover breathtaking destinations and unforgettable tours curated just for you.</p>
              							<div className={styles['hero-buttons']}>
									<a href="#destinations"><button className={styles.btn}>Explore Destinations</button></a>
									<a href="#tours"><button className={styles.btn}>View Tours</button></a>
								</div>
							</div>
						)}
                                	</div>
				</div>
                        </section>
                </>
        );
};

export default LandingHero;
