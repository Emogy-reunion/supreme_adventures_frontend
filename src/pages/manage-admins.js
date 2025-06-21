import { useState } from 'react';
import styles from '../styles/Adminmanagement.module.css';

const ManageAdmins = ({ initialAdmins }) => {
	const [admins, setAdmins] = useState(initialAdmins || []);
	const [email, setEmail] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const handleAddAdmin = async () => {
		if (!email) {
			setError('Please enter an email.');
			return;
		}

		setError('');
		setLoading(true);

		try {
			const res = await fetch('/api/promote_user', {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email }),
			});
			const data = await res.json();

			if (res.ok) {
				setAdmins((prev) => [...prev, data.admin]);
				setEmail('');
			} else {
				setError(data.error || 'Failed to add admin.');
			}
		} catch {
			setError('Server error.');
		} finally {
			setLoading(false);
		}
	};

	const handleRevokeAdmin = async (adminId) => {
		const confirmDelete = confirm('Are you sure you want to revoke this admin?');
		if (!confirmDelete) return;

		try {
			const res = await fetch('/api/revoke_admin_privileges', {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ admin_id: adminId }),
			});
			const data = await res.json();

			if (res.ok) {
				setAdmins((prev) => prev.filter((admin) => admin.admin_id !== adminId));
			} else {
				alert(data.error || 'Failed to revoke admin.');
			}
		} catch {
			alert('Server error.');
		}
	};

	return (
		<div className={styles.container}>
			<h1>Admin Management</h1>

			<div className={styles.formRow}>
				<input
					type="email"
					placeholder="Enter admin email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className={styles.input}
				/>
				<button
					className={styles.addButton}
					onClick={handleAddAdmin}
					disabled={loading}
				>
					{loading ? 'Adding...' : 'Add Admin'}
				</button>
			</div>

			{error && <p className={styles.error}>{error}</p>}

			<table className={styles.table}>
				<thead>
					<tr>
						<th>Profile</th>
						<th>Name</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{admins.map((admin) => (
						<tr key={admin.admin_id}>
							<td>
								<img
									src={
										admin.profile_picture
											? `/api/send_image/${admin.profile_picture}`
											: '/default-avatar.png'
									}
									alt="Profile"
									className={styles.avatar}
								/>
							</td>
							<td>{admin.first_name} {admin.last_name}</td>
							<td>
								<button
									className={styles.revokeButton}
									onClick={() => handleRevokeAdmin(admin.admin_id)}
								>
									Revoke
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};


const handleAuthResponse = async (response, req) => {
	try {
		const data = await response.json();

		if (data.role !== 'admin') {
			return {
				redirect: {
					destination: '/member_dashboard',
					permanent: false,
				},
			};
		} else {
			const adminRes = await fetch(`${baseUrl}/api/view_admins`, {
				method: 'GET',
				headers: {
					cookie: req.headers.cookie || '',
				},
			});

			const adminData = await adminRes.json();

			if (adminRes.ok) {
				return {
					props: {
						admins: adminData.admins || [],
						error: null,
					},
				};
			} else {
				return {
					props: {
						error: adminData.error || 'Failed to fetch admins.',
						admins: [],
					},
				};
			}
		}
	} catch (error) {
		return {
			props: {
				error: 'Failed to fetch admins. Please try again later.',
				admins: [],
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

		return response.ok;
	} catch {
		return false;
	}
};

const logoutAndRedirect = () => ({
	redirect: {
		destination: '/login',
		permanent: false,
	},
});

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
	} catch {
		return logoutAndRedirect();
	}
}


export default ManageAdmins;
