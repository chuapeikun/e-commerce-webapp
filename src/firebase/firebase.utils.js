import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDY91tQy8idYlEJ3gXg7iwLLLQ_rleHaB4",
  authDomain: "e-commerce-webapp-edc06.firebaseapp.com",
  databaseURL: "https://e-commerce-webapp-edc06.firebaseio.com",
  projectId: "e-commerce-webapp-edc06",
  storageBucket: "e-commerce-webapp-edc06.appspot.com",
  messagingSenderId: "386745828342",
  appId: "1:386745828342:web:0b2d0b6b5f9b03f7043dd7"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`)

  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const { displayName, email } = userAuth
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' })
export const SignInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;