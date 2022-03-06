import { initializeApp } from 'firebase/app';
import { 
  getFirestore,
  setDoc,
  doc,
  getDoc,
  collection,
  getDocs,
  writeBatch
} from 'firebase/firestore';
import { 
  GoogleAuthProvider, 
  getAuth, 
  signInWithPopup 
} from 'firebase/auth';


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

    const userRef = doc(db, `users/${userAuth.uid}`);
    const collectionRef = collection(db, 'users');

    const snapShot = await getDoc(userRef);
    const collectionSnapshot = await getDocs(collectionRef);
    console.log({ collection: collectionSnapshot.docs.map(doc => doc.data()) });

    if(!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await setDoc(userRef, {
          displayName,
          email,
          createdAt,
          ...additionalData}
          )
        } catch (error) {
          console.log('error creating in user', error.message);
        }
    }   

    return userRef;
  };

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);
  console.log(collectionRef);

  const batch = writeBatch(db);
  objectsToAdd.forEach(obj => {
    const newDocRef = doc(collectionRef);
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
} 

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account'
})

const signInWithGoogle = () => signInWithPopup(auth, provider);


export { signInWithGoogle, app, db, auth, provider, createUserProfileDocument };