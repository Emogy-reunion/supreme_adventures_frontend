import React, { useState } from 'react';
import styles from '../styles/UploadForm.module.css';
import { useRouter } from 'next/router';
import Loading from '../components/loading';



const MerchandiseForm = () => {

	const [formErrors, setFormErrors] = useState({});
	const [globalError, setGlobalError] = useState(null);
	const [successMessage, setSuccessMessage] = useState(null);
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const [merchData, setMerchData] = useState({
                name: '',
                original_price: '',
                product_type: '',
                discount_rate: '',
                description: '',
                status: 'in-stock',
                size: '',
        });
        const [merchImages, setMerchImages] = useState([]);

	const handleMerchChange = (e) => {
                const { name, value } = e.target;
                setMerchData((prev) => ({ ...prev, [name]: value }));
        };

        const handleMerchFileChange = (e) => {
		const files = Array.from(e.target.files);

                files.forEach((file) => {
                        const reader = new FileReader();
                        reader.onloadend = () => {
				setMerchImages((prev) => [...prev, { file, preview: reader.result }]);
                        };
                        reader.readAsDataURL(file);
                });
        };

        const removeImage = (indexToRemove) => {
                setMerchImages((prev) => prev.filter((_, index) => index !== indexToRemove));
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

		merchImages.forEach((fileObj) => {
  			formData.append('images', fileObj.file);
		});


		const start = Date.now()
		setLoading(true);

		try {
			const response = await fetch('/api/upload_product', {
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

				setTimeout(() => {
					setSuccessMessage(null);
					router.push('/admin_dashboard');
				}, 3000);
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
		<>
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
                                                { label: 'Product Type', name: 'product_type' },
                                                { label: 'Discount Rate (%)', name: 'discount_rate', type: 'number' },
                                        ].map((field) => (
                                                <div className={styles['form-group']} key={field.name}>
                                                        <label>{field.label}</label>
                                                        <input
                                                                type={field.type || 'text'}
                                                                name={field.name}
                                                                value={merchData[field.name]}
                                                                onChange={handleMerchChange}
                                                                required
                                                        />
							{formErrors[field.name] && (
								<p className={styles['error-message']}>{field.name}</p>
							)}
                                                </div>
                                        ))}

                                        <div className={styles['form-group']}>
                                                <label>Description</label>
                                                <textarea
                                                        name="description"
                                                        value={merchData.description}
                                                        onChange={handleMerchChange}
                                                        required
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
                                                        value="in-stock"
                                                        disabled
                                                        className={styles.selectStyles}
                                                >
                                                        <option value="in-stock">In Stock</option>
                                                </select>
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
                                        </div>


                                        <div className={styles['form-group']}>
                                                <label>Images</label>
                                                <input type="file" multiple onChange={handleMerchFileChange} required />
                                        </div>
					
					<div className={styles["preview-container"]}>
                                                {merchImages.map((item, index) => (
                                                        <div className={styles["preview-card"]} key={index}>
                                                                <button className={styles["remove-button"]} onClick={() => removeImage(index)}>×</button>
                                                                <img src={item.preview} alt={`Preview ${index}`} className={styles["preview-img"]} />
                                                        </div>
                                                ))}
                                        </div>
					

                                        <div className={styles['button-container']}>
                                                <button type="submit" className={styles.btn}>Upload Merchandise</button>
                                        </div>
                                </form>
g	</>
	);
};

export default MerchandiseForm;
