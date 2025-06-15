import React, { useState, useEffect } from 'react';
import styles from '../styles/UploadForm.module.css';
import Loading from '../components/loading';
import withAdmin from '../hoc/withAdmin';

const TourUpdateForm = ({tour, closeForm}) => {

	const [formErrors, setFormErrors] = useState({});
	const [globalError, setGlobalError] = useState(null);
	const [successMessage, setSuccessMessage] = useState(null);
	const [loading, setLoading] = useState(false);
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

	 useEffect(() => {
		 if (tour) {
			 setTourData({
				name: tour.name || '',
        			start_location: tour.start_location || '',
        			destination: tour.destination || '',
        			description: tour.description || '',
        			start_date: tour.start_date || '',
        			end_date: tour.end_date || '',
        			days: tour.days || '',
        			nights: tour.nights || '',
        			original_price: tour.original_price || '',
        			discount_percent: tour.discount_percent || '',
        			status: tour.status || 'upcoming',
        			included: tour.included || '',
        			excluded: tour.excluded || '',
      			});
    		}
	 }, [tour]);

	const handleTourChange = (e) => {
                const { name, value } = e.target;
                setTourData((prev) => ({ ...prev, [name]: value }));
        };

	const handleSubmit = async (event) => {
		event.preventDefault();

		setFormErrors({});
		setGlobalError(null);
		setSuccessMessage(null);

		const formData = new FormData();

		Object.entries(tourData).forEach(([key, value]) => {
			formData.append(key, value);
		});

		setLoading(true);
		const start = Date.now()
		try {
			const response = await fetch(`/api/update_tour/${tour.tour_id}`, {
				method: 'POST',
				credentials: 'include',
				body: formData,
			});


			const data = await response.json();

			if (!response.ok) {
				if (data.errors) {
					const formattedErrors = Object.keys(data.errors).reduce((acc, key) => {
						acc[key] = data.errors[key].join(', ');
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
					}, 5000);

				} else {
					setGlobalError(data.error);

					setTimeout(() => {
                                                setGlobalError(null);
                                        }, 5000);
				}
			} else {
				setSuccessMessage(data.success);
				setTimeout(() => {
					setSuccessMessage(null);
					closeForm();
				}, 1500);
			}
		} catch (error) {
			alert('A network error occured. Please try again!');
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

	   			<h2>Update {tour?.name || 'Tour'} Tour</h2>

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
        						/>
        						{formErrors[field.name] && (
          							<p className={styles['error-message']}>{formErrors[field.name]}</p>
        						)}
 	     					</div>
    					))}

					<div className={styles['form-group']}>
	      					<label>Description</label>
      						<textarea
        						name="description"
        						value={tourData.description}
        						onChange={handleTourChange}
	      					/>
      						{formErrors.description && (
        						<p className={styles['error-message']}>{formErrors.description}</p>
      						)}
	    				</div>

	    				<div className={styles['form-group']}>
      						<label>Includes</label>
      						<textarea
        						name="included"
        						value={tourData.included}
        						onChange={handleTourChange}
	      					/>
      						{formErrors.included && (
        						<p className={styles['error-message']}>{formErrors.included}</p>
      						)}
	    				</div>

	    				<div className={styles['form-group']}>
      						<label>Excludes</label>
      						<textarea
        						name="excluded"
        						value={tourData.excluded}
        						onChange={handleTourChange}
	      					/>
      						{formErrors.excluded && (
        						<p className={styles['error-message']}>{formErrors.excluded}</p>
      						)}
	    				</div>

	    				<div className={styles['form-group']}>
      						<label htmlFor="status">Status</label>
      						<select
        						id="status"
        						name="status"
        						value={tourData.status}
        						onChange={handleTourChange}
	        					className={styles.selectStyles}
      						>
        						<option value="upcoming">Upcoming</option>
        						<option value="ongoing">Ongoing</option>
        						<option value="completed">Completed</option>
      						</select>
	      					{formErrors.status && (
        						<p className={styles['error-message']}>{formErrors.status}</p>
      						)}
					</div>

					<div className={styles['button-container']}>
                                                <button type="submit" className={styles.btn}>Save Changes</button>
                                        </div>
				</form>
			</div>
		</section>
	);
};


export default withAdmin(TourUpdateForm);
