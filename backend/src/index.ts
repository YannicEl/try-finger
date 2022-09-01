import { setGlobalOptions } from 'firebase-functions/v2';

setGlobalOptions({ region: 'europe-west1' });

export * from './functions/chat/index.js';
export * from './functions/test/index.js';

