import Store from './store';
import { setHungerInfo, feedPet } from './Actions/HungerActions';
import { setExerciseInfo, exercisePet } from './Actions/ExerciseActions';
import { setCleanlinessInfo, cleanPet } from './Actions/CleanlinessActions';
import {
    refreshHungerInfoBackend,
    refreshExerciseInfoBackend,
    refreshCleanlinessInfoBackend,
    feedPetBackend,
    exercisePetBackend,
    cleanPetBackend,
    updateStartedShift,
    firebaseReduceShift,
    purchaseInventory
} from './Backend/firebase';
import { reduceShift, startShift } from './Actions/CareerActions';
import { addCoins, useCoins } from './Actions/CoinActions';
import { setInventory } from './Actions/InventoryActions';
import { clearCart } from './Actions/ShopActions';


export const reduxAndFirebaseSetHunger = async (dispatch,
    {
        lastFed,
        timesFedToday,
        hungerStars,
        lastCheckIn,
        didMisfeed,
        time }) => {

    let ds = xdaysSince(time, lastCheckIn);

    if (ds >= 1) {
        let hungerData = {
            timesFedToday: 0,
            didMisfeed: false
        }
        let newStars = hungerStars - 1
        if (didMisfeed || timesFedToday !== 2) {

            newStars -= ds - 1
            if (newStars < 0) { newStars = 0 }
        }
        else {
            newStars = (5 ? hungerStars > 4 : hungerStars + 1)

        }
        hungerData["hungerStars"] = newStars
        refreshHungerInfoBackend(hungerData);
        dispatch(setHungerInfo(
            {
                timesFedToday: 0,
                hungerStars: newStars,
                didMisfeed: false,
                lastFed: lastFed
            }
        ))
    }
    else {
        dispatch(setHungerInfo(
            {
                timesFedToday: timesFedToday,
                hungerStars: hungerStars,
                didMisfeed: didMisfeed,
                lastFed: lastFed
            }
        ))
    }
}

export const reduxAndFirebaseSetExercise = async (dispatch, {
    timesExercisedToday,
    lastExercised,
    exerciseStars,
    lastCheckIn,
    didMisexercise,
    time
}) => {

    let ds = xdaysSince(time, lastCheckIn);
    if (ds >= 1) {
        let exerciseData = {
            timesExercisedToday: 0,
            didMisexercise: false
        }
        let newStars = exerciseStars - 1
        if (didMisexercise || timesExercisedToday < 2) {

            newStars -= ds - 1
            if (newStars < 0) { newStars = 0 }
        }
        else {
            newStars = (5 ? exerciseStars > 4 : exerciseStars + 1)

        }
        exerciseData["exerciseStars"] = newStars;

        refreshExerciseInfoBackend(exerciseData);
        dispatch(setExerciseInfo(
            {
                timesExercisedToday: 0,
                exerciseStars: newStars,
                didMisexercise: false,
                lastExercised: lastExercised
            }
        ));
    }
    else {
        dispatch(setExerciseInfo(
            {
                timesExercisedToday: timesExercisedToday,
                exerciseStars: exerciseStars,
                didMisexercise: didMisexercise,
                lastExercised: lastExercised
            }
        ));
    }
}

export const reduxAndFirebaseSetCleanliness = async (dispatch, {
    timesCleanedToday,
    lastCleaned,
    cleanlinessStars,
    lastCheckIn,
    didMisclean,
    time
}) => {
    let ds = xdaysSince(time, lastCheckIn)
    if (ds >= 1) {
        let cleanlinessData = {
            timesCleanedToday: 0,
            didMisclean: false
        }
        let newStars = cleanlinessStars - 1
        if (didMisclean || timesCleanedToday < 1) {

            newStars -= ds - 1
            if (newStars < 0) { newStars = 0 }
        }
        else {
            newStars = (5 ? cleanlinessStars > 4 : cleanlinessStars + 1)

        }
        cleanlinessData["cleanlinessStars"] = newStars;

        refreshCleanlinessInfoBackend(cleanlinessData);
        dispatch(setCleanlinessInfo(
            {
                timesCleanedToday: 0,
                cleanlinessStars: newStars,
                didMisclean: false,
                lastCleaned: lastCleaned
            }
        ));
    }
    else {
        dispatch(setCleanlinessInfo(
            {
                timesCleanedToday: timesCleanedToday,
                cleanlinessStars: cleanlinessStars,
                didMisclean: didMisclean,
                lastCleaned: lastCleaned
            }
        ));
    }
}

