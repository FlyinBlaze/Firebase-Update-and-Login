import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDg-CSkA_1538HGMYHuz3vAD-NPYTfjk3k",
  authDomain: "fir-1-1e58f.firebaseapp.com",
  projectId: "fir-1-1e58f",
  storageBucket: "fir-1-1e58f.firebasestorage.app",
  messagingSenderId: "856062327921",
  appId: "1:856062327921:web:928307084e3d9781482fd0",
  measurementId: "G-3PHVY2Z7XC"
};

  initializeApp(firebaseConfig);

  const db = getFirestore();

  export {db}