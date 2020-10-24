import React from 'react';
import { useMap } from '@roomservice/react';

import { useUser } from '../data/firebase';
import { InventoryForm } from '../components/forms';
import SupplierBoard from '../components/SupplierBoard';
import ReceiverBoard from '../components/ReceiverBoard';

const Board = () => {
	const [boardMap, setBoardMap] = useMap('main-room', 'board-inventory');

	return (
		<div className="flex">
			{boardMap && (
				<>
					<SupplierBoard boardMap={boardMap} setBoardMap={setBoardMap} />
					<ReceiverBoard boardMap={boardMap} setBoardMap={setBoardMap} />
				</>
			)}
		</div>
	);
};

export default Board;