export const reduxAndFirebaseFeedPet = async (dispatch,
    {
        lastFed,
        didMisfeed,
        timesFedToday,
        time
    }) => {
    let data = {
        lastFed: time,
        timesFedToday: timesFedToday + 1,
        didMisfeed: (checkHoursSince(time, lastFed, 8) ? didMisfeed : true)
    }

    feedPetBackend(data);
    dispatch(feedPet(data));

}

export const reduxAndFirebaseExercisePet = async (dispatch,
    {
        lastExercised,
        didMisexercise,
        timesExercisedToday,
        time
    }) => {
    let data = {
        lastExercised: time,
        timesExercisedToday: timesExercisedToday + 1,
        didMisexercise: (checkHoursSince(time, lastExercised, 2) ? didMisexercise : true)
    }

    exercisePetBackend(data);
    dispatch(exercisePet(data));

}

export const reduxAndFirebaseCleanPet = async (dispatch,
    {
        lastCleaned,
        didMisclean,
        timesCleanedToday,
        time
    }) => {
    let data = {
        lastCleaned: time,
        timesCleanedToday: timesCleanedToday + 1,
        didMisclean: (checkHoursSince(time, lastCleaned, 10) ? didMisclean : true)
    }

    cleanPetBackend(data);
    dispatch(cleanPet(data));

}

const daysSince = (date1, date2) => {

    return Math.floor(Math.abs(date1 - date2) / (1000 * 60 * 60 * 24))

}
const hoursSince = (date1, date2) => (Math.abs(date1 - date2) / 1000 / 60 / 60);
const checkDaysSince = (lastCared, curTime, threshold) => (daysSince(lastCared, curTime) >= threshold);
const checkHoursSince = (lastCared, curTime, threshold) => (hoursSince(curTime, lastCared) >= threshold);
const xdaysSince = (date1, date2) => {

    let days1 = Math.floor((date1.getTime() - 14400000) / 86400000);

    let days2 = Math.floor((date2.getTime() - 14400000) / 86400000);


    return Math.abs(days1 - days2);
}

export const reduxAndFirebaseStartShift = async (dispatch, shiftType) => {

    let expectedEnd = new Date();
    let hourInc = 0
    switch (shiftType) {

        case ("short"):

            hourInc = 1;
            break;

        case ("medium"):

            hourInc = 4;
            break;

        case ("long"):

            hourInc = 8;
            break;

        default:
            hourInc = 0;
    }
    expectedEnd.setHours(expectedEnd.getHours() + hourInc)
    dispatch(startShift(expectedEnd.getTime(), shiftType));
    await updateStartedShift(expectedEnd.getTime(), shiftType);
}

export const reduxAndFirebaseReduceShift = async (dispatch, expectedEnd) => {

    let thirtyMins = 1800000;

    dispatch(reduceShift());
    await firebaseReduceShift(expectedEnd);
}

export const reduxAndFirebaseAddCoins = async (dispatch, lastShiftType) => {

    let data = Store.getState()
    let coins = data.coins;
    let careerBarVals = data.career.career.barVals;
    let petBarVals = {}
    petBarVals.hunger = data.hunger.hungerStars;
    petBarVals.cleanliness = data.cleanliness.cleanlinessStars;
    petBarVals.exercise = data.exercise.exerciseStars;
    petBarVals.love = data.love.loveStars;
    petBarVals.intelligence = data.intelligence.intelligenceStars;
    let stars = Object.keys(careerBarVals).reduce(
        (acc, e) => {
            acc += petBarVals[e] < careerBarVals[e] ? petBarVals[e] : careerBarVals[e];
            return acc;
        }, 0
    )
    let payment = 0;
    switch (lastShiftType) {

        case ("short"):

            payment = 25 + 10 * stars;
            break;

        case ("medium"):

            payment = 125 + 40 * stars;
            break;

        case ("long"):

            payment = 300 + 80 * stars;
            break;
    }

    dispatch(addCoins(payment, "coins"));
}

export const reduxAndFirebasePurchaseCart = async (dispatch, inventory, shoppingCart, cartCost, coins) => {

    let newInventory = addCartload(shoppingCart, inventory);

    dispatch(setInventory(newInventory));
    dispatch(useCoins(cartCost));
    dispatch(clearCart());
    await purchaseInventory(cartCost, newInventory, coins);

}

const addCartload = (cartLoad, inventory) => {

    return Object.keys(cartLoad).reduce(
        (acc, e) => {
            acc[e] += cartLoad[e];
            return acc;
        }, inventory
    );
}