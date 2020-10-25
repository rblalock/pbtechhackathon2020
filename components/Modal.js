import React from 'react';

import { useUser } from '../data/firebase';

const ReceiverBoard = ({
	position
}) => {
	const { user } = useUser();

	return (
		<div className="border-r bg-white flex flex-col h-screen absolute w-1/2 animate-position" style={{ left: position === 2 ? '100%' : '50%' }}>
			<h1 className="text-gray-700 text-xl font-medium h-16 flex-none flex items-center justify-between px-6 border-b">
				My Pickups

				<button className="bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-3 h-10 rounded cursor-pointer">
					On My Way
				</button>
			</h1>

			<div className="flex-grow">
				Map goes here
			</div>
		</div>
	);
};

export default ReceiverBoard;
