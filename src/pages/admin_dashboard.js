import React from 'react';
import AdminHero from '../components/adminhero';
import withAdmin from '../hoc/withAdmin';
import AdminNavBar from '../components/adminNavbar';

const AdminDashboard = () => {
	return (
		<>
			<AdminNavBar />
			<AdminHero />
		</>
	);
};

export default withAdmin(AdminDashboard);
