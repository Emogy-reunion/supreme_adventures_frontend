'use client';

import { useState } from 'react';
import { FaTag, FaCheckCircle, FaTshirt, FaPercent } from 'react-icons/fa';
import styles from '../styles/Productspage.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import NavBar from '../components/navbar';
import Footer from '../components/footer';


const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

const GuestProductsPage = ({productsData, pagination, error}) => {
	const [products, setProducts] = useState(productsData);
	const router = useRouter();

	const handlePageChange = (page) => {
		if (page) {
			router.push(`/guest-products?page=${page}`);
		}
	};

	return (
		<>	<NavBar />
			<section className={styles["page-container"]}>
				<h1 className={styles.title}>Available Products</h1>

				{error && (
    					<div className={styles["error-message"]}>{error}</div>
				)}

  				{!error && products.length === 0 && (
    					<div className={styles["empty-message"]}>
      						No availbale products at the moment. Please check back later.
    					</div>
  				)}

				<div className={styles['content-wrapper']}>
					<div className={styles.grid}>
						{products.map((product) => (
							<div key={product.product_id} className={styles.card}>
								<img
									src={product.image ? `${baseUrl}/api/send_image/${product.image}` : '/placeholder.jpg'}
									alt={product.name}
									className={styles["card-image"]}
								/>

								<h2 className={styles["card-title"]}>{product.name}</h2>

								<div className={styles["card-info"]}>
									<FaTshirt />
									{product.size}
								</div>

								<div className={styles["card-info"]}>
									<FaCheckCircle />
									{product.status}
								</div>

								<div className={styles["price-discount"]}>
									<div className={styles.price}>
										<FaTag style={{ marginRight: '4px' }} />
										Ksh {product.final_price}
									</div>

									{product.discount_rate > 0 && (
										<span className={styles.discount}>
											{product.discount_rate}% OFF
										</span>
									)}
								</div>

								<Link
									href={`/guest-product-details/${product.product_id}`}
									className={styles["details-link"]}
								>
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
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
	const page = context.query.page || 1;

	try {
		const res = await fetch(`${baseUrl}/api/merchandise?page=${page}`);
		const data = await res.json();

		if (!res.ok) {
			throw new Error(data.error || 'Failed to fetch products');
		}

		return {
			props: {
				productsData: data.products,
				pagination: data.pagination,
				error: null,
			}
		};
	} catch (err) {
		if (res.status === 404) {
                        return {
                                props: {
                                        error: null,
                                        productsData: [],
                                        pagination: null,
                                }
                        };
                } else {
                        return {
                                props: {
                                        error: data.error || 'Failed to fetch products.',
                                        productsData: [],
                                        pagination: null,
                                },
                        };
                }
	}
}


export default GuestProductsPage;
