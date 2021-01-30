//@refresh reset
import * as firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";
import Store from './store';

import { NewUserSchema } from "./FirebaseSchemas/UserSchema";

var firebaseConfig = {
  apiKey: "AIzaSyAzN1iSdoI_I1qnvyQXns1KmbLAwRrlc-8",
  authDomain: "pet-project-cbc4f.firebaseapp.com",
  databaseURL: "https://pet-project-cbc4f.firebaseio.com",
  projectId: "pet-project-cbc4f",
  storageBucket: "pet-project-cbc4f.appspot.com",
  messagingSenderId: "694234648665",
  appId: "1:694234648665:web:b4e36ea755cbb0293f2148",
  measurementId: "G-DKPJT0CR4P",
};
// Initialize Firebase
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };

export const db = firebase.firestore();

export const getUserData = async (uid) => {
  let user = await db.collection("Users").doc(uid.toString()).get();
  let userData = await user.data();
  return userData;
};

export const setNewUserData = async (uid) => {
  await db
    .collection('Users')
    .doc(uid)
    .set(NewUserSchema)
    .then(() => {
      return { status: "success" }
    })
    .catch((error) => {
      return {
        status: "error",
        code: error.code
      }
    });
}

export const loginWithUsernameAndPassword = (username, password) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(username.toLowerCase(), password)
    .then(() => {
      console.log("User account created & signed in!");
    })
    .catch((error) => {
      console.log(error.code);
      if (error.code === "auth/email-already-in-use") {
        console.log("in use");
      }

      if (error.code === "auth/invalid-email") {
        console.log("invalid");
      } else {
        console.log(error);
      }
    });
};

export const createNewAccountWithUsernameAndPassword = async (username, password, setErrorMsg) => {
  await firebase
    .auth()
    .createUserWithEmailAndPassword(username.toLowerCase(), password)
    .then(() => {
      return { status: "success" }
    })
    .catch((error) => {
      if (error.code === "auth/email-already-in-use") {
        setErrorMsg("That email address is already in use!");
      }

      if (error.code === "auth/invalid-email") {
        setErrorMsg("That email address is invalid!");
      }

      return { status: "error", code: "error.code" };
    });
};

export const updateInventory = async () => {

  let uid = Store.getState().userID;
  let inventory = Store.getState().inventory;
  await db
    .collection('Users')
    .doc(uid)
    .update(inventory);
}

export const purchaseInventory = async (cartCost) => {

  let uid = Store.getState().userID;
  let inventory = Store.getState().inventory;
  let coins = Store.getState().accumulators.coins;

  let newCoins = coins - cartCost;
  let update = { ...inventory, coins: coins };
  await db
    .collection('Users')
    .doc(uid)
    .update(update);
}

export const updateBars = async (barNames, etime) => {

  let uid = Store.getState().userID;
  let bars = Store.getState().bars;
  let updateObject = {};

  if (barNames.includes("love")) {

    updateObject = {
      ...updateObject,
      "love": bars.love.value,
      "lastLoved": etime
    };
  }

  if (barNames.includes("hunger")) {
    updateObject = {
      ...updateObject,
      "hunger": bars.hunger.value,
      "lastFed": etime
    };
  }

  if (barNames.includes("exercise")) {
    updateObject = {
      ...updateObject,
      "exercise": bars.exercise.value,
      "lastWalked": etime
    };
  }

  if (barNames.includes("cleanliness")) {
    updateObject = {
      ...updateObject,
      "cleanliness": bars.cleanliness.value,
      "lastCleaned": etime
    }
  }

  await db
    .collection('Users')
    .doc(uid)
    .update(updateObject);

}

export const updateSponsoredAnimal = async (animalID) => {

  let uid = Store.getState().userID;
  let updateObject = {
    sponsoredAnimalID: animalID
  }
  await db
    .collection('Users')
    .doc(uid)
    .update(updateObject);
}

export const updateStartedShift = async (shiftStart, shiftType) => {
  let uid = Store.getState().userID;
  let updateObject = {
    lastShiftStart: shiftStart,
    lastShiftType: shiftType
  }
  console.log(updateObject);
  await db
    .collection('Users')
    .doc(uid)
    .update(updateObject);
}
