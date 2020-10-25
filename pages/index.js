import React, { useState, useEffect } from 'react';
import { useMap, usePresence } from '@roomservice/react';

import { useUser } from '../data/firebase';
import SupplierBoard from '../components/SupplierBoard';
import ReceiverBoard from '../components/ReceiverBoard';
import Modal from '../components/Modal';

const Site = () => {
	const [boardMap, setBoardMap] = useMap('main-room', 'board-inventory');
	const [onlineStatuses, setMyOnlineStatus] = usePresence('userRoom', 'users');
	const [detailOpen, _setDetailOpen] = useState(false);
	const { user } = useUser();

	const setDetailOpen = () => {
		_setDetailOpen(!detailOpen);
	}

	useEffect(() => {
		if (user) {
			setMyOnlineStatus({
				id: user.uid,
				name: user.companyName,
				displayName: user.displayName
			});
		}
	}, [user]);

	return (
		<div className="grid grid-cols-2 h-screen relative">
			{boardMap && (
				<>
					<SupplierBoard
						onlineUsers={onlineStatuses}
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
