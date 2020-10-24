import React from 'react';

import { useUser } from '../data/firebase';
import { InventoryForm } from '../components/forms';


const SupplierBoard = ({
	boardMap,
	setBoardMap
}) => {
	const { user } = useUser();

	const addInventory = (name, type) => {
		const payload = {
			name,
			type,
			id: (new Date().getTime()) // todo - better hash
		};

		let map;
		if (boardMap.get(user.uid)) {
			const inventory = boardMap.get(user.uid).inventory;
			inventory.push(payload);
			map = {
				...boardMap.get(user.uid),
				inventory
			};
		} else {
			map = {
				company: user.companyName,
				companyId: user.uid,
				inventory: [payload]
			};
		}

		setBoardMap(boardMap.set(user.uid, map));
	};

	const deleteInventory = (index) => {
		const inventory = boardMap.get(user.uid).inventory;
		inventory.splice(index, 1);

		const map = {
			...boardMap.get(user.uid),
			inventory
		};

		setBoardMap(boardMap.set(user.uid, map));
	};

	const grabInventory = (supplierKey, index) => {
		const inventory = boardMap.get(supplierKey).inventory;
		inventory[index] = {
			...inventory[index],
			recipient: {
				company: user.companyName,
				companyId: user.uid,
			}
		};

		const map = {
			...boardMap.get(supplierKey),
			inventory
		};

		setBoardMap(boardMap.set(supplierKey, map));
	};

	return (
		<div className="border-r flex flex-col h-screen">
			<h1 className="text-gray-700 text-xl font-medium h-16 flex-none flex items-center px-6 border-b">
				Available Inventory
			</h1>

			<div className="px-6 py-3 border-b flex items-center">
				<i className="fa fa-filter text-gray-500 mr-6" aria-hidden></i>
				<ul className="flex space-x-2">
					<li className={`flex items-center p-2 rounded cursor-pointer ${true ? 'bg-brown text-white' : 'bg-gray-300 text-gray-500'}`}>
						<i className="fa fa-wheat" aria-hidden></i>
					</li>
					<li className={`flex items-center p-2 rounded cursor-pointer ${true ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-500'}`}>
						<i className="fa fa-apple-alt" aria-hidden></i>
					</li>
					<li className={`flex items-center p-2 rounded cursor-pointer ${true ? 'bg-orange-500 text-white' : 'bg-gray-300 text-gray-500'}`}>
						<i className="fa fa-carrot" aria-hidden></i>
					</li>
					<li className={`flex items-center p-2 rounded cursor-pointer ${true ? 'bg-yellow-500 text-white' : 'bg-gray-300 text-gray-500'}`}>
						<i className="fa fa-cheese-swiss" aria-hidden></i>
					</li>
					<li className={`flex items-center p-2 rounded cursor-pointer ${true ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500'}`}>
						<i className="fa fa-fish" aria-hidden></i>
					</li>
					<li className={`flex items-center p-2 rounded cursor-pointer ${true ? 'bg-red-700 text-white' : 'bg-gray-300 text-gray-500'}`}>
						<i className="fa fa-steak" aria-hidden></i>
					</li>
				</ul>
			</div>

			{user && user.companyType === 'supplier' && (
				<InventoryForm onSubmit={addInventory} />
			)}

			<div className="px-6 pt-6 overflow-y-scroll">
				{boardMap && boardMap.keys.map((supplierKey) => {
					const supplier = boardMap.get(supplierKey);

					return (
						<div className="border rounded overflow-hidden mb-6" key={`${supplierKey}-supplier-board`}>
							<div className="flex text-gray-700 p-3 items-center">
								<h3 className="flex-grow">
									{supplier.companyName}
								</h3>

								<ul className="flex space-x-3">
									<li className="flex items-center text-brown">
										<i className="fa fa-wheat" aria-hidden></i>
									</li>
									<li className="flex items-center text-orange-500">
										<i className="fa fa-carrot" aria-hidden></i>
									</li>
								</ul>

								<button className="bg-gray-400 text-gray-700 w-8 h-8 ml-6 rounded">
									<i className="fa fa-caret-up" aria-hidden></i>
								</button>
							</div>

							{/* Items */}
							<div className="flex flex-col">
								{supplier.inventory && supplier.inventory.filter(inventory => !inventory.recipient).map((inventory, i) => (
									<div className="flex border-t" key={`${i}-basket-inventory-${supplierKey}`}>
										<div className="flex items-center justify-center bg-brown text-white h-16 w-10 text-xl">
											<i className="fa fa-wheat" aria-hidden></i>
										</div>

										<div className="flex flex-col flex-grow justify-center h-16 mx-3">
											<h4 className="text-gray-700">
												{inventory.type}
											</h4>

											<h6 className="text-gray-500">
												{inventory.name}
											</h6>
										</div>

										<div className="flex items-center text-gray-600 text-xl mr-5 space-x-5">
											<i className="far fa-comments-alt cursor-pointer" aria-hidden></i>
	 										{user && user.companyType === 'supplier' && user.uid === supplierKey && (
												<i className="far fa-times cursor-pointer" aria-hidden onClick={() => deleteInventory(i)}></i>
											)}
											{user && user.companyType === 'receiver' && (
												<i className="far fa-plus cursor-pointer" aria-hidden onClick={() => grabInventory(supplierKey, i)}></i>
											)}
										</div>
									</div>
								))}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default SupplierBoard;
