import { User } from '~~/types/User';

export const useDbUser = () => {
	const db = useFirestore<User>('users');

	const updateName = async (id: string, name: string) => {
		return db.update(id, { name });
	};

	return { ...db, updateName };
};
