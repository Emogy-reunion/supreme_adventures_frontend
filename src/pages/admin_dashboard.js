import React from 'react';
import AdminHero from '../components/adminhero';
import withAdmin from '../hoc/withAdmin';

const AdminDashboard = () => {
	return (
		<>
			<AdminHero />
		</>
	);
};

export default withAdmin(AdminDashboard);
