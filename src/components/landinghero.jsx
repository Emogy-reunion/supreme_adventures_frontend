import Slider from "react-slick";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Search, ChevronLeft, ChevronRight } from "lucide-react";
import styles from "../styles/LandingHero.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const destinations = [
	{ name: "Bali, Indonesia", slug: "bali", image: "bali.jpeg" },
	{ name: "Maasai Mara, Kenya", slug: "maasai-mara", image: "maasai-mara.jpg" },
	{ name: "Diani, Kenya", slug: "diani", image: "diani.jpg" },
	{ name: "Dubai, United Arab Emirates", slug: "dubai", image: "dubai.jpg" },
	{name: "Tokyo, Japan", slug: "tokyo", image: "https://images.unsplash.com/photo-1551776235-dde6d4829808" },
];


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

	const router = useRouter();

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

              						{/* View Destination Button */}
              						<motion.button
                						initial={{ opacity: 0, y: 20 }}
                						animate={{ opacity: 1, y: 0 }}
                						transition={{ duration: 1, delay: 0.3 }}
                						className={styles.viewButton}
                						onClick={() => router.push(`/destinations`)}
              						>
                						View Destinations <ArrowRight size={20} />
              						</motion.button>
            					</div>
          				</div>
        			))}
      			</Slider>
    		</section>
  	);
};

export default LandingHero;
