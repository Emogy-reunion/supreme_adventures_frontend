'use client';

import { useState } from 'react';
import { FaMapMarkerAlt, FaCalendarAlt, FaSun, FaMoon, FaDollarSign } from 'react-icons/fa';
import { FiMoreVertical } from 'react-icons/fi';
import { useRouter } from 'next/router';
import styles from '../styles/Tourspage.module.css';
import AdminNavBar from '../components/adminNavbar';
import Link from 'next/link';
import TourUpdateForm from '../components/tourupdateform'


const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

const ToursPage = ({toursData, pagination, error}) => {
	const [menuOpen, setMenuOpen] = useState(null);
	const [tours, setTours] = useState(toursData);
	const [isEditing, setIsEditing] = useState(false);
	const [tourData, setTourData] = useState(null);
	const router = useRouter();

	const handleMenuToggle = (tourId) => {
		setMenuOpen(menuOpen === tourId ? null : tourId);
	};


	const handlePageChange = (page) => {
		if (page) {
			router.push(`/tours?page=${page}`);
		}
	};

	const handleDelete = async (tourId) => {
		if (!confirm("Are you sure you want to delete this tour?")) return;

		try {
			const response = await fetch(`/api/delete_tour/${tourId}`, {
				method: 'DELETE',
				credentials: 'include'
			});

			if (!response.ok) {
				const data = await response.json();
				alert(data.error || "Failed to delete the tour.");
			} else {
				setTours((prevTours) => prevTours.filter(tour => tour.tour_id !== tourId));
				alert("Tour deleted successfully");
			}
		} catch (error) {
			alert('An unexpected error occurred. Please try again!');
		}
	};

	const handleUpdate = (tour) => {
		setTourData(tour);
		setIsEditing(true);
	};


	return (
		<>
		{!isEditing && (
			<>
			<AdminNavBar />
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
                								<button type='button' onClick={() => handleUpdate(tour)}>Update</button>
                								<button type='button' onClick={() => handleDelete(tour.tour_id)} className={styles.delete}>Delete</button>
              								</div>
            							)}
            							<img
              								src={tour.poster ? `/api/send_image/${tour.poster}` : '/placeholder.jpg'}
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
              								{tour.start_date}
            							</div>

            							<div className={styles["card-info-row"]}>
              								<div className={styles["card-info"]}>
                								<FaSun />
                								{tour.days > 1 ? `${tour.days} days` : `${tour.days} day`}
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
                								ksh {tour.final_price}
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
    						<button
      							onClick={() => pagination?.previous && handlePageChange(pagination.previous)}
      							disabled={!pagination?.previous}
    						>
      							Previous
    						</button>

    						<span>
      							Page {pagination?.page || 1} of {pagination?.pages || 1}
    						</span>

    						<button
      							onClick={() => pagination?.next && handlePageChange(pagination.next)}
      							disabled={!pagination?.next}
    						>
      							Next
    						</button>
  					</div>
				</div>
    			</section>
		</>
		)}

		{isEditing && (
			<TourUpdateForm 
				tour={tourData}
				setTours={setTours}
          			closeForm={() => setIsEditing(false)}
			/>
		)}
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
						toursData: tourData.tours,
						pagination: tourData.pagination,
						error: null,
					},
				};
			} else {
				return {
					props: {
						error: tourData.error || 'Failed to fetch tours.',
						toursData: [],
						pagination: null,
					},
				};
			}
		}
	} catch (error) {
		return {
			props: {
				error: 'Failed to fetch tours. Please try again later.',
				toursData: [],
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
