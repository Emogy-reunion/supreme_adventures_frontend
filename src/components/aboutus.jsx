import Image from 'next/image';
import styles from '../styles/Aboutus.module.css';

const AboutUs= () => {
	return (
    	<section className={styles.aboutSection}>
      		<div className={styles.contentWrapper}>
        		<div className={styles.text}>
          			<h2 className={styles.heading}>About Supreme Adventures</h2>
          			<p className={styles.paragraph}>
            				Supreme Adventures Tours Company is your trusted partner in unforgettable travel experiences across Kenya and beyond.
            				We specialize in crafting tailor-made safaris, beach escapes, cultural explorations, and corporate retreats that
            				connect you with nature, adventure, and local communities.
          			</p>
          			<p className={styles.paragraph}>
            				With years of experience and a passionate team of travel experts, our goal is simple: to turn your travel dreams
            				into reality — whether you’re seeking a thrilling Maasai Mara safari or a luxury getaway in Zanzibar.
          			</p>
          			<p className={styles.paragraph}>
            				We believe travel is more than just a destination — it’s about stories, people, and unforgettable memories.
          			</p>
        		</div>
		</div>
    </section>
  );
};

export default AboutUs;

