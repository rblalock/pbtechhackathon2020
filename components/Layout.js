import React from 'react';
import Head from 'next/head';
import { useRouter } from "next/router";
import { RoomServiceProvider } from "@roomservice/react";
import { useUser, login, logout } from '../data/firebase';

const Layout = (props) => {
	const { user, loading } = useUser();
	const router = useRouter();

	const handleLogin = async () => {
		login();
	};

	const handleLogout = () => {
		logout();
	};

	return (
		<>
			<Head>
				<title>PB Tech Hackathon 2020</title>
			</Head>
			<div className="h-screen flex overflow-hidden bg-gray-100 font-body">
				<div className="flex flex-col items-center h-full shadow bg-gray-700 z-50">
					<a href="/" className="flex justify-center items-center w-16 h-16 p-4 bg-yellow-500 border-b border-gray-700">
						<i className="far fa-bread-loaf text-2xl text-gray-700" aria-hidden></i>
					</a>
					<ul>
						<a href="/">
							<li className="h-16 w-16 flex items-center justify-center cursor-pointer hover:bg-gray-600">
								<i className="far fa-columns text-2xl text-white" aria-hidden></i>
							</li>
						</a>
					</ul>
					{user && (
						<>
							<div className="mt-auto h-16 flex items-center w-full cursor-pointer hover:bg-gray-600">
								<a href="/account" className="flex w-16 h-16 p-4 text-white justify-center items-center">
									<i className="far fa-cog text-2xl text-white" aria-hidden></i>
								</a>
							</div>
							<div className="h-16 flex items-center w-full cursor-pointer hover:bg-gray-600">
								<a onClick={handleLogout} className="flex w-16 h-16 p-4 text-white justify-center items-center">
									<i className="far fa-sign-out text-2xl text-white" aria-hidden></i>
								</a>
							</div>
						</>
					)}
				</div>

				<div className="flex flex-col w-full">
					{user ? (
						<RoomServiceProvider
							clientParameters={{
								// NOTE: In prod we wouldn't ID the user this way, we'd check the token against Firebase, on the server side
								auth: `/api/roomservice?user=${user && user.uid}`
							}}
						>
							{props.children}
						</RoomServiceProvider>
					) :
						loading ? (
							<></>
						) : (
							<div className="flex flex-auto justify-center items-center">
								<button
									onClick={handleLogin}
									className="w-64 bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold p-4 rounded-lg focus:outline-none focus:shadow-outline"
									type="button"
								>
									<svg className="h-6 mr-4 inline-block" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg"><path d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z" fill="#4285f4"/><path d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z" fill="#34a853"/><path d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z" fill="#fbbc04"/><path d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z" fill="#ea4335"/></svg>
									Login with Google
								</button>
							</div>
						)
					}
				</div>
			</div>
		</>
	);
};

export default Layout;
