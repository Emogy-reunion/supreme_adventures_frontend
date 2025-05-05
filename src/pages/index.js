import React from 'react';
import NavBar from '../components/navbar';
import LandingHero from '../components/landinghero';
import PopularDestinations from '../components/populardestinations';
import WhyChooseUs from '../components/whychooseus';
import ReviewsPreview from '../components/reviewspreview.jsx';
import NewsLetter from '../components/newsletter.jsx';
import Footer from '../components/footer.jsx';

const Home = () => {
	return (
		<>
			<NavBar />
			<LandingHero />
			<PopularDestinations />
			<WhyChooseUs />
			<ReviewsPreview />
			<NewsLetter />
			<Footer />
		</>
	);
};

export default Home;
