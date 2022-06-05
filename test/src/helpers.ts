import {
	collection,
	doc,
	query,
	getDoc as _getDoc,
	getDocs as _getDocs,
	setDoc as _setDoc,
	addDoc as _addDoc,
	updateDoc as _updateDoc,
	deleteDoc as _deleteDoc,
} from 'firebase/firestore';

import firebase from 'firebase/compat/app';
import { TestContext } from 'vitest';

type Firestore = firebase.firestore.Firestore;

export const getDoc = async (db: Firestore, path: string) => {
	return _getDoc(doc(db, path));
};

export const getDocs = async (db: Firestore, path: string) => {
	return _getDocs(query(collection(db, path)));
};

export const setDoc = async (db: Firestore, path: string, data: any = {}) => {
	return _setDoc(doc(db, path), data);
};

export const addDoc = async (db: Firestore, path: string, data: any = {}) => {
	return _addDoc(collection(db, path), data);
};

export const updateDoc = async (db: Firestore, path: string, data: any = {}) => {
	return _updateDoc(doc(db, path), data);
};

export const deleteDoc = async (db: Firestore, path: string) => {
	return _deleteDoc(doc(db, path));
};

export const setupTestData = async ({
	app,
	myUid,
	myChatId,
	myMessageId,
	theirUid,
	theirChatId,
	theirMessageId,
	ourChatId,
	userId,
}: TestContext) => {
	await app.withSecurityRulesDisabled(async (ctx) => {
		const adminDb = ctx.firestore();

		await setDoc(adminDb, `chats/${myChatId}`, {
			name: 'myChat',
			creator: myUid,
			admins: [myUid],
			members: [myUid],
		});

		await setDoc(adminDb, `chats/${myChatId}/messages/${myMessageId}`, {
			sender: myUid,
			message: 'message',
		});

		await setDoc(adminDb, `chats/${theirChatId}`, {
			name: 'theirChat',
			creator: theirUid,
			admins: [theirUid],
			members: [theirUid],
		});

		await setDoc(adminDb, `chats/${myChatId}/messages/${theirMessageId}`, {
			sender: theirUid,
			message: 'message',
		});

		await setDoc(adminDb, `chats/${ourChatId}`, {
			name: 'ourChat',
			creator: userId,
			admins: [userId],
			members: [myUid, theirUid],
		});

		await setDoc(adminDb, `chats/${ourChatId}/messages/${theirMessageId}`, {
			sender: theirUid,
			message: 'message',
		});

		await setDoc(adminDb, `chats/${ourChatId}/messages/${myMessageId}`, {
			sender: myUid,
			message: 'message',
		});
	});
};
