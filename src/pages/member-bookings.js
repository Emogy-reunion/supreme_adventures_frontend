'use client';

import React from 'react';
import styles from '../styles/MemberBookings.module.css';
import MemberNavBar from '../components/membernavbar';
import { FaMoneyBillAlt, FaCalendarAlt, FaClipboardCheck } from 'react-icons/fa';


const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const MemberBookingsPage = ({ booking_details = [], error }) => {
	if (error) {
		return (
			<>
				<MemberNavBar />
				<div className={styles.container}>
					<h1 className={styles.title}>My Bookings</h1>
					<p className={styles.error}>{error}</p>
				</div>
				<Footer />
			</>
		);
	}

	return (
		<>
			<MemberNavBar />
			<section className={styles.container}>
				<h1 className={styles.title}>My Bookings</h1>
				<div className={styles.grid}>
					{booking_details.map((booking, index) => (
						<div className={styles.card} key={index}>
							<h2 className={styles.tourName}>{booking.tour_name}</h2>
							
							<div className={styles.infoRow}>
								<FaMoneyBillAlt className={styles.icon} />
								<span>Amount Paid: Ksh {booking.amount_paid}</span>
							</div>

							<div className={styles.infoRow}>
								<FaClipboardCheck className={styles.icon} />
								<span>Status: {booking.status}</span>
							</div>

							<div className={styles.infoRow}>
								<FaClipboardCheck className={styles.icon} />
								<span>Payment: {booking.payment}</span>
							</div>

							<div className={styles.infoRow}>
								<FaCalendarAlt className={styles.icon} />
								<span>Start Date: {booking.start_date}</span>
							</div>

							<div className={styles.infoRow}>
								<FaCalendarAlt className={styles.icon} />
								<span>Booking Date: {booking.booking_date}</span>
							</div>

							<div className={styles.bookedBy}>
								Booked By: {booking.user_name}
							</div>
						</div>
					))}
				</div>
			</section>
			<Footer />
		</>
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
			const bookingsResponse = await fetch(`${baseUrl}/api/member_bookings`, {
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


export default MemberBookingsPage;
