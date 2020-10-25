import React, { useMemo } from 'react';

import { useUser, useUsers } from '../data/firebase';
import MapView from '../components/MapView';

const Modal = ({
	position,
	boardMap
}) => {
	const { user } = useUser();
	const { users } = useUsers();
	const destinations = useMemo(() => {
		const destinationStops = [];
		if (position === 1 && boardMap && user && users) {
			boardMap.keys.forEach((key) => {
				const supplier = boardMap.get(key);
				const found = supplier.inventory && supplier.inventory.find(inventory => {
					if (inventory.recipient) {
						return inventory.recipient.companyId === user.uid;
					} else {
						return false;
					}
				});
				if (found) {
					const company = users.find(u => u.id === key);
					if (company.address) {
						destinationStops.push(users.find(u => u.id === key));
					}
				}
			});
		}
		return destinationStops;
	}, [boardMap, user, users, position]);

	return (
		<div className="border-r bg-white flex flex-col h-screen absolute w-1/2 animate-position" style={{ left: position === 2 ? '100%' : '50%' }}>
			<h1 className="text-gray-700 text-xl font-medium h-16 flex-none flex items-center justify-between px-6 border-b">
				My Pickups

				<button className="bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-3 h-10 rounded cursor-pointer">
					On My Way
				</button>
			</h1>

			{position === 1 && user && user.address && (
				<div className="flex-grow">
					<MapView destinations={destinations} address={user && user.address} />
				</div>
			)}
		</div>
	);
};

export default Modal;
