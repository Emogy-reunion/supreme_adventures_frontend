import react from 'react';
import styles from '../styles/Hero.module.css';


const LandingHero = () => {
        return (
                <>
                        <section className={styles.hero}>
                                <div className={styles['hero-content']}>
                                        <h1>Discover Your Next Adventure</h1>
                                        <p>Tailored tours to the world's most stunning destinations</p>
                                        <a href="#tours"><button className={styles.btn}>Explore Tours</button></a>
                                </div>
                        </section>
                </>
        );
};

export default LandingHero;
