import React from 'react';
import { useMap } from '@roomservice/react';

import { useUser } from '../data/firebase';
import { InventoryForm } from '../components/forms';

const Board = () => {
	const { user } = useUser();
	// in prod. we'd need to figure out which room and id's to use
	const [supplierMap, setSupplierMap] = useMap('main-room', 'supplier-board');
	const [receiverMap, setReceiverMap] = useMap('main-room', 'receiver-board');

	return (
		<div className="flex">
			<SupplierBoard data={supplierMap} />
			<ReceiverBoard />
		</div>
	);
};

export default Board;

const SupplierBoard = ({
	data
}) => {
	const addInventory = (name, type) => {
		console.log('addInventory todo', name, type);
	};

	return (
		<>
			{/* Add inventory */}
			<div>
				<InventoryForm onSubmit={addInventory} />
			</div>
		</>
	);
};

const ReceiverBoard = () => {
	return (
		<>
			receiver board here
		</>
	);
};
