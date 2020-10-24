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
			id: (new Date().getTime) // todo - better hash
		};

		if (boardMap[user.uid]) {
			boardMap[user.uid].inventory.push(payload);
		} else {
			boardMap[user.uid] = {
				company: user.companyName,
				companyId: user.uid,
				inventory: [payload]
			};
		}

		console.log(name, type, boardMap);

		setBoardMap('board-inventory', boardMap);
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
					{boardMap && Object.keys(boardMap).map((supplierKey) => (
						<li key={supplierKey}>
							<h5>{boardMap[supplierKey].companyName}</h5>
							{boardMap[supplierKey].inventory && boardMap[supplierKey].inventory.map((inventory) => (
								<span>{inventory.name} - {inventory.type}</span>
							))}
						</li>
					))}
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
