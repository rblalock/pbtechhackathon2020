import React from 'react';
import { useMap } from '@roomservice/react';

import { useUser } from '../data/firebase';
import { InventoryForm } from '../components/forms';

const Board = () => {
	return (
		<div className="flex">
			<SupplierBoard />
			<ReceiverBoard />
		</div>
	);
};

export default Board;

const SupplierBoard = () => {
	// in prod. we'd need to figure out which room and id's to use
	const [boardMap, setBoardMap] = useMap('main-room', 'board-inventory');
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
			console.log(map);
		} else {
			map = {
				company: user.companyName,
				companyId: user.uid,
				inventory: [payload]
			};
		}

		setBoardMap(boardMap.set(user.uid, map));
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
							<li key={supplierKey}>
								<h5>{supplier.companyName}</h5>
								{supplier.inventory && supplier.inventory.map((inventory, i) => (
									<span className="block" key={i}>{inventory.name} - {inventory.type}</span>
								))}
							</li>
						)}
					)}
				</ul>
			</div>
		</>
	);
};

const ReceiverBoard = () => {
	const [boardMap, setBoardMap] = useMap('main-room', 'board-inventory');

	return (
		<>
			receiver board here
		</>
	);
};
