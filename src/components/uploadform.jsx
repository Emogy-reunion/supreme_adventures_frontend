import React, { useState } from 'react';

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
		status: '',
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
		<div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg">
			<div className="mb-6">
				<label className="block text-gray-700 font-medium mb-2" htmlFor="uploadType">
					Select Upload Type
				</label>
				<select
					id="uploadType"
					name="uploadType"
					value={uploadType}
					onChange={(e) => setUploadType(e.target.value)}
					className="w-full p-2 border rounded bg-gray-50 focus:outline-none focus:ring focus:border-blue-300"
				>
					<option value="tour">Tour</option>
					<option value="merch">Merchandise</option>
				</select>
			</div>

			{uploadType === 'tour' && (
				<form className="space-y-4">
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
						<div key={field.name}>
							<label className="block text-gray-700 mb-1">{field.label}</label>
							<input
								type={field.type || 'text'}
								name={field.name}
								value={tourData[field.name]}
								onChange={handleTourChange}
								required
								className="w-full p-2 border rounded bg-gray-50 focus:outline-none focus:ring focus:border-blue-300"
							/>
						</div>
					))}

					<div>
						<label className="block text-gray-700 mb-1">Description</label>
						<textarea
							name="description"
							value={tourData.description}
							onChange={handleTourChange}
							required
							className="w-full p-2 border rounded bg-gray-50 focus:outline-none focus:ring focus:border-blue-300"
						/>
					</div>

					<div>
						<label className="block text-gray-700 mb-1">Includes</label>
						<textarea
							name="included"
							value={tourData.included}
							onChange={handleTourChange}
							required
							className="w-full p-2 border rounded bg-gray-50 focus:outline-none focus:ring focus:border-blue-300"
						/>
					</div>

					<div>
						<label className="block text-gray-700 mb-1">Excludes</label>
						<textarea
							name="excluded"
							value={tourData.excluded}
							onChange={handleTourChange}
							required
							className="w-full p-2 border rounded bg-gray-50 focus:outline-none focus:ring focus:border-blue-300"
						/>
					</div>

					<div>
						<label className="block text-gray-700 mb-1">Files</label>
						<input
							type="file"
							multiple
							onChange={handleTourFiles}
							required
							className="w-full p-2"
						/>
					</div>
				</form>
			)}

			{uploadType === 'merch' && (
				<form className="space-y-4">
					{[
						{ label: 'Product Name', name: 'name' },
						{ label: 'Original Price', name: 'original_price', type: 'number' },
						{ label: 'Product Type', name: 'product_type' },
						{ label: 'Discount Rate (%)', name: 'discount_rate', type: 'number' },
						{ label: 'Status', name: 'status' },
						{ label: 'Size', name: 'size' },
					].map((field) => (
						<div key={field.name}>
							<label className="block text-gray-700 mb-1">{field.label}</label>
							<input
								type={field.type || 'text'}
								name={field.name}
								value={merchData[field.name]}
								onChange={handleMerchChange}
								required
								className="w-full p-2 border rounded bg-gray-50 focus:outline-none focus:ring focus:border-blue-300"
							/>
						</div>
					))}

					<div>
						<label className="block text-gray-700 mb-1">Description</label>
						<textarea
							name="description"
							value={merchData.description}
							onChange={handleMerchChange}
							required
							className="w-full p-2 border rounded bg-gray-50 focus:outline-none focus:ring focus:border-blue-300"
						/>
					</div>

					<div>
						<label className="block text-gray-700 mb-1">Images</label>
						<input
							type="file"
							multiple
							onChange={handleMerchImages}
							required
							className="w-full p-2"
						/>
					</div>
				</form>
			)}
		</div>
	);
};

export default UploadForm;

