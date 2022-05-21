import { JoinedChats } from '~~/types/joinedChats';

export const useDbJoinedChats = (uid: string) => {
	console.log(uid);
	const db = useFirestore<JoinedChats>(`users/${uid}/joinedChats`);

	return { ...db };
};
