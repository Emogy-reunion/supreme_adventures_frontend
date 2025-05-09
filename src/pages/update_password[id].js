import React from 'react'
import Footer from '../components/footer';
import UpdatePasswordForm from '../components/updatepasswordform';
import { useRouter } from 'next/router';


const UpdatePassword = () => {
	const { id: userId } = router.query;

	return (
			<>
				<UpdatePasswordForm userId={userId} />
				<Footer />
			</>
	);
};

export default UpdatePassword;

