import React from 'react';
import MemberHero from '../components/memberhero';
import withAuth from '../hoc/withAuth';
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
