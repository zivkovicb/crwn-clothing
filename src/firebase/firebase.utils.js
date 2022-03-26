import { initializeApp } from 'firebase/app';
import { 
  getFirestore,
  setDoc,
  doc,
  getDoc,
  collection,
  getDocs,
  writeBatch,
  addDoc //ocigledno ne treba 
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

//INITIALIZINF FIREBASE CONFIG 
const app = initializeApp(firebaseConfig);

  //INITIALISING FIREBASE DATABASE
  const db = getFirestore();
  const auth = getAuth();

  //USER PROFILE
  const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = doc(db, `users/${userAuth.uid}`);
    const collectionRef = collection(db, 'users');

    const snapShot = await getDoc(userRef);
    const collectionSnapshot = await getDocs(collectionRef);
    console.log({ collection: collectionSnapshot.docs.map(doc => doc.data()) });

    if(!snapShot) {
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

  const batch = writeBatch(db);
  objectsToAdd.forEach(obj => {
    const newDocRef = doc(collectionRef);
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject)
  });
};

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: 'select_account'
})

const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

export { signInWithGoogle, app, db, auth, createUserProfileDocument };