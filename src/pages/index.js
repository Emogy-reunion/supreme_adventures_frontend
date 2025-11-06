import React from 'react';
import NavBar from '../components/navbar';
import LandingHero from '../components/landinghero';
import PopularDestinations from '../components/populardestinations';
import WhyChooseUs from '../components/whychooseus';
import ReviewsPreview from '../components/reviewspreview.jsx';
import DiscoverSection from '../components/discover.jsx';
import Footer from '../components/footer.jsx';
import SocialMediaSection from '../components/socialmediasection';

const Home = () => {
	return (
		<>
			<NavBar />
			<LandingHero />
			<SocialMediaSection />
			<PopularDestinations />
			<WhyChooseUs />
			<ReviewsPreview />
			<DiscoverSection />
			<Footer />
		</>
	);
};

export default Home;
