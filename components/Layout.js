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
				<meta charSet="utf-8" />
				<meta httpEquiv="x-ua-compatible" content="ie=edge" />
				<title>PB Tech Hackathon 2020</title>
				<meta property="og:site_name" content="PB Tech Hackathon 2020" />
				<meta property="og:type" content="website" />
				<meta name="theme-color" content="#000" />
				<link rel="shortcut icon" href="/favicon.png" />
			</Head>

			<div className="h-screen flex overflow-hidden bg-gray-100 font-body">
				{/* SIDEBAR */}
				<div className="flex flex-col items-center h-full shadow bg-gray-700">
					<div className="flex justify-center w-16 h-16 p-4 bg-yellow-500">
						<svg className="w-8 text-gray-700" aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M400 32H240C107.45 32 0 103.63 0 192c0 35.35 26.86 64 60 64h4v192a32 32 0 0 0 32 32h448a32 32 0 0 0 32-32V256h4c33.14 0 60-28.65 60-64 0-88.37-107.45-160-240-160zm20 176h-52v224H112V208H60c-5.79 0-12-6.43-12-16 0-59.66 89.72-112 192-112s192 52.34 192 112c0 9.57-6.21 16-12 16z"></path></svg>
					</div>
					{user && (
						<>
							<ul>
								<li className="hover:bg-gray-600">
									<a href="/" className="flex w-16 h-16 p-4 text-white justify-center items-center">
										<svg className="w-6 text-white" aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M464 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zM232 432H54a6 6 0 0 1-6-6V112h184v320zm226 0H280V112h184v314a6 6 0 0 1-6 6z"></path></svg>
									</a>
								</li>
								<li className="hover:bg-gray-600">
									<a href="/account" className="flex w-16 h-16 p-4 text-white justify-center items-center">
										<svg className="w-6 text-white" aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M452.515 237l31.843-18.382c9.426-5.441 13.996-16.542 11.177-27.054-11.404-42.531-33.842-80.547-64.058-110.797-7.68-7.688-19.575-9.246-28.985-3.811l-31.785 18.358a196.276 196.276 0 0 0-32.899-19.02V39.541a24.016 24.016 0 0 0-17.842-23.206c-41.761-11.107-86.117-11.121-127.93-.001-10.519 2.798-17.844 12.321-17.844 23.206v36.753a196.276 196.276 0 0 0-32.899 19.02l-31.785-18.358c-9.41-5.435-21.305-3.877-28.985 3.811-30.216 30.25-52.654 68.265-64.058 110.797-2.819 10.512 1.751 21.613 11.177 27.054L59.485 237a197.715 197.715 0 0 0 0 37.999l-31.843 18.382c-9.426 5.441-13.996 16.542-11.177 27.054 11.404 42.531 33.842 80.547 64.058 110.797 7.68 7.688 19.575 9.246 28.985 3.811l31.785-18.358a196.202 196.202 0 0 0 32.899 19.019v36.753a24.016 24.016 0 0 0 17.842 23.206c41.761 11.107 86.117 11.122 127.93.001 10.519-2.798 17.844-12.321 17.844-23.206v-36.753a196.34 196.34 0 0 0 32.899-19.019l31.785 18.358c9.41 5.435 21.305 3.877 28.985-3.811 30.216-30.25 52.654-68.266 64.058-110.797 2.819-10.512-1.751-21.613-11.177-27.054L452.515 275c1.22-12.65 1.22-25.35 0-38zm-52.679 63.019l43.819 25.289a200.138 200.138 0 0 1-33.849 58.528l-43.829-25.309c-31.984 27.397-36.659 30.077-76.168 44.029v50.599a200.917 200.917 0 0 1-67.618 0v-50.599c-39.504-13.95-44.196-16.642-76.168-44.029l-43.829 25.309a200.15 200.15 0 0 1-33.849-58.528l43.819-25.289c-7.63-41.299-7.634-46.719 0-88.038l-43.819-25.289c7.85-21.229 19.31-41.049 33.849-58.529l43.829 25.309c31.984-27.397 36.66-30.078 76.168-44.029V58.845a200.917 200.917 0 0 1 67.618 0v50.599c39.504 13.95 44.196 16.642 76.168 44.029l43.829-25.309a200.143 200.143 0 0 1 33.849 58.529l-43.819 25.289c7.631 41.3 7.634 46.718 0 88.037zM256 160c-52.935 0-96 43.065-96 96s43.065 96 96 96 96-43.065 96-96-43.065-96-96-96zm0 144c-26.468 0-48-21.532-48-48 0-26.467 21.532-48 48-48s48 21.533 48 48c0 26.468-21.532 48-48 48z"></path></svg>
									</a>
								</li>
							</ul>
							<div className="mt-auto h-16 flex items-center w-full cursor-pointer hover:bg-gray-600">
								<a onClick={handleLogout} className="flex w-16 h-16 p-4 text-white justify-center items-center">
									<svg className="w-6 text-white" aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M96 64h84c6.6 0 12 5.4 12 12v24c0 6.6-5.4 12-12 12H96c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h84c6.6 0 12 5.4 12 12v24c0 6.6-5.4 12-12 12H96c-53 0-96-43-96-96V160c0-53 43-96 96-96zm231.1 19.5l-19.6 19.6c-4.8 4.8-4.7 12.5.2 17.1L420.8 230H172c-6.6 0-12 5.4-12 12v28c0 6.6 5.4 12 12 12h248.8L307.7 391.7c-4.8 4.7-4.9 12.4-.2 17.1l19.6 19.6c4.7 4.7 12.3 4.7 17 0l164.4-164c4.7-4.7 4.7-12.3 0-17l-164.4-164c-4.7-4.6-12.3-4.6-17 .1z"></path></svg>
								</a>
							</div>
						</>
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
