import React from 'react';
import MemberHero from '../components/memberhero';
import withAuth from '../hoc/withAuth';
import MemberNavBar from '../components/membernavbar';
import WhyChooseUs from '../components/whychooseus';
import ReviewsPreview from '../components/reviewspreview.jsx';
import NewsLetter from '../components/newsletter.jsx';

const MemberDashboard = () => {
	return (
		<>
			<MemberNavBar />
			<MemberHero />
			<WhyChooseUs />
			<ReviewsPreview />
			<NewsLetter />
		</>
	);
};

export default withAuth(MemberDashboard);
