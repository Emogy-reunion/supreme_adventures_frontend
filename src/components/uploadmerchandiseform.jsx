import React, { useState } from 'react';
import styles from '../styles/UploadForm.module.css';



const MerchandiseForm = () => {


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
				setMerchImages:q((prev) => [...prev, { file, preview: reader.result }]);
                        };
                        reader.readAsDataURL(file);
                });
        };

        const removeImage = (indexToRemove) => {
                setMerchImages((prev) => prev.filter((_, index) => index !== indexToRemove));
        };


	return (
		<form className={styles.form}>
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
	);
};

export default MerchandiseForm;
