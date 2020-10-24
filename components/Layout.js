import React from 'react';
import Head from 'next/head';
import { useRouter } from "next/router";
import { RoomServiceProvider } from "@roomservice/react";
import { useUser, login, logout } from '../data/firebase';

const Layout = (props) => {
	// todo - user should look up any extra data about the company, etc.
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

			<div className="h-screen flex overflow-hidden bg-gray-100">
				{/* SIDEBAR */}
				<div className="flex-shrink-0 h-screen bg-gray-300 w-64">
					<div>Sidebar goes here</div>
					{user ? (
						<button onClick={handleLogout} className="bg-blue-500 p-3 rounded-lg font-bold text-blue-900 w-32 h-12">
							Logout
						</button>
					) : (
						<div onClick={handleLogin} className="bg-blue-500 p-3 rounded-lg font-bold text-blue-900 w-32 h-12">
							<i className="fab fa-google mr-3"></i>
							Login
						</div>
					)}
				</div>

				{/* CONTENT AREA */}
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
							<div>Loading...</div>
						) : (
							<div>
								Please login
							</div>
						)
					}
				</div>
			</div>
		</>
	);
};

export default Layout;
