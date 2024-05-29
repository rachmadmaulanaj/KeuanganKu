import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyA62RTCY87enwEycMSO3H1g0qD-HVFSg2o',
    authDomain: 'keuanganku-54e4b.firebaseapp.com',
    projectId: 'keuanganku-54e4b',
    storageBucket: 'keuanganku-54e4b.appspot.com',
    messagingSenderId: '645099184755',
    appId: '1:645099184755:web:6573a02386f6a22832c006'
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);