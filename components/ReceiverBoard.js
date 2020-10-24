import React from 'react';
import { useMap } from '@roomservice/react';

import { useUser } from '../data/firebase';

const ReceiverBoard = () => {
	const [boardMap, setBoardMap] = useMap('main-room', 'board-inventory');
	const { user } = useUser();

	return (
		<>
			receiver board here
		</>
	);
};

export default ReceiverBoard;
