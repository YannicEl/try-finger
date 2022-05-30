import { orderBy } from 'firebase/firestore';
import { defineStore } from 'pinia';
import { Chat, JoinedChats, Message } from '@try-finger/lib';

export interface State {
	uid: string;
	joinedChats: JoinedChats[];
	currentChat: string;
	chats: { [k: string]: Chat & { messages: Message[] } };
}

export const useStore = defineStore('main', {
	state: (): State => {
		return {
			uid: '',
			joinedChats: [],
			currentChat: '',
			chats: {},
		};
	},
	getters: {
		getChat: (state) => {
			return state.chats[state.currentChat];
		},
	},
	actions: {
		loadChats() {
			const { listRef } = useDbJoinedChats(this.uid);

			return listRef([orderBy('createdAt', 'desc')], (chats) => {
				this.joinedChats = chats;

				chats.forEach(async ({ id: chatId }) => {
					useDbChat().getRef(chatId, (chat) => {
						if (!chat) return;

						useDbMessage(chatId).listRef([orderBy('createdAt')], (messages) => {
							this.chats[chatId] = { ...chat, messages };
						});
					});
				});
			});
		},
	},
});
