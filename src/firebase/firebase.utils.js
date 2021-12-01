import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyBAqFndhvEmO-hn9jQCPgs3MagSICjG8m8",
    authDomain: "crwn-db-85df5.firebaseapp.com",
    projectId: "crwn-db-85df5",
    storageBucket: "crwn-db-85df5.appspot.com",
    messagingSenderId: "420896997136",
    appId: "1:420896997136:web:ac954cbab1ab7a8a822f95",
    measurementId: "G-46M3ETJYK3"
  };

  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app);
  const auth = getAuth();

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
      prompt: 'select_account'
  })

  const signInWithGoogle = () => signInWithPopup(auth, provider);

  
  export { signInWithGoogle, app, db, auth, provider };