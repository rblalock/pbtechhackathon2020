import React, { useState, useEffect } from 'react';
import { useUser } from '../data/firebase';

const Account = () => {
	const { user, updateUser } = useUser();
	const [companyName, setCompanyName] = useState();
	const [address, setAddress] = useState();
	const [companyType, setCompanyType] = useState();
	const [loading, setLoading] = useState(false);
	
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
		setLoading(true);
		
		if (!companyName || !companyType || companyType === '') {
			return;
		}

		const payload = {
			companyName,
			companyType,
			address
		};

		await updateUser(payload);

		setLoading(false);
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
						<div className="inline-block relative text-gray-700 bg-gray-300 p-3 mt-3 rounded">
							<select
								name="type"
								defaultValue={companyType}
								className="block appearance-none bg-gray-300 pr-8 focus:outline-none focus:shadow-outline"
								onChange={handleCompanyTypeChange}
							>
								<option value="supplier">Private Business</option>
								<option value="receiver">Food Bank</option>
							</select>
							<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
								<svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
							</div>
						</div>
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
						className="text-gray-700 bg-gray-300 w-1/2 p-3 mt-3 focus:outline-none rounded"
						onChange={handleAddress}
					/>
				</div>

				<button
					className="mx-6 bg-green-600 text-white hover:bg-green-700 p-3 w-40 rounded"
					onClick={handleSave}
				>
					{loading ? (
						<i className="fa fa-spinner fa-spin"></i>
					) : 'Save Changes'}
				</button>
			</div>
		</div>
	);
};

export default Account;
