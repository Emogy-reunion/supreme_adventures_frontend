import Slider from "react-slick";
import { motion } from "framer-motion";
import { ArrowRight, Search, ChevronLeft, ChevronRight } from "lucide-react";
import styles from "../styles/LandingHero.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const destinations = [
  { name: "Paris, France", slug: "paris", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34" },
  { name: "Nairobi, Kenya", slug: "nairobi", image: "https://images.unsplash.com/photo-1558979158-65a1eaa08691" },
  { name: "Bali, Indonesia", slug: "bali", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e" },
  { name: "New York, USA", slug: "new-york", image: "https://images.unsplash.com/photo-1534447677768-be436bb09401" },
  { name: "Tokyo, Japan", slug: "tokyo", image: "https://images.unsplash.com/photo-1551776235-dde6d4829808" },
];

// Custom arrows
const NextArrow = ({ onClick }) => (
  <div className={styles.nextArrow} onClick={onClick}>
    <ChevronRight size={24} />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div className={styles.prevArrow} onClick={onClick}>
    <ChevronLeft size={24} />
  </div>
);

const LandingHero = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 800,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const destination = e.target.destination.value;
    const date = e.target.date.value;
    window.location.href = `/tours?destination=${destination}&date=${date}`;
  };

  return (
    <section className={styles.heroSection}>
      <Slider {...settings}>
        {destinations.map((dest, index) => (
          <div key={index} className={styles.slide}>
            <div
              className={styles.backgroundImage}
              style={{ backgroundImage: `url(${dest.image})` }}
            >
              <div className={styles.overlay} />
            </div>

            <div className={styles.content}>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className={styles.title}
              >
                {dest.name}
              </motion.h1>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className={styles.viewButton}
                onClick={() => (window.location.href = `/destinations/${dest.slug}`)}
              >
                View Destination <ArrowRight size={20} />
              </motion.button>

              <motion.form
                onSubmit={handleSearch}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                className={styles.searchForm}
              >
                <input
                  type="text"
                  name="destination"
                  placeholder="Where to?"
                  className={styles.input}
                  required
                />
                <input
                  type="date"
                  name="date"
                  className={styles.input}
                />
                <button type="submit" className={styles.searchButton}>
                  <Search size={18} /> Search
                </button>
              </motion.form>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default LandingHero;
