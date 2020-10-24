import React, { useEffect } from 'react';

import { useUser } from '../data/firebase';

const Site = () => {
	const { user, loading } = useUser();

	return (
		<div className="grid grid-cols-2 h-screen">
			<div className="border-r flex flex-col h-screen">
				<h1 className="text-gray-700 text-xl font-medium h-16 flex-none flex items-center px-6 border-b">
					Available Inventory
				</h1>

				<div className="px-6 py-3 border-b flex items-center">
					<i className="fa fa-filter text-gray-500 mr-6" aria-hidden></i>
					<ul className="flex space-x-2">
						<li className={`flex items-center p-2 rounded cursor-pointer ${true ? 'bg-brown text-white' : 'bg-gray-300 text-gray-500'}`}>
							<i className="fa fa-wheat" aria-hidden></i>
						</li>
						<li className={`flex items-center p-2 rounded cursor-pointer ${true ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-500'}`}>
							<i className="fa fa-apple-alt" aria-hidden></i>
						</li>
						<li className={`flex items-center p-2 rounded cursor-pointer ${true ? 'bg-orange-500 text-white' : 'bg-gray-300 text-gray-500'}`}>
							<i className="fa fa-carrot" aria-hidden></i>
						</li>
						<li className={`flex items-center p-2 rounded cursor-pointer ${true ? 'bg-yellow-500 text-white' : 'bg-gray-300 text-gray-500'}`}>
							<i className="fa fa-cheese-swiss" aria-hidden></i>
						</li>
						<li className={`flex items-center p-2 rounded cursor-pointer ${true ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500'}`}>
							<i className="fa fa-fish" aria-hidden></i>
						</li>
						<li className={`flex items-center p-2 rounded cursor-pointer ${true ? 'bg-red-700 text-white' : 'bg-gray-300 text-gray-500'}`}>
							<i className="fa fa-steak" aria-hidden></i>
						</li>
					</ul>
				</div>

				<div className="px-6 pt-6 overflow-y-scroll">
					{/* Expanded Row */}
					<div className="border rounded overflow-hidden mb-6">
						{/* Heading */}
						<div className="flex text-gray-700 p-3 items-center">
							<h3 className="flex-grow">
								Publix #459
							</h3>

							<ul className="flex space-x-3">
								<li className="flex items-center text-brown">
									<i className="fa fa-wheat" aria-hidden></i>
								</li>
								<li className="flex items-center text-red-500">
									<i className="fa fa-apple-alt" aria-hidden></i>
								</li>
								<li className="flex items-center text-orange-500">
									<i className="fa fa-carrot" aria-hidden></i>
								</li>
								<li className="flex items-center text-yellow-500">
									<i className="fa fa-cheese-swiss" aria-hidden></i>
								</li>
								<li className="flex items-center text-blue-500">
									<i className="fa fa-fish" aria-hidden></i>
								</li>
								<li className="flex items-center text-red-700">
									<i className="fa fa-steak" aria-hidden></i>
								</li>
							</ul>

							<button className="bg-gray-400 text-gray-700 w-6 h-6 ml-6 rounded">
								<i className="fa fa-caret-up" aria-hidden></i>
							</button>
						</div>

						{/* Items */}
						<div className="flex flex-col">
							{/* Item */}
							<div className="flex border-t">
								<div className="flex items-center justify-center bg-brown text-white h-16 w-10 text-xl">
									<i className="fa fa-wheat" aria-hidden></i>
								</div>

								<div className="flex flex-col flex-grow justify-center h-16 mx-3">
									<h4 className="text-gray-700">
										Bread
									</h4>

									<h6 className="text-gray-500">
										50 Units
									</h6>
								</div>

								<div className="flex items-center text-gray-600 text-xl mr-4 space-x-4">
									<i className="far fa-comments-alt cursor-pointer" aria-hidden></i>
									<i className="far fa-plus cursor-pointer" aria-hidden></i>
								</div>
							</div>
							{/* End Item */}

							{/* Item */}
							<div className="flex border-t">
								<div className="flex items-center justify-center bg-orange-500 text-white h-16 w-10 text-xl">
									<i className="fa fa-carrot" aria-hidden></i>
								</div>

								<div className="flex flex-col flex-grow justify-center h-16 mx-3">
									<h4 className="text-gray-700">
										Vegetables
									</h4>

									<h6 className="text-gray-500">
										1 Palette
									</h6>
								</div>

								<div className="flex items-center text-gray-600 text-xl mr-4 space-x-4">
									<i className="far fa-comments-alt cursor-pointer" aria-hidden></i>
									<i className="far fa-plus cursor-pointer" aria-hidden></i>
								</div>
							</div>
							{/* End Item */}
						</div>
					</div>
					{/* End Expanded Row */}

					{/* Row */}
					<div className="border rounded mb-6">
						<div className="flex text-gray-700 p-3 items-center">
							<h3 className="flex-grow">
								Publix #459
							</h3>

							<ul className="flex space-x-3">
								<li className="flex items-center text-brown">
									<i className="fa fa-wheat" aria-hidden></i>
								</li>
								<li className="flex items-center text-red-500">
									<i className="fa fa-apple-alt" aria-hidden></i>
								</li>
								<li className="flex items-center text-orange-500">
									<i className="fa fa-carrot" aria-hidden></i>
								</li>
								<li className="flex items-center text-yellow-500">
									<i className="fa fa-cheese-swiss" aria-hidden></i>
								</li>
								<li className="flex items-center text-blue-500">
									<i className="fa fa-fish" aria-hidden></i>
								</li>
								<li className="flex items-center text-red-700">
									<i className="fa fa-steak" aria-hidden></i>
								</li>
							</ul>

							<button className="bg-gray-400 text-gray-700 w-6 h-6 ml-6 rounded">
								<i className="fa fa-caret-down" aria-hidden></i>
							</button>
						</div>
					</div>
					{/* End Row */}

					{/* Test Rows */}
					<div className="border rounded mb-6"><div className="flex text-gray-700 p-3 items-center"><h3 className="flex-grow">Publix #459</h3><ul className="flex space-x-3"><li className="flex items-center text-brown"><i className="fa fa-wheat" aria-hidden></i></li><li className="flex items-center text-red-500"><i className="fa fa-apple-alt" aria-hidden></i></li><li className="flex items-center text-orange-500"><i className="fa fa-carrot" aria-hidden></i></li><li className="flex items-center text-yellow-500"><i className="fa fa-cheese-swiss" aria-hidden></i></li><li className="flex items-center text-blue-500"><i className="fa fa-fish" aria-hidden></i></li><li className="flex items-center text-red-700"><i className="fa fa-steak" aria-hidden></i></li></ul><button className="bg-gray-400 text-gray-700 w-6 h-6 ml-6 rounded"><i className="fa fa-caret-down" aria-hidden></i></button></div></div>
					<div className="border rounded mb-6"><div className="flex text-gray-700 p-3 items-center"><h3 className="flex-grow">Publix #459</h3><ul className="flex space-x-3"><li className="flex items-center text-brown"><i className="fa fa-wheat" aria-hidden></i></li><li className="flex items-center text-red-500"><i className="fa fa-apple-alt" aria-hidden></i></li><li className="flex items-center text-orange-500"><i className="fa fa-carrot" aria-hidden></i></li><li className="flex items-center text-yellow-500"><i className="fa fa-cheese-swiss" aria-hidden></i></li><li className="flex items-center text-blue-500"><i className="fa fa-fish" aria-hidden></i></li><li className="flex items-center text-red-700"><i className="fa fa-steak" aria-hidden></i></li></ul><button className="bg-gray-400 text-gray-700 w-6 h-6 ml-6 rounded"><i className="fa fa-caret-down" aria-hidden></i></button></div></div>
					<div className="border rounded mb-6"><div className="flex text-gray-700 p-3 items-center"><h3 className="flex-grow">Publix #459</h3><ul className="flex space-x-3"><li className="flex items-center text-brown"><i className="fa fa-wheat" aria-hidden></i></li><li className="flex items-center text-red-500"><i className="fa fa-apple-alt" aria-hidden></i></li><li className="flex items-center text-orange-500"><i className="fa fa-carrot" aria-hidden></i></li><li className="flex items-center text-yellow-500"><i className="fa fa-cheese-swiss" aria-hidden></i></li><li className="flex items-center text-blue-500"><i className="fa fa-fish" aria-hidden></i></li><li className="flex items-center text-red-700"><i className="fa fa-steak" aria-hidden></i></li></ul><button className="bg-gray-400 text-gray-700 w-6 h-6 ml-6 rounded"><i className="fa fa-caret-down" aria-hidden></i></button></div></div>
					<div className="border rounded mb-6"><div className="flex text-gray-700 p-3 items-center"><h3 className="flex-grow">Publix #459</h3><ul className="flex space-x-3"><li className="flex items-center text-brown"><i className="fa fa-wheat" aria-hidden></i></li><li className="flex items-center text-red-500"><i className="fa fa-apple-alt" aria-hidden></i></li><li className="flex items-center text-orange-500"><i className="fa fa-carrot" aria-hidden></i></li><li className="flex items-center text-yellow-500"><i className="fa fa-cheese-swiss" aria-hidden></i></li><li className="flex items-center text-blue-500"><i className="fa fa-fish" aria-hidden></i></li><li className="flex items-center text-red-700"><i className="fa fa-steak" aria-hidden></i></li></ul><button className="bg-gray-400 text-gray-700 w-6 h-6 ml-6 rounded"><i className="fa fa-caret-down" aria-hidden></i></button></div></div>
					<div className="border rounded mb-6"><div className="flex text-gray-700 p-3 items-center"><h3 className="flex-grow">Publix #459</h3><ul className="flex space-x-3"><li className="flex items-center text-brown"><i className="fa fa-wheat" aria-hidden></i></li><li className="flex items-center text-red-500"><i className="fa fa-apple-alt" aria-hidden></i></li><li className="flex items-center text-orange-500"><i className="fa fa-carrot" aria-hidden></i></li><li className="flex items-center text-yellow-500"><i className="fa fa-cheese-swiss" aria-hidden></i></li><li className="flex items-center text-blue-500"><i className="fa fa-fish" aria-hidden></i></li><li className="flex items-center text-red-700"><i className="fa fa-steak" aria-hidden></i></li></ul><button className="bg-gray-400 text-gray-700 w-6 h-6 ml-6 rounded"><i className="fa fa-caret-down" aria-hidden></i></button></div></div>
					<div className="border rounded mb-6"><div className="flex text-gray-700 p-3 items-center"><h3 className="flex-grow">Publix #459</h3><ul className="flex space-x-3"><li className="flex items-center text-brown"><i className="fa fa-wheat" aria-hidden></i></li><li className="flex items-center text-red-500"><i className="fa fa-apple-alt" aria-hidden></i></li><li className="flex items-center text-orange-500"><i className="fa fa-carrot" aria-hidden></i></li><li className="flex items-center text-yellow-500"><i className="fa fa-cheese-swiss" aria-hidden></i></li><li className="flex items-center text-blue-500"><i className="fa fa-fish" aria-hidden></i></li><li className="flex items-center text-red-700"><i className="fa fa-steak" aria-hidden></i></li></ul><button className="bg-gray-400 text-gray-700 w-6 h-6 ml-6 rounded"><i className="fa fa-caret-down" aria-hidden></i></button></div></div>
					<div className="border rounded mb-6"><div className="flex text-gray-700 p-3 items-center"><h3 className="flex-grow">Publix #459</h3><ul className="flex space-x-3"><li className="flex items-center text-brown"><i className="fa fa-wheat" aria-hidden></i></li><li className="flex items-center text-red-500"><i className="fa fa-apple-alt" aria-hidden></i></li><li className="flex items-center text-orange-500"><i className="fa fa-carrot" aria-hidden></i></li><li className="flex items-center text-yellow-500"><i className="fa fa-cheese-swiss" aria-hidden></i></li><li className="flex items-center text-blue-500"><i className="fa fa-fish" aria-hidden></i></li><li className="flex items-center text-red-700"><i className="fa fa-steak" aria-hidden></i></li></ul><button className="bg-gray-400 text-gray-700 w-6 h-6 ml-6 rounded"><i className="fa fa-caret-down" aria-hidden></i></button></div></div>
					<div className="border rounded mb-6"><div className="flex text-gray-700 p-3 items-center"><h3 className="flex-grow">Publix #459</h3><ul className="flex space-x-3"><li className="flex items-center text-brown"><i className="fa fa-wheat" aria-hidden></i></li><li className="flex items-center text-red-500"><i className="fa fa-apple-alt" aria-hidden></i></li><li className="flex items-center text-orange-500"><i className="fa fa-carrot" aria-hidden></i></li><li className="flex items-center text-yellow-500"><i className="fa fa-cheese-swiss" aria-hidden></i></li><li className="flex items-center text-blue-500"><i className="fa fa-fish" aria-hidden></i></li><li className="flex items-center text-red-700"><i className="fa fa-steak" aria-hidden></i></li></ul><button className="bg-gray-400 text-gray-700 w-6 h-6 ml-6 rounded"><i className="fa fa-caret-down" aria-hidden></i></button></div></div>
					<div className="border rounded mb-6"><div className="flex text-gray-700 p-3 items-center"><h3 className="flex-grow">Publix #459</h3><ul className="flex space-x-3"><li className="flex items-center text-brown"><i className="fa fa-wheat" aria-hidden></i></li><li className="flex items-center text-red-500"><i className="fa fa-apple-alt" aria-hidden></i></li><li className="flex items-center text-orange-500"><i className="fa fa-carrot" aria-hidden></i></li><li className="flex items-center text-yellow-500"><i className="fa fa-cheese-swiss" aria-hidden></i></li><li className="flex items-center text-blue-500"><i className="fa fa-fish" aria-hidden></i></li><li className="flex items-center text-red-700"><i className="fa fa-steak" aria-hidden></i></li></ul><button className="bg-gray-400 text-gray-700 w-6 h-6 ml-6 rounded"><i className="fa fa-caret-down" aria-hidden></i></button></div></div>
					<div className="border rounded mb-6"><div className="flex text-gray-700 p-3 items-center"><h3 className="flex-grow">Publix #459</h3><ul className="flex space-x-3"><li className="flex items-center text-brown"><i className="fa fa-wheat" aria-hidden></i></li><li className="flex items-center text-red-500"><i className="fa fa-apple-alt" aria-hidden></i></li><li className="flex items-center text-orange-500"><i className="fa fa-carrot" aria-hidden></i></li><li className="flex items-center text-yellow-500"><i className="fa fa-cheese-swiss" aria-hidden></i></li><li className="flex items-center text-blue-500"><i className="fa fa-fish" aria-hidden></i></li><li className="flex items-center text-red-700"><i className="fa fa-steak" aria-hidden></i></li></ul><button className="bg-gray-400 text-gray-700 w-6 h-6 ml-6 rounded"><i className="fa fa-caret-down" aria-hidden></i></button></div></div>
					<div className="border rounded mb-6"><div className="flex text-gray-700 p-3 items-center"><h3 className="flex-grow">Publix #459</h3><ul className="flex space-x-3"><li className="flex items-center text-brown"><i className="fa fa-wheat" aria-hidden></i></li><li className="flex items-center text-red-500"><i className="fa fa-apple-alt" aria-hidden></i></li><li className="flex items-center text-orange-500"><i className="fa fa-carrot" aria-hidden></i></li><li className="flex items-center text-yellow-500"><i className="fa fa-cheese-swiss" aria-hidden></i></li><li className="flex items-center text-blue-500"><i className="fa fa-fish" aria-hidden></i></li><li className="flex items-center text-red-700"><i className="fa fa-steak" aria-hidden></i></li></ul><button className="bg-gray-400 text-gray-700 w-6 h-6 ml-6 rounded"><i className="fa fa-caret-down" aria-hidden></i></button></div></div>
					<div className="border rounded mb-6"><div className="flex text-gray-700 p-3 items-center"><h3 className="flex-grow">Publix #459</h3><ul className="flex space-x-3"><li className="flex items-center text-brown"><i className="fa fa-wheat" aria-hidden></i></li><li className="flex items-center text-red-500"><i className="fa fa-apple-alt" aria-hidden></i></li><li className="flex items-center text-orange-500"><i className="fa fa-carrot" aria-hidden></i></li><li className="flex items-center text-yellow-500"><i className="fa fa-cheese-swiss" aria-hidden></i></li><li className="flex items-center text-blue-500"><i className="fa fa-fish" aria-hidden></i></li><li className="flex items-center text-red-700"><i className="fa fa-steak" aria-hidden></i></li></ul><button className="bg-gray-400 text-gray-700 w-6 h-6 ml-6 rounded"><i className="fa fa-caret-down" aria-hidden></i></button></div></div>
					<div className="border rounded mb-6"><div className="flex text-gray-700 p-3 items-center"><h3 className="flex-grow">Publix #459</h3><ul className="flex space-x-3"><li className="flex items-center text-brown"><i className="fa fa-wheat" aria-hidden></i></li><li className="flex items-center text-red-500"><i className="fa fa-apple-alt" aria-hidden></i></li><li className="flex items-center text-orange-500"><i className="fa fa-carrot" aria-hidden></i></li><li className="flex items-center text-yellow-500"><i className="fa fa-cheese-swiss" aria-hidden></i></li><li className="flex items-center text-blue-500"><i className="fa fa-fish" aria-hidden></i></li><li className="flex items-center text-red-700"><i className="fa fa-steak" aria-hidden></i></li></ul><button className="bg-gray-400 text-gray-700 w-6 h-6 ml-6 rounded"><i className="fa fa-caret-down" aria-hidden></i></button></div></div>
					<div className="border rounded mb-6"><div className="flex text-gray-700 p-3 items-center"><h3 className="flex-grow">Publix #459</h3><ul className="flex space-x-3"><li className="flex items-center text-brown"><i className="fa fa-wheat" aria-hidden></i></li><li className="flex items-center text-red-500"><i className="fa fa-apple-alt" aria-hidden></i></li><li className="flex items-center text-orange-500"><i className="fa fa-carrot" aria-hidden></i></li><li className="flex items-center text-yellow-500"><i className="fa fa-cheese-swiss" aria-hidden></i></li><li className="flex items-center text-blue-500"><i className="fa fa-fish" aria-hidden></i></li><li className="flex items-center text-red-700"><i className="fa fa-steak" aria-hidden></i></li></ul><button className="bg-gray-400 text-gray-700 w-6 h-6 ml-6 rounded"><i className="fa fa-caret-down" aria-hidden></i></button></div></div>
					<div className="border rounded mb-6"><div className="flex text-gray-700 p-3 items-center"><h3 className="flex-grow">Publix #459</h3><ul className="flex space-x-3"><li className="flex items-center text-brown"><i className="fa fa-wheat" aria-hidden></i></li><li className="flex items-center text-red-500"><i className="fa fa-apple-alt" aria-hidden></i></li><li className="flex items-center text-orange-500"><i className="fa fa-carrot" aria-hidden></i></li><li className="flex items-center text-yellow-500"><i className="fa fa-cheese-swiss" aria-hidden></i></li><li className="flex items-center text-blue-500"><i className="fa fa-fish" aria-hidden></i></li><li className="flex items-center text-red-700"><i className="fa fa-steak" aria-hidden></i></li></ul><button className="bg-gray-400 text-gray-700 w-6 h-6 ml-6 rounded"><i className="fa fa-caret-down" aria-hidden></i></button></div></div>
					{/* End Test Rows */}
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
