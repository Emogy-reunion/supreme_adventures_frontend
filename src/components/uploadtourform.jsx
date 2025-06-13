import React, { useState } from 'react';
import styles from '../styles/UploadForm.module.css';
import Loading from '../components/loading';
import { useRouter } from 'next/router';


const TourForm = () => {
	const router = useRouter();
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
        const [tourFiles, setTourFiles] = useState([]);

	const handleTourChange = (e) => {
                const { name, value } = e.target;
                setTourData((prev) => ({ ...prev, [name]: value }));
        };

	const handleFileChange = (e) => {
		const files = Array.from(e.target.files);

		files.forEach((file) => {
			const reader = new FileReader();
			reader.onloadend = () => {
				setTourFiles((prev) => [...prev, { file, preview: reader.result }]);
			};
			reader.readAsDataURL(file);
		});
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

		tourFiles.forEach((fileObj) => {
  			formData.append('files', fileObj.file);
		});

		setLoading(true);
		const start = Date.now()
		try {
			const response = await fetch('/api/upload_tour', {
				method: 'POST',
				body: formData,
				credentials: 'include',
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
				router.push('/admin_dashboard');
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


	const removeFile = (indexToRemove) => {
		setTourFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
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
                                                        required
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
                                                        required
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
                                                        required
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
                                                        value="upcoming"
                                                        disabled
                                                        className={styles.selectStyles}
                                                >
                                                        <option value="upcoming">Upcoming</option>
                                                </select>
						{formErrors.status && (
                                                        <p className={styles['error-message']}>{formErrors.status}</p>
                                                )}
                                        </div>

                                        <div className={styles['form-group']}>
                                                <label>Files</label>
                                                <input type="file" multiple onChange={handleFileChange} required />
                                        </div>
					
					<div className={styles["preview-container"]}>
						{tourFiles.map((item, index) => (
    							<div className={styles["preview-card"]} key={index}>
      								<button className={styles["remove-button"]} onClick={() => removeFile(index)}>×</button>
      								<img src={item.preview} alt={`Preview ${index}`} className={styles["preview-img"]} />
    							</div>
  						))}
					</div>

                                        <div className={styles['button-container']}>
                                                <button type="submit" className={styles.btn}>Upload tour</button>
                                        </div>
                                </form>
		</>
	);
};


export default TourForm;
