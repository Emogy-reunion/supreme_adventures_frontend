import React, { useState, useEffect } from 'react';
import styles from '../styles/UploadForm.module.css';
import Loading from '../components/loading';
import withAdmin from '../hoc/withAdmin';

const ProductUpdateForm = ({product, closeForm, setProducts}) => {

	const [formErrors, setFormErrors] = useState({});
	const [globalError, setGlobalError] = useState(null);
	const [successMessage, setSuccessMessage] = useState(null);
	const [loading, setLoading] = useState(false);
	const [merchData, setMerchData] = useState({
                name: '',
                original_price: '',
                product_type: '',
                discount_rate: '',
                description: '',
                status: 'in-stock',
                size: '',
        });

	useEffect(() => {
		if (product) {
			setMerchData({
				name: product.name || '',
      				original_price: product.original_price || '',
      				product_type: product.product_type || '',
      				discount_rate: product.discount_rate || '',
      				description: product.description || '',
      				status: product.status || 'in-stock',
      				size: product.size || '',
    			});
  		}
	}, [product]);

	const handleMerchChange = (e) => {
                const { name, value } = e.target;
                setMerchData((prev) => ({ ...prev, [name]: value }));
        };

	const handleSubmit = async (event) => {
		event.preventDefault();

		setFormErrors({});
		setGlobalError(null);
		setSuccessMessage(null);

		const formData = new FormData();

		Object.entries(merchData).forEach(([key, value]) => {
			formData.append(key, value);
		});

		const start = Date.now()
		setLoading(true);

		try {
			const response = await fetch(`/api/update_merchandise/${product.product_id}`, {
				method: 'POST',
				include: 'credentials',
				body: formData
			});

			const data = await response.json();

			if (!response.ok) {
				if (data.errors) {
					const formattedErrors = Object.keys(data.errors).reduce((acc, key) => {
						acc['key'] = data.errors['key'].join(', ');
						return acc;
					}, {});
					setFormErrors(formattedErrors);
					setTimeout(() => {
						setFormErrors({});
					}, 8000);
				} else if (data.error) {
					setGlobalError(data.error);

					setTimeout(() => {
						setGlobalError(null);
					}, 8000);
				} else {
					setGlobalError(data.message);

                                        setTimeout(() => {
                                                setGlobalError(null);
                                        }, 8000);
				}
			} else {
				setSuccessMessage(data.success);

				const updatedProduct = data.updated_product;
				setProducts((prevProducts) =>
					prevProducts.map((merchItem) =>
						merchItem.product_id === updatedProduct.product_id ? updatedProduct : merchItem
					)
				);

				setTimeout(() => {
					setSuccessMessage(null);
					closeForm();
				}, 1500);
			}
		} catch (error) {
			alert('An unexpected error occured. Please try again!');
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
		<section id={styles['upload-section']}>
			<div className={styles.uploadWrapper}>
				<div className={styles.logo}>
					<img src="/supreme.svg" alt="Supreme adventures Logo" />
				</div>

	   			<h2>Update {product?.name || 'Merchandise'}</h2>

  				{loading && (
    					<div className={styles.loadingOverlay}>
      						<Loading />
    					</div>
  				)}
				
				<form className={styles.form} onSubmit={handleSubmit}>
					{(globalError || successMessage) && (
						<div className={globalError ? styles['error'] : styles['success-message']}>
							<p>{globalError || successMessage}</p>
						</div>
					)}
	
					{[
						{ label: 'Product Name', name: 'name' },
						{ label: 'Original Price', name: 'original_price', type: 'number' },
						{ label: 'Discount Rate (%)', name: 'discount_rate', type: 'number' },
					].map((field) => (
						<div className={styles['form-group']} key={field.name}>
							<label>{field.label}</label>
							<input
								type={field.type || 'text'}
								name={field.name}
								value={merchData[field.name]}
								onChange={handleMerchChange}
							/>
							{formErrors[field.name] && (
								<p className={styles['error-message']}>{field.name}</p>
							)}
						</div>
					))}

					<div className={styles['form-group']}>
						<label htmlFor="product_type">Product Type</label>
						<select
							id="product_type"
							name="product_type"
							value={merchData.product_type}
							onChange={handleMerchChange}
							className={styles.selectStyles}
						>
							<option value="">Select Product Type</option>
							<option value="t-shirt">T-shirt</option>
							<option value="hoodie">Hoodie</option>
							<option value="polo">Polo</option>
							<option value="sweat-shirt">Sweat-shirt</option>
							<option value="sweat-pant">Sweat-pant</option>
							<option value="branded set">Branded Set</option>
						</select>
						{formErrors.product_type && (
							<p className={styles['error-message']}>{formErrors.product_type}</p>
						)}
					</div>
	
					<div className={styles['form-group']}>
						<label htmlFor="size">Size</label>
						<select
							id="size"
							name="size"
							value={merchData.size}
							onChange={handleMerchChange}
							className={styles.selectStyles}
						>
							<option value="">Select Size</option>
							<option value="M">Medium (M)</option>
							<option value="L">Large (L)</option>
							<option value="XL">Extra Large (XL)</option>
							<option value="XXL">2XL</option>
							<option value="XXXL">3XL</option>
							<option value="XXXXL">4XL</option>
						</select>
						{formErrors.size && (
							<p className={styles['error-message']}>{formErrors.size}</p>
						)}
					</div>

					<div className={styles['form-group']}>
						<label>Description</label>
						<textarea
							name="description"
							value={merchData.description}
							onChange={handleMerchChange}
						/>
						{formErrors.description && (
							<p className={styles['error-message']}>{formErrors.description}</p>
						)}
					</div>

					<div className={styles['form-group']}>
						<label htmlFor="status">Status</label>
						<select
							id="status"
							name="status"
							value={merchData.status}
							onChange={handleMerchChange}
							className={styles.selectStyles}
						>
							<option value="in-stock">In Stock</option>
							<option value="out-of-stock">Out of Stock</option>
						</select>
					</div>
				
					<div className={styles['button-container']}>
                                                <button type="submit" className={styles.btn}>Save Changes</button>
						<button
    							type="button"
    							className={styles.btn}
    							onClick={closeForm}
    							style={{ marginLeft: '10px' }}
  						>
    							Close
  						</button>
					</div>
				</form>
			</div>
		</section>
	);
};


export default withAdmin(ProductUpdateForm)
