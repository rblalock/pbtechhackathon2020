import React from 'react';

import { useUser, useUsers } from '../data/firebase';
import { TYPES } from '../data/types';

const ReceiverBoard = ({
	boardMap,
	setBoardMap,
	setDetailOpen,
	position
}) => {
	const { user } = useUser();
	const { users } = useUsers();

	const returnInventory = (supplierKey, id) => {
		const inventory = boardMap.get(supplierKey).inventory;
		const idx = inventory.findIndex(inv => id === inv.id);
		if (idx !== undefined) {
			delete inventory[idx].recipient;
		}

		const map = {
			...boardMap.get(supplierKey),
			inventory
		};

		setBoardMap(boardMap.set(supplierKey, map));
	};

	const deleteInventory = (supplierKey, id) => {
		const inventory = boardMap.get(supplierKey).inventory;
		const idx = inventory.findIndex(inv => id === inv.id);
		if (idx !== undefined) {
			inventory.splice(idx, 1);
		}

		const map = {
			...boardMap.get(supplierKey),
			inventory
		};

		setBoardMap(boardMap.set(supplierKey, map));
	};

	return (
		<div className="border-r bg-white flex flex-col h-screen absolute w-1/2 animate-position" style={{ left: position === 1 ? '50%' : '0%' }}>
			<h1 className="text-gray-700 text-xl font-medium h-16 flex-none flex items-center justify-between px-6 border-b">
				{user && user.companyType === 'supplier' ? 'Scheduled Pickups' : 'Basket'}

				{user && user.companyType === 'recipient' && (
					<button
						className="bg-gray-400 hover:bg-gray-500 text-gray-700 w-12 h-10 rounded cursor-pointer"
						onClick={setDetailOpen}
					>
						<i className="fa fa-truck"></i>
					</button>
				)}
			</h1>

			{boardMap && user && (
				<div className="px-6 pt-6 overflow-y-scroll flex-grow">
					{user.companyType === 'supplier' ? (
						<>
							{boardMap.keys.filter(supplierKey => supplierKey === user.uid).map((supplierKey) => {
								const supplier = boardMap.get(supplierKey);
								const inventory = supplier.inventory.filter(inventory => inventory.recipient);

								// Group by recipients so the supplier can see their things together
								const recipients = {};
								inventory.forEach((inv) => {
									if (recipients[inv.recipient.companyId]) {
										recipients[inv.recipient.companyId].push(inv);
									} else {
										recipients[inv.recipient.companyId] = [inv];
									}
								});

								return Object.keys(recipients).map((key) => {
									const recipientAccount = users.find((user) => user.id === key);

									return (
										<div className="border rounded overflow-hidden mb-6" key={`${key}-receiver-board`}>
											<div className="flex text-gray-700 p-3 items-center">
												<h3 className="flex-grow flex items-space">
													{recipientAccount && recipientAccount.companyName || 'Unknown Business'}

													<span className="text-gray-400 ml-3 inline-block truncate">
														{recipientAccount && recipientAccount.address || 'Unknown Location'}
													</span>
												</h3>
											</div>

											<div className="flex flex-col">
												{recipients[key].map((inventory, i) => (
													<div className="flex border-t" key={`${i}-supplier-inventory-${key}`}>
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
															<i className="far fa-comments-alt cursor-pointer" aria-hidden></i>
														</div>
													</div>
												))}
											</div>
										</div>
									);
								});
							})}
						</>
					) : (
						<>
							{boardMap.keys.map((supplierKey) => {
								const supplier = boardMap.get(supplierKey);
								const supplierAccount = users.find((user) => user.id === supplierKey);
								const inventory = supplier.inventory.filter(inventory => inventory.recipient);
								const hasInventory = inventory.length > 0;

								return hasInventory && (
									<div className="border rounded overflow-hidden mb-6" key={`${supplierKey}-receiver-board`}>
										<div className="flex text-gray-700 p-3 items-center">
											<h3 className="flex-grow flex items-space">
												{supplierAccount && supplierAccount.companyName || 'Unknown Business'}

												<span className="text-gray-400 ml-3 inline-block truncate">
													{supplierAccount && supplierAccount.address || 'Unknown Location'}
												</span>
											</h3>
										</div>

										<div className="flex flex-col">
											{inventory.map((inventory, i) => (
												<div className="flex border-t" key={`${i}-supplier-inventory-${supplierKey}`}>
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
														<i className="far fa-comments-alt cursor-pointer" aria-hidden></i>
														{position === 1 ? (
															<i className="far fa-minus cursor-pointer" aria-hidden onClick={() => returnInventory(supplierKey, inventory.id)}></i>
														) : (
															<i className="far fa-check text-green-500 cursor-pointer" aria-hidden onClick={() => deleteInventory(supplierKey, inventory.id)}></i>
														)}
													</div>
												</div>
											))}
										</div>
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

export default ReceiverBoard;
