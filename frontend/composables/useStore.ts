import { defineStore } from 'pinia';

export interface JoinedChats {
	id: string;
	name: string;
	lastMsg: string;
}

export interface State {
	chats: JoinedChats[];
	uid: string | null;
}

export const useStore = defineStore('main', {
	state: (): State => {
		return {
			chats: [],
			uid: null,
		};
	},
	getters: {},
	actions: {
		addItem() {},
	},
});
