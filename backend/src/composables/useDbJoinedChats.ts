import { JoinedChats } from '@try-finger/lib';
import { useFirestore } from './useFirestore.js';

export const useDbJoinedChats = (userId: string) => {
	const db = useFirestore<JoinedChats>(`users/${userId}/joinedCHats`);

	return { ...db };
};
