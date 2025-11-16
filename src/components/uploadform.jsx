import React, { useState } from 'react';
import TourForm from '../components/uploadtourform';
import MerchandiseForm from '../components/uploadmerchandiseform';
import DestinationForm from '../components/uploaddestinationform';
import styles from '../styles/UploadForm.module.css';


const UploadForm = () => {
	const [uploadType, setUploadType] = useState('tour');

	return (

		<section id={styles['upload-section']}>
		<div className={styles.uploadWrapper}>

			<div className={styles.logo}>
				<img src="/supreme.svg" alt="Supreme adventures Logo" />
			</div>

   			<h2>UPLOAD TOUR/MERCHANDISE/DESTINATION</h2>

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
					<option value="dest">Destination</option>
					<option value="merch">Merchandise</option>
				</select>
			</div>
			{uploadType === 'tour' && (
				<TourForm />
			)}

			{uploadType === 'merch' && (
				<MerchandiseForm />
			)}

			{uploadType === 'dest' && (
                                <DestinationForm />
                        )}
		</div>
		</section>
	);
};

export default UploadForm;
