import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "../../styles/MerchandiseDetails.module.css";
import Image from "next/image";
import { FaTshirt, FaTag, FaPercentage, FaBoxOpen, FaRulerCombined, FaAlignLeft } from "react-icons/fa";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const GuestProductDetails = ({ product, error }) => {
	if (error) {
		return <p className={styles.error}>Failed to load product: {error}</p>;
	}

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>{product.name}</h1>

			<Swiper
				modules={[Navigation, Pagination]}
				spaceBetween={20}
				slidesPerView={1}
				navigation
				pagination={{ clickable: true }}
				className={styles.swiperContainer}
			>
				{product.images.map((img, index) => (
					<SwiperSlide key={index}>
						<div className={styles.slide}>
							<Image
								src={`${baseUrl}/api/send_image/${img}`}
								alt={`Merch ${index + 1}`}
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
					<p><FaTshirt /> <strong>Type:</strong> {product.product_type}</p>
					<p><FaBoxOpen /> <strong>Status:</strong> {product.status}</p>
					<p><FaRulerCombined /> <strong>Size:</strong> {product.size}</p>
				</div>

				<div className={styles.column}>
					<p>
						<FaTag /> <strong>Price:</strong>
						<span className={styles.price}> Ksh {product.final_price}</span>
						{product.discount_rate > 0 && (
							<span className={styles.discount}>
								{product.discount_rate}% OFF
							</span>
						)}
					</p>
					{product.discount_rate > 0 && (
						<p><FaTag /> <strong>Original:</strong> Ksh {product.original_price}</p>
					)}
				</div>
			</div>

			<div className={styles.description}>
				<h3><FaAlignLeft style={{ marginRight: "8px" }} />Description</h3>
				<p>{product.description}</p>
			</div>
		</div>
	);
};

export async function getServerSideProps(context) {
	const { id } = context.params;

	try {
		const res = await fetch(`${baseUrl}/api/merchandise_details/${id}`);
		const productData = await res.json();

		if (res.ok) {
			return {
				props: {
					product: productData.product_details,
					error: null,
				},
			};
		} else {
			return {
				props: {
					error: productData.error || 'Failed to fetch product.',
					product: {},
				},
			};
		}
	} catch (error) {
		return {
			props: {
				error: 'Failed to fetch product. Please try again later.',
				product: {},
			},
		};
	}
}

export default GuestProductDetails;
