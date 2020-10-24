import React from 'react';

import { useUser } from '../data/firebase';

const ReceiverBoard = ({
	boardMap,
	setBoardMap
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
		<div className="flex flex-col ml-20">
			<h3>Basket here</h3>
			<ul>
				{boardMap && boardMap.keys.map((supplierKey) => {
					const supplier = boardMap.get(supplierKey);
					return (
						<li key={`${supplierKey}-receiver-board`}>
							<h5>{supplier.companyName}</h5>
							{supplier.inventory && supplier.inventory.map((inventory, i) => (
								<div key={`${i}-supplier-inventory-${supplierKey}`}>
									{inventory.recipient && (
										<>
											<span>{inventory.name} - {inventory.type}</span>
											{user && inventory.recipient.companyId === user.uid && (
												<span onClick={() => returnInventory(supplierKey, i)}> - RETURN ME</span>
											)}
										</>
									)}
								</div>
							))}
						</li>
					)
				}
				)}
			</ul>
		</div>
	);
};

export default ReceiverBoard;
