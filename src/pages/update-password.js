import React from 'react'
import Footer from '../components/footer';
import UpdatePasswordForm from '../components/updatepasswordform';


const UpdatePassword = () => {
	const token = new URLSearchParams(window.location.search).get("token");
	if (token) {
		window.history.replaceState(null, "", "/reset-password");
	}

        return (
                        <>
                                <UpdatePasswordForm token={token} />
                                <Footer />
                        </>
        );
};

export default UpdatePassword;
