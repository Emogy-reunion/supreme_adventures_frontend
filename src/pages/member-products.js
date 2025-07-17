'use client';

import { useState } from 'react';
import { FaTag, FaCheckCircle, FaTshirt, FaPercent } from 'react-icons/fa';
import styles from '../styles/Productspage.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import MemberNavBar from '../components/membernavbar';


const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

const MemberProductsPage = ({productsData, pagination, error}) => {
	const [products, setProducts] = useState(productsData);
	const router = useRouter();

	const handlePageChange = (page) => {
		if (page) {
			router.push(`/member-products?page=${page}`);
		}
	};

	return (
		<>	<MemberNavBar />
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
									href={`/member-product-details/${product.product_id}`}
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
		</>
	);
};



const handleAuthResponse = async (response, req, page) => {
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
			const productResponse = await fetch(`${baseUrl}/api/merchandise?page=${page}`, {
				method: 'GET',
				headers: {
					cookie: req.headers.cookie || '',
				},
			});

			const productData = await productResponse.json();

			if (productResponse.ok) {
				return {
					props: {
						productsData: productData.products || [],
						pagination: productData.pagination || null,
						error: null,
					},
				};
			} else {
				if (productResponse.status === 404) {
                                        return {
                                                props: {
                                                        error: null,
                                                        productsData: [],
                                                        pagination: null,
                                                },
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
	} catch (error) {
		return {
			props: {
				error: 'Failed to fetch products. Please try again later.',
				productsData: [],
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



export default MemberProductsPage;
