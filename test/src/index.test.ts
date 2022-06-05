import { beforeEach, describe, it } from 'vitest';
import {
	initializeTestEnvironment,
	assertFails,
	assertSucceeds,
} from '@firebase/rules-unit-testing';
import { addDoc, deleteDoc, getDoc, getDocs, setDoc, setupTestData, updateDoc } from './helpers';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Terminology
 * my = POV of logged in user
 * their = Any other user that is not "my"
 */

beforeEach(async (ctx) => {
	const app = await initializeTestEnvironment({
		projectId: process.env.FIREBASE_PROJECT_ID,
		firestore: { host: 'localhost', port: 8080 },
	});

	ctx.app = app;

	ctx.unauthDb = app.unauthenticatedContext().firestore();

	ctx.myUid = 'myUid';

	// Chat members: [myUid]
	ctx.myChatId = 'myChatId';

	// message in chats/{myChatId}/messages
	ctx.myMessageId = 'myMessageId';
	ctx.myDb = app.authenticatedContext(ctx.myUid).firestore();

	ctx.theirUid = 'theirUid';

	// Chat members: [theirUid]
	ctx.theirChatId = 'theirChatId';

	// message in chats/{theirChatId}/messages
	ctx.theirMessageId = 'theirMessageId';
	ctx.theirDb = app.authenticatedContext(ctx.theirUid).firestore();

	// Chat members: [myUid, theirUid]
	ctx.ourChatId = 'ourChatId';

	// Random chat
	ctx.chatId = 'chatId';

	// Random user
	ctx.userId = 'userId';

	// Random message
	ctx.messageId = 'messageId';

	// clear DB before every test
	app.clearFirestore();
});

describe('Collection: users/', () => {
	describe('unauth user', () => {
		it('cannot get', async ({ unauthDb, theirUid }) => {
			await assertFails(getDoc(unauthDb, `users/${theirUid}`));
		});

		it('cannot list', async ({ unauthDb }) => {
			await assertFails(getDocs(unauthDb, `users`));
		});

		it('cannot create', async ({ unauthDb }) => {
			await assertFails(addDoc(unauthDb, `users`));
		});

		it('cannot update', async ({ unauthDb, theirUid }) => {
			await assertFails(updateDoc(unauthDb, `users/${theirUid}`));
		});

		it('cannot delete', async ({ unauthDb, theirUid }) => {
			await assertFails(deleteDoc(unauthDb, `users/${theirUid}`));
		});
	});

	describe('auth user', () => {
		it('can get my document', async ({ myDb, myUid }) => {
			await assertSucceeds(getDoc(myDb, `users/${myUid}`));
		});

		it('cannot get their document', async ({ myDb, theirUid }) => {
			await assertFails(getDoc(myDb, `users/${theirUid}`));
		});

		it('cannot list', async ({ myDb }) => {
			await assertFails(getDocs(myDb, `users`));
		});

		it('can create my document with allowed fields', async ({ myDb, myUid }) => {
			await assertSucceeds(setDoc(myDb, `users/${myUid}`, { name: 'name' }));
		});

		it('cannot create my document with forbidden fields', async ({ myDb, myUid }) => {
			await assertFails(setDoc(myDb, `users/${myUid}`, { forbidden: 'forbidden' }));
		});

		it('cannot create their document', async ({ myDb, theirUid }) => {
			await assertFails(setDoc(myDb, `users/${theirUid}`));
		});

		it('cannot update my or their document', async ({ myDb, myUid, theirUid }) => {
			await assertFails(updateDoc(myDb, `users/${myUid}`));
			await assertFails(updateDoc(myDb, `users/${theirUid}`));
		});

		it('cannot delete my or their document', async ({ myDb, myUid, theirUid }) => {
			await assertFails(deleteDoc(myDb, `users/${myUid}`));
			await assertFails(deleteDoc(myDb, `users/${theirUid}`));
		});
	});
});

