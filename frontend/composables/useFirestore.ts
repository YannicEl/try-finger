import {
	FirestoreDataConverter,
	getFirestore,
	addDoc,
	collection as _collection,
	DocumentReference,
	serverTimestamp,
	getDoc,
	doc,
	onSnapshot,
	getDocs,
	QueryConstraint,
	query,
} from 'firebase/firestore';
import { Ref } from 'vue';
import { Document } from '~/types/Documents';

export type Collections = 'rooms' | 'users' | `${string}/messages`;

export const useFirestore = <T extends Document>(
	path: Collections,
	converter: FirestoreDataConverter<T>
) => {
	const db = getFirestore(useFirebase());
	const collection = _collection(db, path).withConverter(converter);

	const add = (body: Partial<Omit<T, 'id'>>): Promise<DocumentReference<T>> => {
		console.log(body);

		return addDoc<T>(collection, {
			...body,
			createdAt: serverTimestamp(),
			updatedAt: serverTimestamp(),
		} as any);
	};

	const get = async (id: string): Promise<T | undefined> => {
		return getDoc(doc(collection, id)).then((e) => e.data());
	};

	const getRef = (id: string): Ref<T | undefined> => {
		const docData = ref<T>();

		onSnapshot(doc(collection, id), (doc) => {
			docData.value = doc.data();
		});
		return docData;
	};

	const list = (constraints: QueryConstraint[] = []): Promise<T[]> => {
		const q = query(collection, ...constraints);
		return getDocs(q).then((e) => e.docs.map((e) => e.data()));
	};

	const listRef = (constraints: QueryConstraint[] = []): Ref<T[]> => {
		const collectionData = ref([]) as Ref<T[]>;
		const q = query(collection, ...constraints);
		onSnapshot(q, (docs) => {
			collectionData.value = docs.docs.map((e) => e.data());
		});
		return collectionData;
	};

	return { add, get, getRef, list, listRef };
};
