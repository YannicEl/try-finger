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
import { User as UserDoc } from '@try-finger/lib';

let authStateSub: Unsubscribe;

export const useAuth = () => {
	const auth = getAuth(useFirebase());

	if (!authStateSub) {
		authStateSub = onAuthStateChanged(auth, async (user) => {
			if (user) {
				const store = useStore();
				store.uid = user.uid;
			}
		});
	}

	const register = async (
		username: string,
		email: string,
		password: string
	): Promise<void> => {
		const { user } = await createUserWithEmailAndPassword(auth, email, password);
		await updateProfile(user, { displayName: username });
		await createUserDoc(user.uid, username);
	};

	const login = async (email: string, password: string): Promise<UserCredential> => {
		return signInWithEmailAndPassword(auth, email, password);
	};

	const logout = async (): Promise<void> => {
		await auth.signOut();
		navigateTo('/login');
	};

	const loginAsGuest = async (): Promise<void> => {
		const { user } = await signInAnonymously(auth);
		await createUserDoc(user.uid);
	};

	const getCurrentUser = async (): Promise<User | null> => {
		if (auth.currentUser) return auth.currentUser;

		return new Promise((resolve) => {
			const unsubscribe = onAuthStateChanged(auth, (user) => {
				unsubscribe();
				resolve(user);
			});
		});
	};

	const createUserDoc = async (uid: string, name?: string): Promise<void> => {
		const { set } = useDbUser();

		const body: Partial<UserDoc> = {};
		if (name) body.name = name;

		await set(uid, body);
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