describe('Collection: users/{userId}/joinedChats/', () => {
	describe('unauth user', () => {
		it('cannot get', async ({ unauthDb, userId, chatId }) => {
			await assertFails(getDoc(unauthDb, `users/${userId}/joinedChats/${chatId}`));
		});

		it('cannot list', async ({ unauthDb, userId }) => {
			await assertFails(getDocs(unauthDb, `users/${userId}/joinedChats`));
		});

		it('cannot create', async ({ unauthDb, userId }) => {
			await assertFails(addDoc(unauthDb, `users/${userId}/joinedChats`));
		});

		it('cannot update', async ({ unauthDb, userId, chatId }) => {
			await assertFails(updateDoc(unauthDb, `users/${userId}/joinedChats/${chatId}`));
		});

		it('cannot delete', async ({ unauthDb, userId, chatId }) => {
			await assertFails(deleteDoc(unauthDb, `users/${userId}/joinedChats/${chatId}`));
		});
	});

	describe('auth user', () => {
		it('cannot get my or their document', async ({ myDb, myUid, theirUid, chatId }) => {
			await assertFails(getDoc(myDb, `users/${myUid}/joinedChats/${chatId}`));
			await assertFails(getDoc(myDb, `users/${theirUid}/joinedChats/${chatId}`));
		});

		it('can list my documents', async ({ myDb, myUid }) => {
			await assertSucceeds(getDocs(myDb, `users/${myUid}/joinedChats`));
		});

		it('cannot list their documents', async ({ myDb, theirUid }) => {
			await assertFails(getDocs(myDb, `users/${theirUid}/joinedChats`));
		});

		it('can create my document with required field', async ({ myDb, myUid }) => {
			await assertSucceeds(addDoc(myDb, `users/${myUid}/joinedChats`, { name: 'name' }));
		});

		it('cannot create my document with forbidden field', async ({ myDb, myUid }) => {
			await assertFails(addDoc(myDb, `users/${myUid}/joinedChats`));
			await assertFails(addDoc(myDb, `users/${myUid}/joinedChats`, { forbidden: 'forbidden' }));
		});

		it('cannot create their document', async ({ myDb, theirUid }) => {
			await assertFails(addDoc(myDb, `users/${theirUid}/joinedChats`, { name: 'name' }));
		});

		it('cannot update my or their document', async ({ myDb, myUid, theirUid, chatId }) => {
			await assertFails(updateDoc(myDb, `users/${myUid}/joinedChats/${chatId}`));
			await assertFails(updateDoc(myDb, `users/${theirUid}/joinedChats/${chatId}`));
		});

		it('cannot delete my or their document', async ({ myDb, myUid, theirUid, chatId }) => {
			await assertFails(deleteDoc(myDb, `users/${myUid}/joinedChats/${chatId}`));
			await assertFails(deleteDoc(myDb, `users/${theirUid}/joinedChats/${chatId}`));
		});
	});
});

