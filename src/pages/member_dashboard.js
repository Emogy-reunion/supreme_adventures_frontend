import React from 'react';
import MemberHero from '../components/memberhero';
import withAuth from '../hoc/withAuth';
import MemberNavBar from '../components/membernavbar';

const MemberDashboard = () => {
	return (
		<>
			<MemberNavBar />
			<MemberHero />
		</>
	);
};

export default withAuth(MemberDashboard);
