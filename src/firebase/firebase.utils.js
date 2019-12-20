import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    
        apiKey: "AIzaSyAQRo84zUyVg5bM6vSJUACuau5M-CPt9r4",
        authDomain: "react-ecommerce-project-54556.firebaseapp.com",
        databaseURL: "https://react-ecommerce-project-54556.firebaseio.com",
        projectId: "react-ecommerce-project-54556",
        storageBucket: "react-ecommerce-project-54556.appspot.com",
        messagingSenderId: "18054413578",
        appId: "1:18054413578:web:57eedfde6e8c67ae3a0ef3",
        measurementId: "G-3LV2Z6XTTJ"
      
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
        if (!userAuth) return;

        const userRef = firestore.doc(`users/${userAuth.uid}`);

        const snapShot = await userRef.get();

        if(!snapShot.exists) {
            const { displayName, email } = userAuth;
            const createdAt = new Date();
            
            try {
                await userRef.set({
                        displayName,
                        email,
                        createdAt,
                        ...additionalData
                })
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
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;