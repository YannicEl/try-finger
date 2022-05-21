import { defineStore } from 'pinia';

export interface JoinedChats {
	id: string;
	name: string;
	lastMsg: string;
}

export interface State {
	chats: JoinedChats[];
}

export const useStore = defineStore('main', {
	state: (): State => {
		return {
			chats: [],
		};
	},
	getters: {},
	actions: {
		addItem() {},
	},
});
