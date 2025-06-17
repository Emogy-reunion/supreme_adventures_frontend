import React from 'react';
import MemberNavBar from '../components/membernavbar';
import AboutUs from '../components/aboutus';
import withAuth from '../hoc/withAuth';

const MemberAbout = () => {
	return (
		<>
			<MemberNavBar />
			<AboutUs />
		</>
	);
};

export default withAuth(MemberAbout);
