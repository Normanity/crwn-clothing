import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDVu5ecruX9qcjeP_72nAWYpXkZZNSyVQg",
    authDomain: "crwn-db-ee4b8.firebaseapp.com",
    databaseURL: "https://crwn-db-ee4b8.firebaseio.com",
    projectId: "crwn-db-ee4b8",
    storageBucket: "crwn-db-ee4b8.appspot.com",
    messagingSenderId: "956826550660",
    appId: "1:956826550660:web:00093533ee16d548d81dd1",
    measurementId: "G-KZLCSPKBS5"
};
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createAt = new Date();
 
    try {
      await userRef.set({
        displayName,
        email,
        createAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
 

  }
  return userRef; // <---- You're missing this!
};

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account'});

  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;