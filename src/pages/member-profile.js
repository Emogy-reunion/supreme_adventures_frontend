import React from 'react';
import Link from 'next/link';
import ProfileField from '../components/profilefield';
import styles from '../styles/profile.css';
import withAuth from '../hoc/withAuth';

const MemberProfilePage = ({ user, error }) => {

	if (error) {
		return <p>{error}</p>;
	}
	return (
		<div className="profile-container">
      			<h1 className="profile-title">Your Profile</h1>
			
			<div className="profile-picture-container">
        			<img
					src={user.profile_picture ? `/api/send_image/${user.profile_picture}` : '/default-avatar.png'}
          				alt="Profile"
          				className="profile-picture"
        			/>
      			</div>

      			{!user.verified && (
        			<div className="verify-warning">
          				<p>Your account is not verified.</p>
          				<Link href="#">
            					<span className="verify-link">Click here to verify your account</span>
          				</Link>
        			</div>
      			)}

		      <div className="profile-section">
        			<ProfileField label="Full Name" value={`${user.first_name} ${user.last_name}`} />
        			<ProfileField label="Email" value={user.email} />
        			<ProfileField label="Phone Number" value={user.phone_number} />
        			<ProfileField label="Role" value={user.role} />
        			<ProfileField label="Verified" value={user.verified ? 'Yes' : 'No'} />
        			<ProfileField label="Joined" value={user.registered_on} />
      			</div>
    		</div>
  	);
};


const handleAuthResponse = async (response, req) => {
	try {
		const data = await response.json();

		if (data.role !== 'member') {
			return {
				redirect: {
					destination: '/admin_dashboard',
					permanent: false,
				},
			};
		} else {
			const profileResponse = await fetch(`${baseUrl}/api/member_profile`, {
				method: 'GET',
				headers: {
					cookie: req.headers.cookie || '',
				},
			});

			const profileData = await profileResponse.json();

			if (profileResponse.ok) {
				return {
					props: {
						user: profileData || {},
						error: null,
					},
				};
			} else {
				return {
					props: {
						error: profileData.error || 'Failed to fetch your profile. Please try again!.',
						user: {},
					},
				};
			}
		}
	} catch (error) {
		return {
			props: {
				error: 'Failed to fetch your profile. Please try again!.',
				user: {},
			},
		};
	}
};

const tryRefreshToken = async (req) => {
	try {
		const response = await fetch(`${baseUrl}/api/refresh_token`, {
			method: 'POST',
			headers: {
				cookie: req.headers.cookie || '',
			},
		});

		if (response.ok) {
			return true;
		} else {
			return false;
		}
	} catch (error) {
		return false;
	}
};


const logoutAndRedirect = () => {
	return {
		redirect: {
			destination: '/login',
			permanent: false,
		},
	};
};


export async function getServerSideProps(context) {
	const { req } = context;

	try {
		const response = await fetch(`${baseUrl}/api/is_logged_in`, {
			method: 'GET',
			headers: {
				cookie: req.headers.cookie || '',
			},
		});

		if (response.ok) {
			return await handleAuthResponse(response, req);
		} else {
			const refreshed = await tryRefreshToken(req);
			if (refreshed) {
				const retryResponse = await fetch(`${baseUrl}/api/is_logged_in`, {
					method: 'GET',
					headers: {
						cookie: req.headers.cookie || '',
					},
				});

				if (retryResponse.ok) {
					return await handleAuthResponse(retryResponse, req);
				} else {
					return logoutAndRedirect();
				}
			} else {
				return logoutAndRedirect();
			}
		}
	} catch (error) {
		return logoutAndRedirect();
	}
}



export default withAuth(MemberProfilePage);
