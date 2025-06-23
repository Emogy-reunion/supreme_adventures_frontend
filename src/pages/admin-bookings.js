'use client';

import AdminNavBar from '../components/adminNavbar';
import styles from '../styles/AdminBookingsTable.module.css';


const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const AdminBookingsTable = ({ booking_details, error }) => {
	if (error) {
		return(
			<AdminNavBar />
			<p className={styles.error}>{error}</p>;
		);
	}

	if (!booking_details || booking_details.length === 0) {
		return(
			<AdminNavBar />
			<p className={styles.message}>No bookings available.</p>;
		);
	}

	return (
		<>
		<AdminNavBar />
		<div className={styles.tableContainer}>
			<table className={styles.table}>
				<thead>
					<tr>
						<th>User</th>
						<th>Tour</th>
						<th>Reference Code</th>
						<th>Transaction ID</th>
						<th>Start Date</th>
						<th>End Date</th>
						<th>Start Location</th>
						<th>Destination</th>
						<th>Phone</th>
						<th>Amount</th>
						<th>Payment</th>
						<th>Status</th>
						<th>Booked On</th>
					</tr>
				</thead>
				<tbody>
					{booking_details.map((booking, index) => (
						<tr key={index}>
							<td>{booking.user_name}</td>
							<td>{booking.tour_name}</td>
							<td>{booking.reference_code}</td>
							<td>{booking.transaction_id || 'N/A'}</td>
							<td>{booking.start_date}</td>
							<td>{booking.end_date}</td>
							<td>{booking.start_location}</td>
							<td>{booking.destination}</td>
							<td>{booking.phone_number}</td>
							<td>Ksh {booking.amount_paid}</td>
							<td>{booking.payment}</td>
							<td>{booking.status}</td>
							<td>{booking.booking_date}</td>
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
					destination: '/member_dashboard', // or '/login'
					permanent: false,
				},
			};
		} else {
			const bookingsResponse = await fetch(`${baseUrl}/api/admin_bookings`, {
				method: 'GET',
				headers: {
					cookie: req.headers.cookie || '',
				},
			});

			const bookingsData = await bookingsResponse.json();

			if (bookingsResponse.ok) {
				return {
					props: {
						booking_details: bookingsData.booking_details || [],
						error: null,
					},
				};
			} else {
				return {
					props: {
						booking_details: [],
						error: bookingsData.error || 'Failed to fetch bookings.',
					},
				};
			}
		}
	} catch (error) {
		return {
			props: {
				booking_details: [],
				error: 'Failed to fetch bookings. Please try again later.',
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
	const { req, query } = context;

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

export default AdminBookingsTable;

