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
		<>
			{/* Add inventory */}
			<div>
				{user && user.companyType === 'supplier' && (
					<InventoryForm onSubmit={addInventory} />
				)}

				<h3>Supplier board here</h3>
				<ul>
					{boardMap && boardMap.keys.map((supplierKey) => {
						const supplier = boardMap.get(supplierKey);
						return (
							<li key={`${supplierKey}-supplier-board`}>
								<h5>{supplier.companyName}</h5>
								{supplier.inventory && supplier.inventory.map((inventory, i) => (
									<div key={`${i}-basket-inventory-${supplierKey}`}>
										{!inventory.recipient && (
											<>
												<span>{inventory.name} - {inventory.type}</span>
												{user && user.companyType === 'supplier' && user.uid === supplierKey && (
													<span onClick={() => deleteInventory(i)}> - DELETE ME</span>
												)}
												{user && user.companyType === 'receiver' && (
													<span onClick={() => grabInventory(supplierKey, i)}> - GRAB ME</span>
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
		</>
	);
};

export default SupplierBoard;