describe('Collection: chats/', () => {
	describe('unauth user', () => {
		it('cannot get', async ({ unauthDb, chatId }) => {
			await assertFails(getDoc(unauthDb, `chats/${chatId}`));
		});

		it('cannot list', async ({ unauthDb }) => {
			await assertFails(getDocs(unauthDb, `chats`));
		});

		it('cannot create', async ({ unauthDb }) => {
			await assertFails(addDoc(unauthDb, `chats`));
		});

		it('cannot update', async ({ unauthDb, chatId }) => {
			await assertFails(updateDoc(unauthDb, `chats/${chatId}`));
		});

		it('cannot delete', async ({ unauthDb, chatId }) => {
			await assertFails(deleteDoc(unauthDb, `chats/${chatId}`));
		});
	});

	describe('auth user', () => {
		it('can get chats where I am a member', async (ctx) => {
			const { myDb, myChatId, ourChatId } = ctx;
			await setupTestData(ctx);

			await assertSucceeds(getDoc(myDb, `chats/${myChatId}`));
      console.log("2 ----------")
			await assertSucceeds(getDoc(myDb, `chats/${ourChatId}`));
		});

		it('cannot get chats where I am not a member', async (ctx) => {
			const { myDb, theirChatId } = ctx;
			await setupTestData(ctx);

			await assertFails(getDoc(myDb, `chats/${theirChatId}`));
		});

		it('cannot list', async ({ myDb }) => {
			await assertFails(getDocs(myDb, `chats`));
		});

		it('can create document with required field', async ({ myDb, myUid, myChatId }) => {
			await assertSucceeds(
				setDoc(myDb, `chats/${myChatId}`, {
					name: 'myChat',
					creator: myUid,
					admins: [myUid],
					members: [myUid],
				})
			);
		});

		it('cannot create document with forbidden fields', async ({
			myDb,
			myUid,
			myChatId,
			theirUid,
		}) => {
			// missing field: "creator"
			await assertFails(
				setDoc(myDb, `chats/${myChatId}`, {
					name: 'myChat',
					admins: [myUid],
					members: [myUid],
				})
			);

			// field "creator" !== "myUid"
			await assertFails(
				setDoc(myDb, `chats/${myChatId}`, {
					name: 'myChat',
					creator: theirUid,
					admins: [myUid],
					members: [myUid],
				})
			);

			// missing field: "admins"
			await assertFails(
				setDoc(myDb, `chats/${myChatId}`, {
					name: 'myChat',
					creator: myUid,
					members: [myUid],
				})
			);

			// field "admins" does not contain "myUid"
			await assertFails(
				setDoc(myDb, `chats/${myChatId}`, {
					name: 'myChat',
					creator: myUid,
					admins: [],
					members: [myUid],
				})
			);

			// missing field: "members"
			await assertFails(
				setDoc(myDb, `chats/${myChatId}`, {
					name: 'myChat',
					creator: myUid,
					admins: [myUid],
				})
			);

			// field "members" does not contain "myUid"
			await assertFails(
				setDoc(myDb, `chats/${myChatId}`, {
					name: 'myChat',
					creator: myUid,
					admins: [myUid],
					members: [],
				})
			);

			// extra fields are not allowed
			await assertFails(
				setDoc(myDb, `chats/${myChatId}`, {
					name: 'myChat',
					creator: myUid,
					admins: [myUid],
					members: [myUid],
					forbidden: 'forbidden',
				})
			);
		});

		it('cannot update', async (ctx) => {
			const { myDb, myChatId, theirChatId, chatId } = ctx;
			await setupTestData(ctx);

			await assertFails(updateDoc(myDb, `chats/${myChatId}`));
			await assertFails(updateDoc(myDb, `chats/${theirChatId}`));
			await assertFails(updateDoc(myDb, `chats/${chatId}`));
		});

		it('cannot delete', async (ctx) => {
			const { myDb, myChatId, theirChatId, chatId } = ctx;
			await setupTestData(ctx);

			await assertFails(deleteDoc(myDb, `chats/${myChatId}`));
			await assertFails(deleteDoc(myDb, `chats/${theirChatId}`));
			await assertFails(deleteDoc(myDb, `chats/${chatId}`));
		});
	});
});

