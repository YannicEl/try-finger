import { orderBy } from 'firebase/firestore';
import { defineStore } from 'pinia';
import { JoinedChats } from '@try-finger/lib';

export interface State {
	uid: string;
	joinedChats: JoinedChats[];
	currentChat: string;
}

export const useStore = defineStore('main', {
	state: (): State => {
		return {
			uid: '',
			joinedChats: [],
			currentChat: '',
		};
	},
	getters: {},
	actions: {
		loadChats() {
			const { listRef } = useDbJoinedChats(this.uid);

			return listRef(
				[orderBy('createdAt', 'desc')],
				(chats) => (this.joinedChats = chats)
			);
		},
	},
});
