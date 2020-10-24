import React, { useEffect } from 'react';

import { useUser } from '../data/firebase';

const Site = () => {
	const { user, loading } = useUser();

	return (
		<div className="grid grid-cols-2 h-screen">
			<div className="border-r">
				<h1 className="text-gray-700 text-xl font-medium h-16 flex items-center px-6 border-b">
					Available Inventory
				</h1>

				<div className="px-6 py-3 border-b flex items-center">
					<i className="fa fa-filter text-gray-500 mr-6"></i>
					<ul className="flex space-x-2">
						<li className={`flex items-center p-2 rounded cursor-pointer ${true ? 'bg-brown text-white' : 'bg-gray-300 text-gray-500'}`}>
							<i className="fa fa-wheat"></i>
						</li>
						<li className={`flex items-center p-2 rounded cursor-pointer ${true ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-500'}`}>
							<i className="fa fa-apple-alt"></i>
						</li>
						<li className={`flex items-center p-2 rounded cursor-pointer ${true ? 'bg-orange-500 text-white' : 'bg-gray-300 text-gray-500'}`}>
							<i className="fa fa-carrot"></i>
						</li>
						<li className={`flex items-center p-2 rounded cursor-pointer ${true ? 'bg-yellow-500 text-white' : 'bg-gray-300 text-gray-500'}`}>
							<i className="fa fa-cheese-swiss"></i>
						</li>
						<li className={`flex items-center p-2 rounded cursor-pointer ${true ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500'}`}>
							<i className="fa fa-fish"></i>
						</li>
						<li className={`flex items-center p-2 rounded cursor-pointer ${true ? 'bg-red-700 text-white' : 'bg-gray-300 text-gray-500'}`}>
							<i className="fa fa-steak"></i>
						</li>
					</ul>
				</div>
			</div>

			<div className="">
				<h1 className="text-gray-700 text-xl font-medium h-16 flex items-center px-6 border-b">
					My Selections
				</h1>
			</div>
		</div>
	);
};

export default Site;
