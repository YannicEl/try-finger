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
	setDoc,
	QueryConstraint,
	query,
	QueryDocumentSnapshot,
	WithFieldValue,
	FirestoreDataConverter,
	DocumentData,
	updateDoc,
	UpdateData,
	Unsubscribe,
} from 'firebase/firestore';
import { Ref } from 'vue';
import { Document, AddDoc, UpdateDoc } from '@try-finger/lib';

export type Collections =
	| 'chats'
	| 'users'
	| `${string}/messages`
	| `${string}/joinedChats`;

export const useFirestore = <T extends Document>(path: Collections) => {
	const converter: FirestoreDataConverter<T> = {
		toFirestore: (e: WithFieldValue<T>): DocumentData => {
			const { id, parentCol, parentDoc, updatedAt, createdAt, ...rest } = e as any;

			return {
				...rest,
				createdAt: createdAt ? createdAt : serverTimestamp(),
				updatedAt: serverTimestamp(),
			};
		},
		fromFirestore: (snapshot: QueryDocumentSnapshot<DocumentData>): T => {
			const { createdAt, updatedAt, ...rest } = snapshot.data({
				serverTimestamps: 'estimate',
			});

			return {
				id: snapshot.id,
				parentCol: snapshot.ref.parent?.parent?.parent?.id,
				parentDoc: snapshot.ref.parent?.parent?.id,
				createdAt: createdAt.toDate(),
				updatedAt: updatedAt.toDate(),
				...rest,
			} as T;
		},
	};

	const db = getFirestore(useFirebase());
	const collection = _collection(db, path).withConverter(converter);
	const listeners: Unsubscribe[] = [];

	const add = (body: AddDoc<T>): Promise<DocumentReference<T>> => {
		return addDoc<T>(collection, body as T);
	};

	const set = (id: string, body: AddDoc<T>): Promise<void> => {
		return setDoc<T>(doc(collection, id), body as T);
	};

	const update = (id: string, body: UpdateDoc<T>): Promise<void> => {
		return updateDoc<T>(doc(collection, id), body as UpdateData<T>);
	};

	const get = async (id: string): Promise<T | undefined> => {
		return getDoc(doc(collection, id)).then((e) => e?.data());
	};

	const getRef = (
		id: string,
		callback: (doc: T | undefined) => void = () => {}
	): Ref<T | undefined> => {
		const docData = ref<T>();
		const listener = onSnapshot(doc(collection, id), (doc) => {
			const data = doc?.data();
			docData.value = data;
			callback(data);
		});
		listeners.push(listener);

		return docData;
	};

	const list = (constraints: QueryConstraint[] = []): Promise<T[]> => {
		const q = query(collection, ...constraints);
		return getDocs(q).then((e) => e.docs.map((e) => e.data()));
	};

	const listRef = (
		constraints: QueryConstraint[] = [],
		callback: (docs: T[]) => void = () => {}
	): Ref<T[]> => {
		const collectionData = ref([]) as Ref<T[]>;
		const q = query(collection, ...constraints);
		const listener = onSnapshot(q, (docs) => {
			const data = docs.docs.map((e) => e.data());
			collectionData.value = data;
			callback(data);
		});
		listeners.push(listener);

		return collectionData;
	};

	// remove snapshot listeners
	onUnmounted(() => {
		listeners.forEach((unsubscribe) => unsubscribe());
	});

	return { add, set, update, get, getRef, list, listRef };
};
