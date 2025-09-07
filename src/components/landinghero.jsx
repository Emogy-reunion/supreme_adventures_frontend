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
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${dest.image})` }}
            >
              <div className="absolute inset-0 bg-black/50" />
            </div>

            {/* Overlay Text */}
            <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white px-4">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg"
              >
                {dest.name}
              </motion.h1>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="bg-yellow-500 hover:bg-yellow-600 text-black text-lg sm:text-xl px-6 sm:px-8 py-3 sm:py-4 rounded-3xl shadow-lg font-semibold flex items-center gap-2 mb-8 transition-all duration-300"
              >
                View Destination <ArrowRight size={20} />
              </motion.button>

              {/* Search Bar */}
              <motion.form
                onSubmit={handleSearch}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center bg-white/90 backdrop-blur-md rounded-3xl p-4 sm:p-6 max-w-3xl w-full shadow-md"
              >
                <input
                  type="text"
                  name="destination"
                  placeholder="Where to?"
                  className="flex-1 px-4 py-3 sm:py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-gray-800 placeholder-gray-500"
                  required
                />
                <input
                  type="date"
                  name="date"
                  className="px-4 py-3 sm:py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-gray-800"
                />
                <button
                  type="submit"
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl flex items-center gap-2 justify-center transition-all duration-300 shadow-md"
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
