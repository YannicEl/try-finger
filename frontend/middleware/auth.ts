export default defineNuxtRouteMiddleware(async (to, from) => {
	const { getCurrentUser, auth } = useAuth();

	const user = auth.currentUser || (await getCurrentUser());

	if (!user) {
		console.log('No user logged in');
		return navigateTo('/login');
	}

	console.log(`User "${user.uid}" logged in`);
});
