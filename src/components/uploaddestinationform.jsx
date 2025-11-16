import React, { useState } from 'react';
import styles from '../styles/UploadForm.module.css';
import { useRouter } from 'next/router';
import Loading from '../components/loading';
import { FaCloudUploadAlt } from 'react-icons/fa';



const DestinationForm = () => {

        const [formErrors, setFormErrors] = useState({});
        const [globalError, setGlobalError] = useState(null);
        const [successMessage, setSuccessMessage] = useState(null);
        const [loading, setLoading] = useState(false);
        const router = useRouter();

        const [destData, setDestData] = useState({
                name: '',
                country: '',
                destination_type: '',
                featured: '',
                short_description: '',
		long_description: '',
		main_activities: '',
        });
        const [destImages, setDestImages] = useState([]);

        const handleDestChange = (e) => {
                const { name, value } = e.target;
                setMerchData((prev) => ({ ...prev, [name]: value }));
        };

        const handleDestFileChange = (e) => {
                const files = Array.from(e.target.files);

                files.forEach((file) => {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                                setDestImages((prev) => [...prev, { file, preview: reader.result }]);
                        };
                        reader.readAsDataURL(file);
                });
        };

        const removeImage = (indexToRemove) => {
                setDestImages((prev) => prev.filter((_, index) => index !== indexToRemove));
        };

        const handleSubmit = async (event) => {
                event.preventDefault();

                setFormErrors({});
                setGlobalError(null);
                setSuccessMessage(null);

                const formData = new FormData();

                Object.entries(destData).forEach(([key, value]) => {
                        formData.append(key, value);
                });

                destImages.forEach((fileObj) => {
                        formData.append('images', fileObj.file);
                });


                const start = Date.now()
                setLoading(true);

                try {
                        const response = await fetch('/api/upload_destination', {
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
                                                { label: 'Destination Name', name: 'name' },
                                                { label: 'Country', name: 'country'},
                                        ].map((field) => (
                                                <div className={styles['form-group']} key={field.name}>
                                                        <label>{field.label}</label>
                                                        <input
                                                                type={field.type || 'text'}
                                                                name={field.name}
                                                                value={destData[field.name]}
                                                                onChange={handleDestChange}
                                                                required
                                                        />
                                                        {formErrors[field.name] && (
                                                                <p className={styles['error-message']}>{field.name}</p>
                                                        )}
                                                </div>
                                        ))}

                                        <div className={styles['form-group']}>
                                                <label htmlFor="destination_type">Destination Type</label>
                                                <select
                                                        id="destination_type"
                                                        name="destination_type"
                                                        value={destData.destination_type}
                                                        onChange={handleDestChange}
                                                        className={styles.selectStyles}
                                                >
                                                        <option value="">Select Destination Type</option>
                                                        <option value="local">Local Package</option>
                                                        <option value="international">International Package</option>
                                                        <option value="special">Special Package</option>
                                                </select>
                                                {formErrors.destination_type && (
                                                        <p className={styles['error-message']}>{formErrors.destination_type}</p>
                                                )}
                                        </div>


                                         <div className={styles['form-group']}>
                                                <label htmlFor="featured">Featured trip?</label>
                                                <select
                                                        id="featured"
                                                        name="featured"
                                                        value={destData.featured}
                                                        onChange={handleDestChange}
                                                        className={styles.selectStyles}
                                                >
                                                        <option value="0">No</option>
                                                        <option value="1">Yes</option>
                                                </select>
                                                {formErrors.featured && (
                                                        <p className={styles['error-message']}>{formErrors.featured}</p>
                                                )}
                                        </div>


                                        <div className={styles['form-group']}>
                                                <label>Short Description</label>
                                                <textarea
                                                        name="short_description"
                                                        value={destData.short_description}
                                                        onChange={handleDestChange}
                                                        required
                                                />
                                                {formErrors.short_description && (
                                                        <p className={styles['error-message']}>{formErrors.short_description}</p>
                                                )}
                                        </div>

					<div className={styles['form-group']}>
                                                <label>Long Description</label>
                                                <textarea
                                                        name="long_description"
                                                        value={destData.long_description}
                                                        onChange={handleDestChange}
                                                        required
                                                />
                                                {formErrors.long_description && (
                                                        <p className={styles['error-message']}>{formErrors.long_description}</p>
                                                )}
                                        </div>

					<div className={styles['form-group']}>
                                                <label>Main Activities</label>
                                                <textarea
                                                        name="main_activities"
                                                        value={destData.main_activities}
                                                        onChange={handleDestChange}
                                                        required
                                                />
                                                {formErrors.main_activities && (
                                                        <p className={styles['error-message']}>{formErrors.main_activities}</p>
                                                )}
                                        </div>

					
                                        <div className={styles['form-group']}>
                                                <label>Images</label>
                                                <input type="file" multiple id='images-upload' onChange={handleDestFileChange} required style={{ display: 'none' }}/>
                                                <label htmlFor="images-upload" className={styles['upload-container']}>
                                                        <FaCloudUploadAlt className={styles['upload-icon']} />
                                                        <p className={styles['upload-text']}>Click to upload photos</p>
                                                </label>
                                        </div>

                                        <div className={styles["preview-container"]}>
                                                {destImages.map((item, index) => (
                                                        <div className={styles["preview-card"]} key={index}>
                                                                <button className={styles["remove-button"]} onClick={() => removeImage(index)}>×</button>
                                                                <img src={item.preview} alt={`Preview ${index}`} className={styles["preview-img"]} />
                                                        </div>
                                                ))}
                                        </div>


                                        <div className={styles['button-container']}>
                                                <button type="submit" className={styles.btn}>Upload Destination</button>
                                        </div>
                                </form>
        </>
        );
};

export default DestinationForm;
