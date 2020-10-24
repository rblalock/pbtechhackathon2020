import React, { useState } from 'react';
import { useUser } from '../data/firebase';

const Account = () => {
	const { user, updateUser } = useUser();
	const [companyName, setCompanyName] = useState();
	const [companyType, setCompanyType] = useState();
	
	const handleCompanyName = (e) => {
		setCompanyName(e.target.value);
	};

	const handleCompanyTypeChange = (e) => {
		setCompanyType(e.target.value);
	};

	const handleSave = async () => {
		console.log('todo - handleSave', companyName, companyType);
		if (!companyName || !companyType) {
			return;
		}

		const payload = {
			companyName,
			companyType
		};

		await updateUser(payload);
	};

	return (
		<>
			<div>
				Account / profile page here

				{/* Org name */}
				<div className="w-1/4">
					<span>Logged in as: {user && user.displayName ? user.displayName : ''}</span>

					<input
						autoFocus
						onChange={handleCompanyName}
						type="text"
						defaultValue={user && user.companyName}
						className="w-full bg-transparent text-xl border-b pb-2 focus:outline-none text-blue-lighter"
						placeholder="Provide your organization's name"
					/>
				</div>

				{/* Persona type */}
				<div className="w-1/4">
					<select onChange={handleCompanyTypeChange} defaultValue={user && user.companyType || 'receiver'} name="company_type" className="mt-1 form-select block w-full pl-3 pr-10 py-2 text-base leading-6 border-gray-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5">
						<option value="supplier">Supplier</option>
						<option value="receiver">Receiver</option>
					</select>
				</div>

				<div
					className="w-1/4 text-center cursor-pointer text-xs ml-3 hover:bg-blue-dark text-blue-500 font-semibold mt-3 py-1 px-4 border rounded shadow"
					onClick={handleSave}
				>
					Save
				</div>
			</div>
		</>
	);
};

export default Account;
