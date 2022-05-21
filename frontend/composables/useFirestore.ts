import {
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
	QueryDocumentSnapshot,
	WithFieldValue,
	FirestoreDataConverter,
	DocumentData,
	updateDoc,
	UpdateData,
} from 'firebase/firestore';
import { Ref } from 'vue';
import { BaseDoc } from '~~/types/BaseDoc';

export type Collections =
	| 'chats'
	| 'users'
	| `${string}/messages`
	| `${string}/joinedChats`;

export const useFirestore = <T extends BaseDoc>(path: Collections) => {
	const converter: FirestoreDataConverter<T> = {
		toFirestore: (e: WithFieldValue<T>): DocumentData => e,
		fromFirestore: (snapshot: QueryDocumentSnapshot<DocumentData>): T => {
			const { createdAt, updatedAt, ...rest } = snapshot.data({
				serverTimestamps: 'estimate',
			});

			return {
				id: snapshot.id,
				createdAt: createdAt.toDate(),
				updatedAt: updatedAt.toDate(),
				...rest,
			} as T;
		},
	};

	const db = getFirestore(useFirebase());
	const collection = _collection(db, path).withConverter(converter);

	const add = (
		body: Partial<Omit<T, 'id' | 'createdAt' | 'updatedAt'>>
	): Promise<DocumentReference<T>> => {
		return addDoc<T>(collection, {
			...body,
			createdAt: serverTimestamp(),
			updatedAt: serverTimestamp(),
		} as WithFieldValue<T>);
	};

	const update = (
		id: string,
		body: Partial<Omit<T, 'id' | 'createdAt' | 'updatedAt'>>
	): Promise<void> => {
		return updateDoc<T>(doc(collection, id), {
			...body,
			updatedAt: serverTimestamp(),
		} as UpdateData<T>);
	};

	const get = async (id: string): Promise<T | undefined> => {
		return getDoc(doc(collection, id)).then((e) => e?.data());
	};

	const getRef = (id: string): Ref<T | undefined> => {
		const docData = ref<T>();
		onSnapshot(doc(collection, id), (doc) => {
			docData.value = doc?.data();
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

	return { add, update, get, getRef, list, listRef };
};
