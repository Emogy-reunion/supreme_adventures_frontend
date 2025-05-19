import React from 'react'
import Footer from '../components/footer';
import UpdatePasswordForm from '../components/updatepasswordform';


const UpdatePassword = () => {
	const [token, setToken] = useState(null);
	
	useEffect(() => {
    		const urlToken = new URLSearchParams(window.location.search).get("token");
    		if (urlToken) {
      			setToken(urlToken);
      			window.history.replaceState(null, "", "/reset-password"); // clean URL
    		}
	}, []);

        return (
                        <>
                                <UpdatePasswordForm token={token} />
                                <Footer />
                        </>
        );
};

export default UpdatePassword;
