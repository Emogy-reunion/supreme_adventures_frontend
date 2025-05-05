import React from 'react';
import NavBar from '../components/navbar';
import LandingHero from '../components/landinghero';
import PopularDestinations from '../components/populardestinations';
import WhyChooseUs from '../components/whychooseus';
import ReviewsPreview from '../components/reviewspreview.jsx';

const Home = () => {
	return (
		<>
			<NavBar />
			<LandingHero />
			<PopularDestinations />
			<WhyChooseUs />
			<ReviewsPreview />
		</>
	);
};

export default Home;
