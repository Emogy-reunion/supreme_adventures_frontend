import { React, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Loading from '../../components/loading';
import 'swiper/css/pagination';
import Image from 'next/image';
import { FaWhatsapp } from 'react-icons/fa';
import MemberNavBar from '../components/membernavbar';

import styles from '../../styles/TourDetails.module.css';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const MemberTourDetails = ({ tour, error }) => {
	if (error) {
		return <p className={styles.error}>{error}</p>;
	}

	const [showBookingForm, setShowBookingForm] = useState(false);
	const [mpesaNumber, setMpesaNumber] = useState('');
	const [globalError, setGlobalError] = useState(null);
	const [successMessage, setSuccessMessage] = useState(null);
	const [formErrors, setFormErrors] = useState({});
	const [loading, setLoading] = useState(false);


	const includedItems = tour.included?.split('\n').filter(Boolean);
	const excludedItems = tour.excluded?.split('\n').filter(Boolean);


	return (
		<>
		<MemberNavbar />
		<div className={styles.container}>
			{loading && (
				<div className={styles.loadingOverlay}>
					<Loading />
				</div>
			)}
			<h1 className={styles.title}>{tour.name}</h1>

			 {tour.poster && (
                                <div className={styles.posterWrapper}>
                                        <Image
                                                src={`${baseUrl}/api/send_image/${tour.poster}`}
                                                alt="Tour Poster"
                                                width={800}
                                                height={1131}
                                                className={styles.posterImage}
                                        />
                                </div>
                        )}

			<div className={styles.infoSection}>
				<div className={styles.column}>
					<p><strong>Start:</strong> {tour.start_location}</p>
					<p><strong>Destination:</strong> {tour.destination}</p>
					<p><strong>Duration:</strong> {tour.days} Days / {tour.nights} Nights</p>
					<p><strong>Dates:</strong> {tour.start_date} → {tour.end_date}</p>
					<p><strong>Status:</strong> {tour.status}</p>
				</div>

				<div className={styles.column}>
					<p><strong>Price:</strong> <span className={styles.price}>Ksh {tour.final_price}</span>
						{tour.discount > 0 && (
							<span className={styles.discount}> ({tour.discount}% OFF)</span>
						)}
					</p>
					{tour.discount > 0 && (
						<p><strong>Original Price:</strong> Ksh {tour.original_price}</p>
					)}
				</div>
			</div>

			<div className={styles.description}>
				<h3>Description</h3>
				<p>{tour.description}</p>
			</div>

			<div className={styles.lists}>
				<div className={styles.listBlock}>
					<h3>Included</h3>
					<ul>
						{includedItems?.map((item, idx) => (
							<li key={idx}>{item}</li>
						))}
					</ul>
				</div>

				<div className={styles.listBlock}>
					<h3>Excluded</h3>
					<ul>
						{excludedItems?.map((item, idx) => (
							<li key={idx}>{item}</li>
						))}
					</ul>
				</div>
			</div>

			<div className={styles.bookingSection}>
				<button
					className={styles.whatsappButton}
					onClick={() => {
						const message = encodeURIComponent(`Hello, I'm interested in booking the tour: ${tour.name}`);
						window.open(`https://wa.me/254759080100?text=${message}`, '_blank');
					}}
				>
					<FaWhatsapp className={styles.whatsappIcon} />
					Book via WhatsApp
				</button>
			</div>
		</div>
		</>
	);
};


const handleAuthResponse = async (response, req, id) => {
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
			const tourResponse = await fetch(`${baseUrl}/api/tour_details/${id}`, {
				method: 'GET',
				headers: {
					cookie: req.headers.cookie || '',
				},
			});

			const tourData = await tourResponse.json();

			if (tourResponse.ok) {
				return {
					props: {
						tour: tourData.tour_details || {},
						error: null,
					},
				};
			} else {
				return {
					props: {
						error: tourData.error || 'Failed to fetch tours.',
						tours: {},
					},
				};
			}
		}
	} catch (error) {
		return {
			props: {
				error: 'Failed to fetch tours. Please try again later.',
				tours: {},
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
	const { id } = context.params;

	try {
		const response = await fetch(`${baseUrl}/api/is_logged_in`, {
			method: 'GET',
			headers: {
				cookie: req.headers.cookie || '',
			},
		});

		if (response.ok) {
			return await handleAuthResponse(response, req, id);
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
					return await handleAuthResponse(retryResponse, req, id);
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


export default MemberTourDetails;
