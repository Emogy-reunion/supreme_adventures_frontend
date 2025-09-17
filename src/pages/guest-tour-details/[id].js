import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import { FaWhatsapp } from 'react-icons/fa';
import Link from 'next/link';
import styles from '../../styles/TourDetails.module.css';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const GuestTourDetails = ({ tour, error }) => {
	if (error) {
		return <p className={styles.error}>Failed to load tour: {error}</p>;
	}

	const includedItems = tour.included?.split('\n').filter(Boolean);
	const excludedItems = tour.excluded?.split('\n').filter(Boolean);

	return (
		<div className={styles.container}>
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

				<p className={styles.loginCTA}>
					Want faster booking next time?
					<Link href="/login" className={styles.loginLink}> Log in</Link> or
					<Link href="/register" className={styles.loginLink}> Join us</Link> to book automatically.
				</p>
			</div>
		</div>
	);
};

export async function getServerSideProps(context) {
	const { id } = context.params;
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

	try {
		const response = await fetch(`${baseUrl}/api/tour_details/${id}`);
		const data = await response.json();

		if (response.ok) {
			return {
				props: {
					tour: data.tour_details,
					error: null,
				},
			};
		} else {
			return {
				props: {
					tour: null,
					error: data.error || 'Failed to load tour details.',
				},
			};
		}
	} catch (error) {
		return {
			props: {
				tour: null,
				error: 'An unexpected error occurred.',
			},
		};
	}
}

export default GuestTourDetails;
