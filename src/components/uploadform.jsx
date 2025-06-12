import React, { useState } from 'react';
import styles from '../styles/UploadForm.module.css'; // adjust path

const UploadForm = () => {
	const [uploadType, setUploadType] = useState('tour');

  	// Tour form state
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
    		status: '',
    		included: '',
    		excluded: '',
  	});
  	const [tourFiles, setTourFiles] = useState([]);

  	// Merch form state
  	const [merchData, setMerchData] = useState({
    		name: '',
    		original_price: '',
    		product_type: '',
    		discount_rate: '',
    		description: '',
    		status: '',
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
    		<div className={styles.uploadWrapper}>
      			<div className={styles['form-group']}>
        			<label htmlFor="uploadType">Select Upload Type</label>
        			<select
          				id="uploadType"
          				name="uploadType"
	          			value={uploadType}
        	  			onChange={(e) => setUploadType(e.target.value)}
          				className={styles.select}
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
        	    				{ label: 'Start Date', name: 'start_date', type: 'date' },
            					{ label: 'End Date', name: 'end_date', type: 'date' },
            					{ label: 'Days', name: 'days', type: 'number' },
            					{ label: 'Nights', name: 'nights', type: 'number' },
	            				{ label: 'Original Price', name: 'original_price', type: 'number' },
        	    				{ label: 'Discount (%)', name: 'discount_percent', type: 'number' },
            					{ label: 'Status', name: 'status' },
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
            					<label>Files</label>
            					<input type="file" multiple onChange={handleTourFiles} required />
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
            					{ label: 'Status', name: 'status' },
            					{ label: 'Size', name: 'size' },
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
        	    				<label>Images</label>
            					<input type="file" multiple onChange={handleMerchImages} required />
   		       			</div>
        			</form>
	      		)}
    		</div>
	);
};

export default UploadForm;

