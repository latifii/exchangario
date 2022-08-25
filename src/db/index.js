// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBxKgW_aSmi82ptkhbn9RuTv3hrB5jzmrE',
  authDomain: 'exchangario-59857.firebaseapp.com',
  projectId: 'exchangario-59857',
  storageBucket: 'exchangario-59857.appspot.com',
  messagingSenderId: '738584049571',
  appId: '1:738584049571:web:d2c36d1f0b9401ec968c16',
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
