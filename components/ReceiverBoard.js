import React from 'react';

import { useUser } from '../data/firebase';
import { TYPES } from '../data/types';

const ReceiverBoard = ({
	boardMap,
	setBoardMap,
	setDetailOpen,
	position
}) => {
	const { user } = useUser();

	const returnInventory = (supplierKey, index) => {
		const inventory = boardMap.get(supplierKey).inventory;
		inventory[index] = {
			...inventory[index]
		};
		delete inventory[index].recipient

		const map = {
			...boardMap.get(supplierKey),
			inventory
		};

		setBoardMap(boardMap.set(supplierKey, map));
	};

	return (
		<div className="border-r bg-white flex flex-col h-screen absolute w-1/2 animate-position" style={{ left: position === 1 ? '50%' : '0%' }}>
			<h1 className="text-gray-700 text-xl font-medium h-16 flex-none flex items-center justify-between px-6 border-b">
				Basket

				<button
					className="bg-gray-400 text-gray-700 w-12 h-10 rounded cursor-pointer"
					onClick={setDetailOpen}
				>
					<i className="fa fa-truck"></i>
				</button>
			</h1>

			<div className="px-6 pt-6 overflow-y-scroll flex-grow">
				{boardMap && boardMap.keys.map((supplierKey) => {
					const supplier = boardMap.get(supplierKey);

					return (
						<div className="border rounded overflow-hidden mb-6" key={`${supplierKey}-receiver-board`}>
							<div className="flex text-gray-700 p-3 items-center">
								<h3 className="flex-grow">
									{supplier.company}
								</h3>
							</div>

							<div className="flex flex-col">
	 							{supplier.inventory && supplier.inventory.filter(inventory => inventory.recipient).map((inventory, i) => (
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
											<i className="far fa-minus cursor-pointer" aria-hidden onClick={() => returnInventory(supplierKey, i)}></i>
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

export default ReceiverBoard;
