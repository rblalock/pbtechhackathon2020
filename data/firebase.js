import { useState, useEffect } from 'react'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

export const firebaseConfig = {
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: process.env.FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.FIREBASE_DATABASE_URL,
	projectId: process.env.FIREBASE_PROJECT_ID,
	storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID,
	appId: process.env.FIRSEBASE_APP_ID
};

export const firebaseApp = (() => {
	if (!firebase.apps.length) {
		return firebase.initializeApp(firebaseConfig);
	}
})();

export const provider = new firebase.auth.GoogleAuthProvider();

export const login = async () => {
	try {
		firebase.auth().signInWithPopup(provider);
	} catch (error) {
		console.error(error);
		throw new Error(error);
	}
};

export const logout = () => {
	firebase.auth().signOut();
};

export const useUser = () => {
	const [user, setUser] = useState();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		try {
			firebaseApp?.auth().onAuthStateChanged((firebaseUser) => {
				setUser(firebaseUser);
				setLoading(false);
			});
		} catch (error) {
			console.warn(`Warning: ${error.message || error}`);
			setLoading(false);
			throw new Error(error);
		}
	}, []);

	return { user, loading }
};
