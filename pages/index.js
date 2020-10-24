import React from 'react';
import { useMap } from '@roomservice/react';

import SupplierBoard from '../components/SupplierBoard';
import ReceiverBoard from '../components/ReceiverBoard';

const Site = () => {
	const [boardMap, setBoardMap] = useMap('main-room', 'board-inventory');

	return (
		<div className="grid grid-cols-2 h-screen">
			{boardMap && (
				<>
					<SupplierBoard boardMap={boardMap} setBoardMap={setBoardMap} />
					<ReceiverBoard boardMap={boardMap} setBoardMap={setBoardMap} />
				</>
			)}
		</div>
	);
};

export default Site;
