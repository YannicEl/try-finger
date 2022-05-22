import { defineStore } from 'pinia';

export interface State {
	uid: string;
}

export const useStore = defineStore('main', {
	state: (): State => {
		return {
			uid: '',
		};
	},
	getters: {},
	actions: {
		addItem() {},
	},
});
