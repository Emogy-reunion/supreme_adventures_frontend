import React, { useState } from 'react';
import styles from '../styles/UploadForm.module.css';


const UploadForm = () => {
	const [uploadType, setUploadType] = useState('tour');

	const [tourData, setTourData] = useState({
		name: '',
		start_location: '',
		destination: '',
		description: '',
		start_date: '',
		end_date: '',
		days: '',
		nights: '',
		original_price: '',
		discount_percent: '',
		status: 'upcoming',
		included: '',
		excluded: '',
	});
	const [tourFiles, setTourFiles] = useState([]);

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

	const handleTourChange = (e) => {
		const { name, value } = e.target;
		setTourData((prev) => ({ ...prev, [name]: value }));
	};

	const handleTourFiles = (e) => {
		setTourFiles([...e.target.files]);
	};

	const handleMerchChange = (e) => {
		const { name, value } = e.target;
		setMerchData((prev) => ({ ...prev, [name]: value }));
	};

	const handleMerchImages = (e) => {
		setMerchImages([...e.target.files]);
	};


	return (

		<section id={styles['upload-section']}>
		<div className={styles.uploadWrapper}>

			<div className={styles.logo}>
				<img src="/supreme.svg" alt="Supreme adventures Logo" />
			</div>

   			<h2>UPLOAD TOUR/MERCHANDISE</h2>

			<div className={styles['form-group']}>
				<label htmlFor="uploadType">Select Upload Type</label>
				<select
					id="uploadType"
					name="uploadType"
					value={uploadType}
					onChange={(e) => setUploadType(e.target.value)}
					className={styles.selectStyles}
				>
					<option value="tour">Tour</option>
					<option value="merch">Merchandise</option>
				</select>
			</div>
			{uploadType === 'tour' && (
				<form className={styles.form}>
					{[
						{ label: 'Name', name: 'name' },
						{ label: 'Start Location', name: 'start_location' },
						{ label: 'Destination', name: 'destination' },
						{ label: 'Start Date', name: 'start_date', type: 'datetime-local' },
						{ label: 'End Date', name: 'end_date', type: 'datetime-local' },
						{ label: 'Days', name: 'days', type: 'number' },
						{ label: 'Nights', name: 'nights', type: 'number' },
						{ label: 'Original Price', name: 'original_price', type: 'number' },
						{ label: 'Discount (%)', name: 'discount_percent', type: 'number' },
					].map((field) => (
						<div className={styles['form-group']} key={field.name}>
							<label>{field.label}</label>
							<input
								type={field.type || 'text'}
								name={field.name}
								value={tourData[field.name]}
								onChange={handleTourChange}
								required
							/>
						</div>
					))}

					<div className={styles['form-group']}>
						<label>Description</label>
						<textarea
							name="description"
							value={tourData.description}
							onChange={handleTourChange}
							required
						/>
					</div>

					<div className={styles['form-group']}>
						<label>Includes</label>
						<textarea
							name="included"
							value={tourData.included}
							onChange={handleTourChange}
							required
						/>
					</div>

					<div className={styles['form-group']}>
						<label>Excludes</label>
						<textarea
							name="excluded"
							value={tourData.excluded}
							onChange={handleTourChange}
							required
						/>
					</div>

					<div className={styles['form-group']}>
  						<label htmlFor="status">Status</label>
  						<select
    							id="status"
    							name="status"
    							value="upcoming"
    							disabled
    							className={styles.selectStyles}
  						>
    							<option value="upcoming">Upcoming</option>
  						</select>
					</div>

					
					<div className={styles['form-group']}>
						<label>Files</label>
						<input type="file" multiple onChange={handleTourFiles} required />
					</div>

					<div className={styles['button-container']}>
						<button type="submit" className={styles.btn}>Upload tour</button>
					</div>
				</form>
			)}

			{uploadType === 'merch' && (
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
						<input type="file" multiple onChange={handleMerchImages} required />
					</div>

					<div className={styles['button-container']}>
						<button type="submit" className={styles.btn}>Upload Merchandise</button>
					</div>
				</form>
			)}
		</div>
		</section>
	);
};

export default UploadForm;
