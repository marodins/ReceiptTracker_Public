import {initializeApp} from 'firebase/app';

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.SENDER_ID,
    appId: process.env.APP_ID
}

const fireb = initializeApp(firebaseConfig);
const storage = getStorage(fireb);
module.exports = {
    fireb:fireb,
    storage:storage
}