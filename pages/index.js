import React, { useState } from 'react';
import { useMap } from '@roomservice/react';

import SupplierBoard from '../components/SupplierBoard';
import ReceiverBoard from '../components/ReceiverBoard';
import Modal from '../components/Modal';

const Site = () => {
	const [boardMap, setBoardMap] = useMap('main-room', 'board-inventory');
	const [detailOpen, _setDetailOpen] = useState(false);

	const setDetailOpen = () => {
		_setDetailOpen(!detailOpen);
	}

	return (
		<div className="grid grid-cols-2 h-screen relative">
			{boardMap && (
				<>
					<SupplierBoard
						boardMap={boardMap}
						setBoardMap={setBoardMap}
						position={detailOpen ? -1 : 0}
					/>
					<ReceiverBoard
						boardMap={boardMap}
						setBoardMap={setBoardMap}
						position={detailOpen ? 0 : 1}
						setDetailOpen={setDetailOpen}
					/>
					<Modal
						boardMap={boardMap}
						position={detailOpen ? 1 : 2}
					/>
				</>
			)}
		</div>
	);
};

export default Site;
