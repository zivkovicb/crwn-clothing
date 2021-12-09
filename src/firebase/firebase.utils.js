import { initializeApp } from 'firebase/app';
import { getFirestore, addDoc, collection, collectionGroup} from 'firebase/firestore';
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

  //Initializing firebase config 
  const app = initializeApp(firebaseConfig);

    //Initializing firestore database
    const db = getFirestore();
    const auth = getAuth();

    //user profile
    const createUserProfileDocument = async (userAuth, additionalData) => {
        if (!userAuth) return;
        
        const usersCollection = collection(db, 'users')
        const snapShot = await collectionGroup(db, "users")

        if(!snapShot.exists) {
          const { displayName, email } = userAuth;
          const createdAt = new Date();
          const userData = {
            displayName: displayName, 
            email: email, 
            createdAt: createdAt
          }
          try {
            await addDoc(usersCollection, userData);
          } catch (error) {
            console.log('error creating user', error.message);
          }
        }
        
        return usersCollection;
    };

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
      prompt: 'select_account'
  })

  const signInWithGoogle = () => signInWithPopup(auth, provider);

  
  export { signInWithGoogle, app, db, auth, provider, createUserProfileDocument };