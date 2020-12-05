//@refresh reset
import * as firebase from 'firebase';
import "@firebase/auth";
import "@firebase/firestore";

import { NewUserSchema } from "./FirebaseSchemas/UserSchema"


var firebaseConfig = {
    apiKey: "AIzaSyAzN1iSdoI_I1qnvyQXns1KmbLAwRrlc-8",
    authDomain: "pet-project-cbc4f.firebaseapp.com",
    databaseURL: "https://pet-project-cbc4f.firebaseio.com",
    projectId: "pet-project-cbc4f",
    storageBucket: "pet-project-cbc4f.appspot.com",
    messagingSenderId: "694234648665",
    appId: "1:694234648665:web:b4e36ea755cbb0293f2148",
    measurementId: "G-DKPJT0CR4P"
};
// Initialize Firebase
if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };

export const db = firebase.firestore();

export const getUserData = async (uid) => {
    let user = await db.collection('Users').doc(uid.toString()).get();
    let userData = await user.data();
    return userData;
}


export const loginWithUsernameAndPassword = (username, password) => {

    firebase.auth()
        .signInWithEmailAndPassword(username.toLowerCase(), password)
        .then(() => {
            console.log('User account created & signed in!');
        })
        .catch(error => {
            console.log(error.code);
            if (error.code === 'auth/email-already-in-use') {
                console.log("in use");
            }

            if (error.code === 'auth/invalid-email') {
                console.log("invalid");
            }

            else { console.log(error) }
        })
}

export const createNewAccountWithUsernameAndPassword = (username, password) => {
    firebase.auth()
        .createUserWithEmailAndPassword(username.toLowerCase(), password)
        .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
                console.log('That email address is already in use!');
            }

            if (error.code === 'auth/invalid-email') {
                console.log('That email address is invalid!');
            }

            console.log(error);
        })
}
