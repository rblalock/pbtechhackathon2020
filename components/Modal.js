import React from 'react';

import { useUser } from '../data/firebase';

const ReceiverBoard = ({
	position
}) => {
	const { user } = useUser();

	return (
		<div className="border-r bg-white flex flex-col h-screen absolute w-1/2 animate-position" style={{ left: position === 2 ? '100%' : '50%' }}>
			<h1 className="text-gray-700 text-xl font-medium h-16 flex-none flex items-center px-6 border-b">
				My Route
			</h1>

			<div className="px-6 pt-6 overflow-y-scroll">
				Yo
			</div>
		</div>
	);
};

export default ReceiverBoard;
