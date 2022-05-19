import {
	getAuth,
	signInAnonymously,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile,
	UserCredential,
	onAuthStateChanged,
} from 'firebase/auth';

export const useAuth = () => {
	const auth = getAuth(useFirebase());

	onAuthStateChanged(auth, (user) => {
		console.log('user:', user);
	});

	const register = async (
		username: string,
		email: string,
		password: string
	): Promise<void> => {
		const { user } = await createUserWithEmailAndPassword(auth, email, password);
		await updateProfile(user, { displayName: username });
	};

	const login = async (email: string, password: string): Promise<UserCredential> => {
		const res = await signInWithEmailAndPassword(auth, email, password);
		return res;
	};

	const loginAsGuest = async (): Promise<UserCredential | null> => {
		try {
			return signInAnonymously(auth);
		} catch (err) {
			return null;
		}
	};

	return {
		loginAsGuest,
		register,
		login,
	};
};