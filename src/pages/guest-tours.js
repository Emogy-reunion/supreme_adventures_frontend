'use client';

import { useState } from 'react';
import { FaMapMarkerAlt, FaCalendarAlt, FaSun, FaMoon } from 'react-icons/fa';
import styles from '../styles/Tourspage.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import NavBar from '../components/navbar';
import Footer from '../components/footer';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const GuestToursPage = ({ toursData, pagination, error }) => {
	const [tours, setTours] = useState(toursData);
	const router = useRouter();

  	const handlePageChange = (page) => {
    		if (page) {
			router.push(`/tours?page=${page}`);
		}
	};

	return (
		<>
		<NavBar />
		<section className={styles["page-container"]}>
      			<h1 className={styles.title}>Upcoming Trips</h1>

			{error && (
    				<div className={styles["error-message"]}>{error}</div>
			)}

			{!error && tours.length === 0 && (
				<div className={styles["empty-message"]}>
					No upcoming trips at the moment. Please check back later.
				</div>
  			)}

      			<div className={styles['content-wrapper']}>
        		<div className={styles.grid}>
          			{tours.map((tour) => (
            				<div key={tour.tour_id} className={styles.card}>
              					<img
                					src={tour.image ? `/api/send_image/${tour.image}` : '/placeholder.jpg'}
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
                					<div className={styles.price}>ksh {tour.final_price}</div>

                						{tour.discount > 0 && (
                  							<span className={styles.discount}>{tour.discount}% OFF</span>
                						)}
        					</div>

              					<Link href={`/guest-tour-details/${tour.tour_id}`} className={styles["details-link"]}>
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
		<Footer />
		</>
	);
};

export async function getServerSideProps(context) {
	const { query } = context;
  	const page = query.page || 1;

  	try {
    		const response = await fetch(`${baseUrl}/api/tours?page=${page}`);
    		const data = await response.json();

    		if (response.ok) {
      			return {
        			props: {
          				toursData: data.tours,
          				pagination: data.pagination,
          				error: null,
        			},
      			};
    		} else {
			if (response.status === 404) {
				// No tours found, but not a real error for frontend
        			return {
            				props: {
                				error: null,
                				toursData: [],
                				pagination: null,
            				},
        			};
			} else {
        			return {
            				props: {
               	 				error: data.error || 'Failed to fetch tours.',
                				toursData: [],
                				pagination: null,
            				},
        			};
    			}
		}
	} catch (error) {
    		return {
      			props: {
        			error: 'An unexpected error occurred.',
        			toursData: [],
        			pagination: null,
      			},
    		};
  	}
}

export default GuestToursPage;