describe('Collection: chats/{chatId}/messages/', () => {
	describe('unauth user', () => {
		it('cannot get', async ({ unauthDb, chatId, messageId }) => {
			await assertFails(getDoc(unauthDb, `chats/${chatId}/messages/${messageId}`));
		});

		it('cannot list', async ({ unauthDb, chatId }) => {
			await assertFails(getDocs(unauthDb, `chats/${chatId}/messages`));
		});

		it('cannot create', async ({ unauthDb, chatId }) => {
			await assertFails(addDoc(unauthDb, `chats/${chatId}/messages`));
		});

		it('cannot update', async ({ unauthDb, chatId, messageId }) => {
			await assertFails(updateDoc(unauthDb, `chats/${chatId}/messages/${messageId}`));
		});

		it('cannot delete', async ({ unauthDb, chatId, messageId }) => {
			await assertFails(deleteDoc(unauthDb, `chats/${chatId}/messages/${messageId}`));
		});
	});

	describe('auth user', () => {
		it('cannot get', async (ctx) => {
			const { myDb, myChatId, myMessageId, theirChatId, theirMessageId, ourChatId } = ctx;
			await setupTestData(ctx);

			await assertFails(getDoc(myDb, `chats/${myChatId}/messages/${myMessageId}`));
			await assertFails(getDoc(myDb, `chats/${theirChatId}/messages/${theirMessageId}`));
			await assertFails(getDoc(myDb, `chats/${ourChatId}/messages/${myMessageId}`));
		});

		it('can list messages of chats where I am a member', async (ctx) => {
			const { myDb, myChatId, ourChatId } = ctx;
			await setupTestData(ctx);

			await assertSucceeds(getDocs(myDb, `chats/${myChatId}/messages`));
			await assertSucceeds(getDocs(myDb, `chats/${ourChatId}/messages`));
		});

		it('cannot list messages of chats where I am not a member', async (ctx) => {
			const { myDb, theirChatId } = ctx;
			await setupTestData(ctx);

			await assertFails(getDocs(myDb, `chats/${theirChatId}/messages`));
		});

		it('can create document if I am member of the chat', async (ctx) => {
			const { myDb, myUid, myChatId, ourChatId } = ctx;
			await setupTestData(ctx);

			await assertSucceeds(
				addDoc(myDb, `chats/${myChatId}/messages`, {
					sender: myUid,
					message: 'message',
				})
			);

			await assertSucceeds(
				addDoc(myDb, `chats/${ourChatId}/messages`, {
					sender: myUid,
					message: 'message',
				})
			);
		});

		it('cannot create document with forbidden fields', async (ctx) => {
			const { myDb, myUid, myChatId, theirUid } = ctx;
			await setupTestData(ctx);

			// missing field "sender"
			await assertFails(
				addDoc(myDb, `chats/${myChatId}/messages`, {
					message: 'message',
				})
			);

			// field "sender" !== "myUid"
			await assertFails(
				addDoc(myDb, `chats/${myChatId}/messages`, {
					sender: theirUid,
					message: 'message',
				})
			);

			// missing field "message"
			await assertFails(
				addDoc(myDb, `chats/${myChatId}/messages`, {
					sender: myUid,
				})
			);

			// extra fields are not allowed
			await assertFails(
				addDoc(myDb, `chats/${myChatId}/messages`, {
					sender: myUid,
					message: 'message',
					forbidden: 'forbidden',
				})
			);
		});

		it('cannot create document in chats where I am not a member', async (ctx) => {
			const { myDb, myUid, theirChatId, chatId } = ctx;
			await setupTestData(ctx);

			await assertFails(
				addDoc(myDb, `chats/${theirChatId}/messages`, {
					sender: myUid,
					message: 'message',
				})
			);

			await assertFails(
				addDoc(myDb, `chats/${chatId}/messages`, {
					sender: myUid,
					message: 'message',
				})
			);
		});

		it('can delete own messages', async (ctx) => {
			const { myDb, myChatId, myMessageId, ourChatId } = ctx;
			await setupTestData(ctx);

			await assertSucceeds(deleteDoc(myDb, `chats/${myChatId}/messages/${myMessageId}`));
			await assertSucceeds(deleteDoc(myDb, `chats/${ourChatId}/messages/${myMessageId}`));
		});

		it('cannot delete their messages', async (ctx) => {
			const { myDb, theirChatId, ourChatId, theirMessageId } = ctx;
			await setupTestData(ctx);

			await assertFails(deleteDoc(myDb, `chats/${theirChatId}/messages/${theirMessageId}`));
			await assertFails(deleteDoc(myDb, `chats/${ourChatId}/messages/${theirMessageId}`));
		});

		it('can update own messages', async (ctx) => {
			const { myDb, myChatId, myMessageId, ourChatId } = ctx;
			await setupTestData(ctx);

			await assertSucceeds(
				updateDoc(myDb, `chats/${myChatId}/messages/${myMessageId}`, { message: 'message' })
			);
			await assertSucceeds(
				updateDoc(myDb, `chats/${ourChatId}/messages/${myMessageId}`, { message: 'message' })
			);
		});

		it('cannot update own messages with forbidden fields', async (ctx) => {
			const { myDb, myChatId, myMessageId, ourChatId, theirUid } = ctx;
			await setupTestData(ctx);

			await assertFails(
				updateDoc(myDb, `chats/${myChatId}/messages/${myMessageId}`, { sender: theirUid })
			);
			await assertFails(
				updateDoc(myDb, `chats/${ourChatId}/messages/${myMessageId}`, { forbidden: 'forbidden' })
			);
		});

		it('cannot update their messages', async (ctx) => {
			const { myDb, ourChatId, theirChatId, theirMessageId } = ctx;
			await setupTestData(ctx);

			await assertFails(
				updateDoc(myDb, `chats/${theirChatId}/messages/${theirMessageId}`, { message: 'message' })
			);
			await assertFails(
				updateDoc(myDb, `chats/${ourChatId}/messages/${theirMessageId}`, { message: 'message' })
			);
		});
	});
});
