import React from 'react';
import NavBar from '../components/navbar';
import LandingHero from '../components/landinghero';
import PopularDestinations from '../components/populardestinations';

const Home = () => {
	return (
		<>
			<NavBar />
			<LandingHero />
			<PopularDestinations />
		</>
	);
};

export default Home;
