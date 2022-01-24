// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAkRVU0lya6RcpWr0bRYYyGGZOpCRtTuIU',
  authDomain: 'geeq-db-91067.firebaseapp.com',
  projectId: 'geeq-db-91067',
  storageBucket: 'geeq-db-91067.appspot.com',
  messagingSenderId: '373019803348',
  appId: '1:373019803348:web:b973c6562800adf34f0541',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
