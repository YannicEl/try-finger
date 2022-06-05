import { RulesTestEnvironment } from '@firebase/rules-unit-testing';
import firebase from 'firebase/compat/app';

declare module 'vitest' {
	export interface TestContext {
		app: RulesTestEnvironment;
		unauthDb: firebase.firestore.Firestore;

		myUid: string;
		myChatId: string;
		myMessageId: string;
		myDb: firebase.firestore.Firestore;

		theirUid: string;
		theirChatId: string;
		theirMessageId: string;
		theirDb: firebase.firestore.Firestore;

		adminDb: firebase.firestore.Firestore;

		ourChatId: string;

		chatId: string;
		userId: string;
		messageId: string;
	}
}
