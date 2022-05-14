import { Pinia, PiniaPlugin } from 'pinia';

const PERSIST_KEY = 'piniaState';

const getItem = (key: string) => {
	const found = localStorage.getItem(key);
	return found ? JSON.parse(found) : null;
};

const setItem = (key: string, value: Object) => {
	localStorage.setItem(key, JSON.stringify(value));
};

export default defineNuxtPlugin((nuxtApp) => {
	const pinia: Pinia = nuxtApp.$pinia;

	const restoredState = getItem(PERSIST_KEY);
	if (restoredState) {
		pinia.state.value = restoredState;
	} else {
		setItem(PERSIST_KEY, pinia.state.value);
	}

	const plugin: PiniaPlugin = ({ store, pinia }) => {
		store.$subscribe(() => {
			setItem(PERSIST_KEY, pinia.state.value);
		});
	};

	pinia.use(plugin);
});
