import React from 'react';
import { useMap } from '@roomservice/react';

import { useUser } from '../data/firebase';
import { InventoryForm } from '../components/forms';
import SupplierBoard from '../components/SupplierBoard';
import ReceiverBoard from '../components/ReceiverBoard';

const Board = () => {
	return (
		<div className="flex">
			<SupplierBoard />
			<ReceiverBoard />
		</div>
	);
};

export default Board;
