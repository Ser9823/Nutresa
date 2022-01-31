import app from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyDeKLVVpRjnViMndJ8EQpd7Nn5ykZmOMUc",
  authDomain: "nutresa-31c34.firebaseapp.com",
  projectId: "nutresa-31c34",
  storageBucket: "nutresa-31c34.appspot.com",
  messagingSenderId: "638893277199",
  appId: "1:638893277199:web:192cdb88b8f0b92d80637a",
  measurementId: "G-C48ZWYHP2J"
};

app.initializeApp(firebaseConfig);

const db = app.firestore();
const auth = app.auth();


export {db, auth }