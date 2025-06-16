'use client';

import { useState } from 'react';
import { FaTag, FaCheckCircle, FaTshirt } from 'react-icons/fa';
import { FiMoreVertical } from 'react-icons/fi';
import { useRouter } from 'next/router';
import styles from '../styles/Productspage.module.css';
import AdminNavBar from '../components/adminNavbar';
import Link from 'next/link';
import ProductUpdateForm from '../components/productupdateform'


const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

const ProductsPage = ({productsData, pagination, error}) => {
	const [menuOpen, setMenuOpen] = useState(null);
	const [products, setProducts] = useState(productsData);
	const [isEditing, setIsEditing] = useState(false);
	const [productData, setProductData] = useState(null);
	const router = useRouter();

	const handleMenuToggle = (productId) => {
		setMenuOpen(menuOpen === productId ? null : productId);
	};


	const handlePageChange = (page) => {
		if (page) {
			router.push(`/admin-merchandise?page=${page}`);
		}
	};

	const handleDelete = async (productId) => {
		if (!confirm("Are you sure you want to delete this product?")) return;

		try {
			const response = await fetch(`/api/delete_product/${productId}`, {
				method: 'DELETE',
				credentials: 'include'
			});

			if (!response.ok) {
				const data = await response.json();
				alert(data.error || "Failed to delete the product.");
			} else {
				setProducts((prevProducts) => prevProducts.filter(product => product.product_id !== productId));
				alert("Product deleted successfully");
			}
		} catch (error) {
			alert('An unexpected error occurred. Please try again!');
		}
	};

	const handleUpdate = (product) => {
		setProductData(product);
		setIsEditing(true);
	};


	return (
		<>
		{!isEditing && (
			<>
			<AdminNavBar />
    			<section className={styles["page-container"]}>
      				<h1 className={styles.title}>Available Products</h1>
				
				<div className={styles['content-wrapper']}>
					<div className={styles.grid}>
    						{products.map((product) => (
      							<div key={product.product_id} className={styles.card}>
        							<button
          								className={styles["menu-button"]}
          								onClick={() => handleMenuToggle(product.product_id)}
          								aria-label="More options"
        							>
          								<FiMoreVertical size={20} />
        							</button>

        							{menuOpen === product.product_id && (
          								<div className={styles["menu-dropdown"]}>
            									<button type="button" onClick={() => handleUpdate(product)}>Update</button>
            									<button
              										type="button"
              										onClick={() => handleDelete(product.product_id)}
              										className={styles.delete}
            									>
              										Delete
            									</button>
          								</div>
								)}

        							<img
          								src={product.image || '/placeholder.jpg'}
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
          								href={`/admin-product-details/${product.product_id}`}
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
		)}

		{isEditing && (
			<ProductUpdateForm 
				product={productData}
				setProducts={setProducts}
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
						productsData: productData.products,
						pagination: productData.pagination,
						error: null,
					},
				};
			} else {
				return {
					props: {
						error: productData.error || 'Failed to fetch products.',
						productsData: [],
						pagination: null,
					},
				};
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



export default ProductsPage;
