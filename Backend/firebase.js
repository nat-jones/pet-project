//@refresh reset
import * as firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";
import Store from '../store';

import { NewUserSchema } from "../FirebaseSchemas/UserSchema";

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

export const useInventory = async (inventory, itemID) => {
  let uid = Store.getState().userID;
  console.log(inventory);
  let newValue = inventory[itemID] - 1;
  let update = {};
  update[itemID] = newValue;
  await db
    .collection('Users')
    .doc(uid)
    .update(update);
}


export const purchaseInventory = async (cartCost, inventory, coins) => {

  let uid = Store.getState().userID;
  let newCoins = coins - cartCost;
  let update = { ...inventory, coins: newCoins };
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
      "lastLoved": etime,
      "loveStars": bars.love.stars
    };
  }

  if (barNames.includes("hunger")) {
    updateObject = {
      ...updateObject,
      "hunger": bars.hunger.value,
      "lastFed": etime,
      "hungerStars": bars.hunger.stars
    };
  }

  if (barNames.includes("exercise")) {
    updateObject = {
      ...updateObject,
      "exercise": bars.exercise.value,
      "lastExercised": etime,
      "exerciseStars": bars.exercise.stars
    };
  }

  if (barNames.includes("cleanliness")) {
    updateObject = {
      ...updateObject,
      "cleanliness": bars.cleanliness.value,
      "lastCleaned": etime,
      "cleanlinessStars": bars.cleanliness.stars
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

export const updateStartedShift = async (shiftEnd, shiftType) => {
  let uid = Store.getState().userID;
  let updateObject = {
    expectedShiftEnd: shiftEnd,
    lastShiftType: shiftType
  }
  await db
    .collection('Users')
    .doc(uid)
    .update(updateObject);
}

export const firebaseReduceShift = async (shiftEnd) => {
  let uid = Store.getState().userID;
  let updateObject = {
    expectedShiftEnd: shiftEnd - 1800000
  }
  await db
    .collection('Users')
    .doc(uid)
    .update(updateObject);
}


export const feedAnimalBackend = async (data) => {

  let uid = Store.getState().userID;
  let updateObject = {
    lastFed: data.lastFed,
    timesFedToday: data.timesFedToday,
    didMisfeed: data.didMisfeed
  }

  await db
    .collection('Users')
    .doc(uid)
    .update(updateObject);
}

export const refreshHungerInfoBackend = async ({ timesFedToday, hungerStars, didMisfeed }) => {
  let uid = Store.getState().userID;
  let updateObject = {
    timesFedToday: timesFedToday,
    hungerStars: hungerStars,
    didMisfeed: didMisfeed
  }
  await db
    .collection('Users')
    .doc(uid)
    .update(updateObject);
}



export const refreshExerciseInfoBackend = async ({ timesExercisedToday, didMisexercise, exerciseStars }) => {
  let uid = Store.getState().userID;
  let updateObject = {
    timesExercisedToday: timesExercisedToday,
    didMisExercise: didMisexercise,
    exerciseStars: exerciseStars,

  }
  await db
    .collection('Users')
    .doc(uid)
    .update(updateObject);
}

export const refreshCleanlinessInfoBackend = async ({ timesCleanedToday, didMisclean, cleanlinessStars }) => {
  let uid = Store.getState().userID;
  let updateObject = {
    timesCleanedToday: timesCleanedToday,
    didMisclean: didMisclean,
    cleanlinessStars: cleanlinessStars
  }
  await db
    .collection('Users')
    .doc(uid)
    .update(updateObject);
}

export const feedPetBackend = async ({ lastFed, didMisfeed, timesFedToday }) => {

  let uid = Store.getState().userID;
  let updateObject = {
    lastFed: lastFed,
    didMisfeed: didMisfeed,
    timesFedToday: timesFedToday
  }
  await db
    .collection('Users')
    .doc(uid)
    .update(updateObject);
}

export const exercisePetBackend = async ({ lastExercised, didMisexercise, timesExercisedToday }) => {

  let uid = Store.getState().userID;
  let updateObject = {
    lastExercised: lastExercised,
    timesExercisedToday: timesExercisedToday,
    didMisExercise: didMisexercise
  }

  await db
    .collection('Users')
    .doc(uid)
    .update(updateObject);
}

export const cleanPetBackend = async ({ lastCleaned, didMisclean, timesCleanedToday }) => {

  let uid = Store.getState().userID;
  let updateObject = {
    lastCleaned: lastCleaned,
    timesCleanedToday: timesCleanedToday,
    didMisclean: didMisclean
  }

  await db
    .collection('Users')
    .doc(uid)
    .update(updateObject);
}

export const checkIn = async (date) => {

  let uid = Store.getState().userID;
  let updateObject = {
    lastCheckIn: date
  }

  await db
    .collection('Users')
    .doc(uid)
    .update(updateObject);
}