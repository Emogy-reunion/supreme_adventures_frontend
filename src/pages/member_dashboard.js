import React from 'react';
import MemberHero from '../components/memberhero';
import withAuthfrom '../hoc/withAuth';
import MemberNavBar from '../components/adminNavbar';

const MemberDashboard = () => {
	return (
		<>
			<MemberNavBar />
			<MemberHero />
		</>
	);
};

export default withAuth(MemberDashboard);
