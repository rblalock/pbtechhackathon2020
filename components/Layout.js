import React from 'react';
import Head from 'next/head';
import { useRouter } from "next/router";
import { RoomServiceProvider } from "@roomservice/react";
import { useUser, login, logout } from '../data/firebase';

const Layout = (props) => {
	const { user, loading } = useUser();
	// todo - user should look up any extra data about the company, etc.
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
				<div className="flex flex-shrink-0">
					Sidebar goes here
					{user && (
						<div onClick={handleLogout}>Log out button here</div>
					)}
				</div>

				{/* CONTENT AREA */}
				<div className="flex flex-col w-0 flex-1 overflow-hidden">
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
							<>Loading...</>
						) : (
							<div onClick={handleLogin}>Login form here</div>
						)
					}
				</div>
			</div>
		</>
	);
};

export default Layout;
