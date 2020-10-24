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

// We do this for weird race conditions
let fbApp;
if (typeof window !== 'undefined') {
	fbApp = firebase.initializeApp(firebaseConfig)
}
export const firebaseApp = () => {
	return fbApp;
};

export default firebase;

export const provider = new firebase.auth.GoogleAuthProvider();

export const login = async () => {
	try {
		const results = await firebase.auth().signInWithPopup(provider);

		// Add metadata if doesn't exist
		const db = firebaseApp().firestore();
		const ref = db.collection('accounts').doc(results.user.uid);
		const record = await ref.get();
		if (!record.exists) {
			await ref.set({});
		}
	} catch (error) {
		throw new Error(error);
	}
};

export const logout = () => {
	firebase.auth().signOut();
};

export const getUserInfo = async () => {
	try {
		const db = firebaseApp().firestore();
		const ref = db.collection('accounts').doc(firebase.auth().currentUser.uid);
		const record = await ref.get();
		return record.data();
	} catch (err) {
		throw new Error(err);
	}
};

export const updateUser = async (payload) => {
	if (firebase.auth().currentUser) {
		try {
			const db = firebaseApp().firestore();
			const ref = db.collection('accounts').doc(firebase.auth().currentUser.uid);
			await ref.update({
				...payload
			});
		} catch (err) {
			throw new Error(err);
		}
	}
};

export const useUser = () => {
	const [user, setUser] = useState();
	const [loading, setLoading] = useState(true);

	const fetchUser = async (user) => {
		const userInfo = await getUserInfo();
		setUser({
			...user,
			...userInfo
		});
		setLoading(false);
	};

	useEffect(() => {
		try {
			firebaseApp().auth().onAuthStateChanged((firebaseUser) => {
				if (firebase.auth().currentUser) {
					fetchUser(firebaseUser);
				} else {
					setUser(undefined);
				}
			});
		} catch (error) {
			setLoading(false);
			throw new Error(error);
		}
	}, []);

	return { user, loading, updateUser }
};
