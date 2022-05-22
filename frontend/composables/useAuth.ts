import {
	getAuth,
	signInAnonymously,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile,
	UserCredential,
	onAuthStateChanged,
	Unsubscribe,
	User,
} from 'firebase/auth';

let authStateSub: Unsubscribe;

export const useAuth = () => {
	const auth = getAuth(useFirebase());

	if (!authStateSub) {
		authStateSub = onAuthStateChanged(auth, async (user) => {
			console.log('user:', user);
		});
	}

	const register = async (
		username: string,
		email: string,
		password: string
	): Promise<void> => {
		const { user } = await createUserWithEmailAndPassword(auth, email, password);
		await updateProfile(user, { displayName: username });
	};

	const login = async (email: string, password: string): Promise<UserCredential> => {
		return signInWithEmailAndPassword(auth, email, password);
	};

	const logout = async (): Promise<void> => {
		await auth.signOut();
		navigateTo('/login');
	};

	const loginAsGuest = async (): Promise<UserCredential | null> => {
		try {
			return signInAnonymously(auth);
		} catch (err) {
			return null;
		}
	};

	const getCurrentUser = async (): Promise<User | null> => {
		return new Promise((resolve) => {
			const unsubscribe = onAuthStateChanged(auth, (user) => {
				unsubscribe();
				resolve(user);
			});
		});
	};

	return {
		auth,
		loginAsGuest,
		register,
		login,
		logout,
		getCurrentUser,
	};
};
