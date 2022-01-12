import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref } from 'firebase/database';

const firebaseConfig = {
	apiKey: 'AIzaSyCjcjfT3XNMrvLIHO3tQ-ii0rplQUAESa4',
	authDomain: 'quick-react-76d3b.firebaseapp.com',
	databaseURL: 'https://quick-react-76d3b-default-rtdb.firebaseio.com',
	projectId: 'quick-react-76d3b',
	storageBucket: 'quick-react-76d3b.appspot.com',
	messagingSenderId: '954903701154',
	appId: '1:954903701154:web:5db755fabe664b465919fb',
	measurementId: 'G-ZC1PQJ5RNT',
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

ref(database);
ref(database, '/');
ref(database, '/courses');

export const useData = (path, transform) => {
	const [data, setData] = useState();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState();

	useEffect(() => {
		const dbRef = ref(database, path);
		const devMode =
			!process.env.NODE_ENV || process.env.NODE_ENV === 'development';
		if (devMode) {
			console.log(`loading ${path}`);
		}
		return onValue(
			dbRef,
			(snapshot) => {
				const val = snapshot.val();
				if (devMode) {
					console.log(val);
				}
				setData(transform ? transform(val) : val);
				setLoading(false);
				setError(null);
			},
			(error) => {
				setData(null);
				setLoading(false);
				setError(error);
			}
		);
	}, [path, transform]);

	return [data, loading, error];
};
