'use client';

import { useState } from 'react';
import { FaMapMarkerAlt, FaCalendarAlt, FaSun, FaMoon, FaDollarSign } from 'react-icons/fa';
import { FiMoreVertical } from 'react-icons/fi';
import { useRouter } from 'next/router';
import styles from '../styles/Tourspage.module.css';
import AdminNavBar from '../components/adminNavbar';
import Link from 'next/link';



const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

const ToursPage = ({tours, pagination, error}) => {
	const [menuOpen, setMenuOpen] = useState(null);
	const router = useRouter();

	const handleMenuToggle = (tourId) => {
		setMenuOpen(menuOpen === tourId ? null : tourId);
	};


	const handlePageChange = (page) => {
		if (page) {
			router.push(`/tours?page=${page}`);
		}
	};

	return (
		<>	<AdminNavBar />
    			<section className={styles["page-container"]}>
      				<h1 className={styles.title}>Available Tours</h1>

				<div className={styles['content-wrapper']}>
      					<div className={styles.grid}>
        					{tours.map((tour) => (
          						<div key={tour.tour_id} className={styles.card}>
            							<button className={styles["menu-button"]} onClick={() => handleMenuToggle(tour.tour_id)} aria-label="More options">
              								<FiMoreVertical size={20} />
            							</button>
            							{menuOpen === tour.tour_id && (
              								<div className={styles["menu-dropdown"]}>
                								<button>Update</button>
                								<button className={styles.delete}>Delete</button>
              								</div>
            							)}
            							<img
              								src={tour.image || '/placeholder.jpg'}
              								alt={tour.name}
              								className={styles["card-image"]}
            							/>

            							<h2 className={styles["card-title"]}>{tour.name}</h2>

            							<div className={styles["card-info"]}>
              								<FaMapMarkerAlt />
              								{tour.destination}
            							</div>

            							<div className={styles["card-info"]}>
              								<FaCalendarAlt />
              								{new Date(tour.start_date).toLocaleDateString()}
            							</div>

            							<div className={styles["card-info-row"]}>
              								<div className={styles["card-info"]}>
                								<FaSun />
                								{tour.days} days
              								</div>
              							
									{tour.nights > 0 && (
										<div className={styles["card-info"]}>
                									<FaMoon />
                									{tour.nights} nights
              									</div>
									)}
            							
								</div>

            							<div className={styles["price-discount"]}>
              								<div className={styles.price}>
                								ksh {tour.price}
              								</div>
              							
									{tour.discount > 0 && (
                								<span className={styles.discount}>{tour.discount}% OFF</span>
              								)}
            							</div>
								
								<Link href={`/tour-details/${tour.tour_id}`} className={styles["details-link"]}>
									View Details
								</Link>
          						</div>
						))}
					</div>
				</div>

				<div className={styles["page-footer"]}>
      					<div className={styles.pagination}>
        					<button onClick={() => handlePageChange(pagination.previous)} disabled={!pagination.previous}>
          						Previous
        					</button>
        					<span>
          						Page {pagination.page} of {pagination.pages}
        					</span>

        					<button onClick={() => handlePageChange(pagination.next)} disabled={!pagination.next}>
          						Next
        					</button>
      					</div>
				</div>
    			</section>
		</>
	);
};




const handleAuthResponse = async (response, req, page) => {
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
			const tourResponse = await fetch(`${baseUrl}/api/tours?page=${page}`, {
				method: 'GET',
				headers: {
					cookie: req.headers.cookie || '',
				},
			});

			const tourData = await tourResponse.json();

			if (tourResponse.ok) {
				return {
					props: {
						tours: tourData.tours,
						pagination: tourData.pagination,
						error: null,
					},
				};
			} else {
				return {
					props: {
						error: tourData.error || 'Failed to fetch tours.',
						tours: [],
						pagination: null,
					},
				};
			}
		}
	} catch (error) {
		return {
			props: {
				error: 'Failed to fetch tours. Please try again later.',
				tours: [],
				pagination: null,
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
	const page = query.page || 1;

	try {
		const response = await fetch(`${baseUrl}/api/is_logged_in`, {
			method: 'GET',
			headers: {
				cookie: req.headers.cookie || '',
			},
		});

		if (response.ok) {
			return await handleAuthResponse(response, req, page);
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
					return await handleAuthResponse(retryResponse, req, page);
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



export default ToursPage;
