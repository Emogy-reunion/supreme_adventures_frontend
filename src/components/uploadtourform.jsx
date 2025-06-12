import React, { useState } from 'react';
import styles from '../styles/UploadForm.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import '../styles/Filepreviewslider.module.css';


const TourForm = () => {
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

	const removeFile = (indexToRemove) => {
		setTourFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
	};

	return (
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
                                                <input type="file" multiple onChange={handleFileChange} required />
						{tourFiles.length > 0 && (
							<Swiper
          							spaceBetween={10}
          							slidesPerView={3}
          							navigation
        						>
          							{tourFiles.map((item, index) => (
            								<SwiperSlide key={index}>
              									<div className="slide-wrapper">
                									<button className="remove-button" onClick={() => removeFile(index)}>×</button>
                									<img src={item.preview} alt={`Preview ${index}`} className="preview-img" />
              									</div>
            								</SwiperSlide>
          							))}
        						</Swiper>
      						)}
                                        </div>
					
					

                                        <div className={styles['button-container']}>
                                                <button type="submit" className={styles.btn}>Upload tour</button>
                                        </div>
                                </form>
	);
};


export default TourForm;
