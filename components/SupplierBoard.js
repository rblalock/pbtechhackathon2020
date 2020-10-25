import React, { useState } from 'react';

import { useUser, useUsers } from '../data/firebase';
import { TYPES } from '../data/types';
import { InventoryForm } from '../components/forms';

const SupplierBoard = ({
	boardMap,
	setBoardMap,
	position
}) => {
	const { user } = useUser();
	const { users } = useUsers();
	const [filters, setFilters] = useState([]);
	const [expanded, setExpanded] = useState([]);

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

	const deleteInventory = (id) => {
		const inventory = boardMap.get(user.uid).inventory;
		const idx = inventory.findIndex(inv => id === inv.id);
		if (idx !== undefined) {
			inventory.splice(idx, 1);
		}

		const map = {
			...boardMap.get(user.uid),
			inventory
		};

		setBoardMap(boardMap.set(user.uid, map));
	};

	const grabInventory = (supplierKey, id) => {
		const inventory = boardMap.get(supplierKey).inventory;
		const idx = inventory.findIndex(inv => id === inv.id);
		if (idx !== undefined) {
			inventory[idx] = {
				...inventory[idx],
				recipient: {
					company: user.companyName,
					companyId: user.uid,
				}
			};
		}

		const map = {
			...boardMap.get(supplierKey),
			inventory
		};

		setBoardMap(boardMap.set(supplierKey, map));
	};

	const toggleExpand = (id) => {
		if (expanded.includes(id)) {
			setExpanded(expanded.filter(item => item !== id))
		} else {
			setExpanded([
				id,
				...expanded
			]);
		}
	};

	const toggleFilters = (name) => {
		if (filters.includes(name)) {
			setFilters(filters.filter(item => item !== name))
		} else {
			setFilters([
				name,
				...filters
			]);
		}
	};

	const videoInit = () => {
		window.callFrame = window.DailyIframe.createFrame();
		window.callFrame.on("left-meeting", () => window.callFrame.destroy());
		window.callFrame.join({
			url: "https://pbtech2020hackathon.daily.co/l74oIHqy5KBRyLmXWpLR",
			showLeaveButton: true
		});
	};

	return (
		<div className="border-r bg-white flex flex-col h-screen absolute w-1/2 animate-position" style={{ left: position === 0 ? '0%' : '-50%' }}>
			<h1 className="text-gray-700 text-xl font-medium h-16 flex-none flex items-center px-6 border-b">
				{user && user.companyType === 'supplier' ? 'My' : 'Available'} Inventory
			</h1>

			{user && (
				<>
					{user.companyType === 'supplier' ? (
						<InventoryForm onSubmit={addInventory} />
					) : (
						<div className="px-6 py-3 border-b flex items-center">
							<i className="fa fa-filter text-gray-500 mr-6" aria-hidden></i>
							<ul className="flex space-x-2">
								{
									Object.keys(TYPES).map((name) => (
										<li
											className={`flex items-center p-2 rounded cursor-pointer ${filters.includes(name) ? `bg-${TYPES[name].color} text-white` : 'bg-gray-300 text-gray-500'}`}
											key={`filter-${name}`}
											onClick={() => toggleFilters(name)}
										>
											<i className={`fa fa-${TYPES[name].icon}`} aria-hidden></i>
										</li>
									))
								}
							</ul>
						</div>
					)}
				</>
			)}

			{boardMap && user && (
				<div className="px-6 pt-6 overflow-y-scroll flex-grow">
					{user.companyType === 'supplier' ? (
						<>
							{boardMap.keys.filter(supplier => supplier === user.uid).map((supplierKey) => {
								const supplier = boardMap.get(supplierKey);
								const inventory = supplier.inventory.filter(inventory => !inventory.recipient);
								const hasInventory = inventory.length > 0;
		
								return hasInventory && (
									<React.Fragment key={`basket-inventory-${supplierKey}`}>
										{inventory.map((inventory, i) => (
											<div className="border rounded overflow-hidden mb-6 flex" key={`${inventory.type}-basket-inventory-${supplierKey}`}>
												<div className={`flex items-center justify-center bg-${TYPES[inventory.type].color} text-white h-16 w-10 text-xl`}>
													<i className={`fa fa-${TYPES[inventory.type].icon}`} aria-hidden></i>
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
													{user && user.companyType === 'supplier' && user.uid === supplierKey && (
														<i className="far fa-times cursor-pointer" aria-hidden onClick={() => deleteInventory(inventory.id)}></i>
													)}
													{user && user.companyType === 'receiver' && (
														<i className="far fa-plus cursor-pointer" aria-hidden onClick={() => grabInventory(supplierKey, inventory.id)}></i>
													)}
												</div>
											</div>
										))}
									</React.Fragment>
								);
							})}
						</>
					) : (
						<>
							{boardMap.keys.map((supplierKey) => {
								const supplier = boardMap.get(supplierKey);
								const supplierAccount = users.find((user) => user.id === supplierKey);
								const open = expanded.includes(supplier.companyId);
								const inventory = supplier.inventory.filter(inventory => !inventory.recipient);
								const hasInventory = filters.length > 0 ? inventory.filter(inventory => filters.includes(inventory.type)).length > 0 : inventory.length > 0;
		
								return hasInventory && (
									<div className="border rounded overflow-hidden mb-6" key={`${supplierKey}-supplier-board`}>
										<div className="flex text-gray-700 p-3 items-center">
											<div
												className="flex items-center text-gray-500 mr-2 cursor-pointer"
												onClick={() => videoInit()}
											>
												<span className="flex">
													<span className="animate-ping absolute h-3 w-3 rounded-full bg-green-400 opacity-75"></span>
													<span className="relative rounded-full h-3 w-3 bg-green-500"></span>
												</span>
											</div>

											<h3 className="whitespace-no-wrap">
												{supplierAccount && supplierAccount.companyName || 'Unknown Business'}
											</h3>

											<span className="flex-grow text-gray-400 ml-3 truncate">
												{supplierAccount && supplierAccount.address || 'Unknown Location'}
											</span>
		
											<ul className="flex space-x-3 ml-3">
												{inventory.map((inventory, i) => (
													<li className={`flex items-center text-${TYPES[inventory.type].color}`} key={`${i}-basket-icon-${supplierKey}`}>
														<i className={`fa fa-${TYPES[inventory.type].icon}`} aria-hidden></i>
													</li>
												))}
											</ul>
		
											<button
												className="bg-gray-400 text-gray-700 w-8 h-8 ml-6 rounded flex-none"
												onClick={() => toggleExpand(supplier.companyId)}
											>
												<i className={`fa fa-caret-${open ? 'up' : 'down'}`} aria-hidden></i>
											</button>
										</div>
		
										{open && (
											<div className="flex flex-col">
												{inventory.map((inventory, i) => (
													<div className="flex border-t" key={`${i}-basket-inventory-${supplierKey}`}>
														<div className={`flex items-center justify-center bg-${TYPES[inventory.type].color} text-white h-16 w-10 text-xl`}>
															<i className={`fa fa-${TYPES[inventory.type].icon}`} aria-hidden></i>
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
															{user && user.companyType === 'supplier' && user.uid === supplierKey && (
																<i className="far fa-times cursor-pointer" aria-hidden onClick={() => deleteInventory(inventory.id)}></i>
															)}
															{user && user.companyType === 'receiver' && (
																<i className="far fa-plus cursor-pointer" aria-hidden onClick={() => grabInventory(supplierKey, inventory.id)}></i>
															)}
														</div>
													</div>
												))}
											</div>
										)}
									</div>
								);
							})}
						</>
					)}
				</div>
			)}
		</div>
	);
};

export default SupplierBoard;
