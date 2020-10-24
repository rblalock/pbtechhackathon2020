import React, { useState } from 'react';

export const InventoryForm = ({
	onSubmit
}) => {
	const [name, setName] = useState();
	const [type, setType] = useState();

	const handleSave = () => {
		if (!name || ! type) return;

		onSubmit(name, type);
	};

	return (
		<div>
			<input
				autoFocus
				onChange={(e) => setName(e.target.value)}
				type="text"
				defaultValue=""
				className="w-full bg-transparent text-xl border-b pb-2 focus:outline-none text-blue-lighter"
				placeholder="Name the item you're donating"
			/>

			<select onChange={(e) => setType(e.target.value)} defaultValue="bread" name="inventory_type" className="mt-1 form-select block w-full pl-3 pr-10 py-2 text-base leading-6 border-gray-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5">
				<option value="bread">Bread</option>
				<option value="dairy">Dairy</option>
			</select>

			<div
				className="w-32 text-center cursor-pointer text-xs hover:bg-blue-dark text-blue-500 font-semibold mt-3 py-1 px-4 border rounded shadow"
				onClick={handleSave}
			>
				Add
			</div>
		</div>
	);
};
