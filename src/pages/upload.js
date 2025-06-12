import React from 'react';
import withAdmin from '../hoc/withAdmin';
import AdminNavBar from '../components/adminNavbar';
import UploadForm from '../components/uploadform';

const AdminUpload = () => {
	return (
		<>
			<AdminNavBar />
			<UploadForm />
		</>
	);
};

export default withAdmin(AdminUpload);
