import { Chat } from '@try-finger/lib';
import { useFirestore } from './useFirestore.js';

export const useDbChats = () => {
	const db = useFirestore<Chat>('chats');

	return { ...db };
};
