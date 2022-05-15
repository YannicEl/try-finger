import { Pinia, PiniaPlugin } from 'pinia';

const PERSIST_KEY = 'piniaState';

const getItem = (key: string) => {
	const found = localStorage.getItem(key);

	// state has not peen persisted
	if (!found) return null;

	return JSON.parse(found, (key, value) => {
		const { createdAt, updatedAt } = value;

		// convert ISO date strings into Date objects
		if (createdAt) value.createdAt = new Date(createdAt);
		if (updatedAt) value.updatedAt = new Date(updatedAt);

		return value;
	});
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
