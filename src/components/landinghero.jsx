import Slider from "react-slick";
import { motion } from "framer-motion";
import { ArrowRight, Search } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const destinations = [
  { name: "Paris, France", slug: "paris", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34" },
  { name: "Nairobi, Kenya", slug: "nairobi", image: "https://images.unsplash.com/photo-1558979158-65a1eaa08691" },
  { name: "Bali, Indonesia", slug: "bali", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e" },
  { name: "New York, USA", slug: "new-york", image: "https://images.unsplash.com/photo-1534447677768-be436bb09401" },
  { name: "Tokyo, Japan", slug: "tokyo", image: "https://images.unsplash.com/photo-1551776235-dde6d4829808" },
];

const LandingHero = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 800,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const destination = e.target.destination.value;
    const date = e.target.date.value;
    window.location.href = `/tours?destination=${destination}&date=${date}`;
  };

  return (
    <section className="relative h-screen w-full">
      <Slider {...settings} className="h-screen">
        {destinations.map((dest, index) => (
          <div key={index} className="relative h-screen w-full">
            {/* Background Image */}
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${dest.image})` }}>
              <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Overlay Text */}
            <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white px-4">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg"
              >
                {dest.name}
              </motion.h1>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="bg-yellow-500 hover:bg-yellow-600 text-black text-lg px-6 py-3 rounded-2xl shadow-lg flex items-center gap-2 mb-6"
              >
                View Destination <ArrowRight size={18} />
              </motion.button>

              {/* Search Bar */}
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="flex flex-wrap gap-4 justify-center bg-white/90 backdrop-blur-sm rounded-2xl p-4 max-w-2xl w-full"
              >
                <input
                  type="text"
                  name="destination"
                  placeholder="Where to?"
                  className="flex-1 px-4 py-3 rounded-xl border focus:outline-none"
                  required
                />
                <input
                  type="date"
                  name="date"
                  className="px-4 py-3 rounded-xl border focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-xl flex items-center gap-2"
                >
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
