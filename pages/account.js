import React, { useState, useEffect } from 'react';
import { useUser } from '../data/firebase';

const Account = () => {
	const { user, updateUser } = useUser();
	const [companyName, setCompanyName] = useState();
	const [address, setAddress] = useState();
	const [companyType, setCompanyType] = useState();
	
	const handleCompanyName = (e) => {
		setCompanyName(e.target.value);
	};

	const handleCompanyTypeChange = (e) => {
		setCompanyType(e.target.value);
	};

	const handleAddress = (e) => {
		setAddress(e.target.value);
	};

	const handleSave = async () => {
		console.log('todo - handleSave', companyName, companyType, address);
		if (!companyName || !companyType || companyType === '') {
			return;
		}

		const payload = {
			companyName,
			companyType,
			address
		};

		await updateUser(payload);
	};

	useEffect(() => {
		if (user && user.companyType) {
			setCompanyType(user.companyType);
		}
		if (user && user.companyName) {
			setCompanyName(user.companyName);
		}
		if (user && user.address) {
			setAddress(user.address);
		}
	}, [user]);

	console.log(companyType);

	return (
		<div>
			<h1 className="text-gray-700 text-xl font-medium h-16 flex items-center px-6 border-b">
				Account Settings
			</h1>
			
			<div className="w-1/2">
				<div className="p-6">
					<label htmlFor="name" className="block text-gray-600 text-sm">
						Name
					</label>
					<input
						type="text"
						name="name"
						value={user && user.displayName ? user.displayName : ''}
						className="text-gray-700 bg-gray-300 p-3 mt-3 focus:outline-none rounded cursor-not-allowed"
						disabled
					/>
				</div>

				<div className="px-6 pb-6">
					<label htmlFor="organization" className="block text-gray-600 text-sm">
						Organization
					</label>
					<input
						type="text"
						name="organization"
						defaultValue={companyName}
						placeholder="ACME Incorporated"
						className="text-gray-700 bg-gray-300 p-3 mt-3 focus:outline-none rounded"
						onChange={handleCompanyName}
					/>
				</div>

				<div className="px-6 pb-6">
					<label htmlFor="type" className="block text-gray-600 text-sm">
						We are a...
					</label>
					{companyType && (
						<select
							name="type"
							defaultValue={companyType}
							className="form-select text-gray-700 bg-gray-300 p-3 mt-3 focus:outline-none rounded"
							onChange={handleCompanyTypeChange}
						>
							<option value="supplier">Private Business</option>
							<option value="receiver">Food Bank</option>
						</select>
					)}
				</div>

				<div className="px-6 pb-6">
					<label htmlFor="organization" className="block text-gray-600 text-sm">
						Address
					</label>
					<input
						type="text"
						name="address"
						defaultValue={user && user.address}
						placeholder="Address"
						className="text-gray-700 bg-gray-300 p-3 mt-3 focus:outline-none rounded"
						onChange={handleAddress}
					/>
				</div>

				<button
					className="mx-6 bg-green-600 text-white hover:bg-green-700 p-3 rounded"
					onClick={handleSave}
				>
					Save Changes
				</button>
			</div>
		</div>
	);
};

export default Account;
