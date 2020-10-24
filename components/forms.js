import React, { useState } from 'react';

export const InventoryForm = ({
	onSubmit
}) => {
	const [name, setName] = useState();
	const [type, setType] = useState('bread');

	const handleSave = () => {
		if (!type) return;

		onSubmit(name || 'Unknown', type);
	};

	return (
		<div className="px-6 py-3 border-b flex items-center">
			<select
				name="type"
				defaultValue="bread"
				className="form-select text-gray-700 bg-gray-300 p-3 focus:outline-none rounded"
				onChange={(e) => setType(e.target.value)}
			>
				<option value="bread">Bread</option>
				<option value="dairy">Dairy</option>
			</select>

			<input
				type="text"
				name="quantity"
				defaultValue=""
				placeholder="Quantity"
				className="text-gray-700 bg-gray-300 p-3 ml-3 focus:outline-none rounded"
				onChange={(e) => setName(e.target.value)}
			/>

			<button
				className="ml-3 bg-green-600 text-white hover:bg-green-700 p-3 rounded"
				onClick={handleSave}
			>
				Add
			</button>
		</div>
	);
};
