import { getIdTokenResult } from 'firebase/auth';

export default defineNuxtRouteMiddleware(async (to, from) => {
	console.log('hI');

	if (process.client) {
		const app = useFirebase();
		console.log(app.name);
		const { auth } = useAuth();

		const user = auth.currentUser;
		console.log(user);

		// return navigateTo('/login');
	}

	// console.log(auth.currentUser);

	// const token = await getIdTokenResult();
	// console.log(token);
});
