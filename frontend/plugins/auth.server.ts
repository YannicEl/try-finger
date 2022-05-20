export default defineNuxtPlugin((nuxtApp) => {
	const idToken = useCookie('idToken');

	console.log(idToken.value);
});
