import React, { useState } from 'react';

export const InventoryForm = ({
	onSubmit
}) => {
	const [name, setName] = useState();
	const [type, setType] = useState('Grain');

	const handleSave = () => {
		if (!type) return;

		onSubmit(name || 'Unknown', type);
	};

	return (
		<div className="px-6 py-3 border-b flex items-center">
			<div className="inline-block relative text-gray-700 bg-gray-300 p-3 rounded">
				<select
					name="type"
					defaultValue="Grain"
					className="block appearance-none bg-gray-300 pr-8 focus:outline-none focus:shadow-outline"
					onChange={(e) => setType(e.target.value)}
				>
					<option value="Grain">Grain</option>
					<option value="Fruit">Fruit</option>
					<option value="Vegetable">Vegetable</option>
					<option value="Dairy">Dairy</option>
					<option value="Fish">Fish</option>
					<option value="Meat">Meat</option>
				</select>
				<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
					<svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
				</div>
			</div>

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
