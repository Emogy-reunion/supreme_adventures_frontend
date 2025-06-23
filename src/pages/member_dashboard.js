import React from 'react';
import MemberHero from '../components/memberhero';
import withAuth from '../hoc/withAuth';
import MemberNavBar from '../components/membernavbar';
import WhyChooseUs from '../components/whychooseus';
import ReviewsPreview from '../components/reviewspreview.jsx';
import DiscoverSection from '../components/discover.jsx';

const MemberDashboard = () => {
	return (
		<>
			<MemberNavBar />
			<MemberHero />
			<WhyChooseUs />
			<ReviewsPreview />
			<DiscoverSection />
		</>
	);
};

export default withAuth(MemberDashboard);
