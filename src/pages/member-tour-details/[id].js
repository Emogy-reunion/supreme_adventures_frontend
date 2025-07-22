import { React, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Loading from '../components/loading';
import 'swiper/css/pagination';
import Image from 'next/image';

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

	const handleSubmit = async (event) => {
		event.preventDefault();
		setGlobalError(null);
		setFormErrors({});
		setSuccessMessage(null);

		const formData = new FormData();
		formData.append('phone_number', mpesaNumber);
		formData.append('tour_id', tour.id);
		const formJson = Object.fromEntries(formData.entries());

		setLoading(true);
		const start = Date.now();
		try {
			const response = await fetch('/api/book', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include',
				body: JSON.stringify(formJson),
			});

			data = await response.json();

			if (!response.ok) {
				if (data.errors) {
					const formattedErrors = Object.keys(data.errors).reduce((acc, key) => {
						acc[key] = data.errors[key].join(', ');
						return acc;
					}, {});

					setFormErrors(formattedErrors);
					setTimeout(() => {
						setFormErrors({});
					}, 5000);
				} else if (data.error) {
					setGlobalError(data.error);
					setTimeout(() => {
						setGlobalError(null);
					}, 5000);
				} else {
					console.error('Unexpected error format:', data);
					setGlobalError('An unexpected error occurred. Please try again.');
					setTimeout(() => {
                                                setGlobalError(null);
                                        }, 5000);
				}
			} else {
				setSuccessMessage(data.success);
				setTimeout(() => {
					setSuccessMessage(null);
				}, 4000);
			}
		} catch(error) {
			alert('Network error. Please try again.');
		} finally {
			const end = Date.now();
			const elapsed = end - start;
			const minLoadingTime = 800; // milliseconds

			setTimeout(() => {
				setLoading(false);
			}, Math.max(minLoadingTime - elapsed, 0));
		}
	};

	return (
		<div className={styles.container}>
			{loading && (
				<div className={styles.loadingOverlay}>
					<Loading />
				</div>
			)}
			<h1 className={styles.title}>{tour.name}</h1>

			<Swiper
				modules={[Navigation, Pagination]}
				spaceBetween={20}
				slidesPerView={1}
				navigation
				pagination={{ clickable: true }}
				className={styles.swiperContainer}
			>
				{tour.images?.map((img, index) => (
					<SwiperSlide key={index}>
						<div className={styles.slide}>
							<Image
								src={`${baseUrl}/api/send_image/${img}`}
								alt={`Tour Image ${index + 1}`}
								width={1000}
								height={500}
								className={styles.image}
							/>
						</div>
					</SwiperSlide>
				))}
			</Swiper>

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
					className={styles.bookNowBtn}
					onClick={() => setShowBookingForm(!showBookingForm)}
				>
					{showBookingForm ? 'Cancel' : 'Book Now'}
				</button>

				{showBookingForm && (
					<form className={styles.bookingForm} onSubmit={handleSubmit}>
						{(globalError || successMessage) && (
							<div className={globalError ? styles['error'] : styles['success-message']}>
								<p>{globalError || successMessage}</p>
							</div>
						)}
						<div className={styles["form-group"]}>
							<label htmlFor="phone_number">Enter M-Pesa Number:</label>
							<input
								type="text"
								id="phone_number"
								name='phone_number'
								value={mpesaNumber}
								onChange={(e) => setMpesaNumber(e.target.value)}
								className={styles.input}
								pattern="^2547[0-9]{8}$"
    								placeholder="e.g. 254712345678"
								required
							/>
						</div>
						{formErrors.phone_number && (
							<p className={styles['error-message']}>{formErrors.phone_number}</p>
						)}
						<button type="submit" className={styles.submitBtn}>
							Submit Payment
						</button>
					</form>
				)}
			</div>
		</div>
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
