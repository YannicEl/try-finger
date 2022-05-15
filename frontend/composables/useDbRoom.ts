import { Room } from '~~/types/Room';

export const useDbRoom = () => {
	const db = useFirestore<Room>('rooms');

	return { ...db };
};
