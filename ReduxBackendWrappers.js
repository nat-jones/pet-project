import { setHungerInfo, feedPet } from './Actions/HungerActions';
import { setExerciseInfo, exercisePet } from './Actions/ExerciseActions';
import { setCleanlinessInfo, cleanPet } from './Actions/CleanlinessActions';
import {
    refreshHungerInfoBackend,
    refreshExerciseInfoBackend,
    refreshCleanlinessInfoBackend,
    feedPetBackend,
    exercisePetBackend,
    cleanPetBackend
} from './Backend/firebase';


export const reduxAndFirebaseSetHunger = async (dispatch,
    {
        lastFed,
        timesFedToday,
        hungerStars,
        lastCheckIn,
        didMisfeed,
        time }) => {
    let ds = daysSince(time, lastCheckIn);
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
    let ds = daysSince(time, lastCheckIn)
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
    let ds = daysSince(time, lastCheckIn)
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

const daysSince = (date1, date2) => (Math.ceil(Math.abs(date1 - date2) / (1000 * 60 * 60 * 24)));
const hoursSince = (date1, date2) => (Math.abs(date1 - date2) / 1000 / 60 / 60);
const checkDaysSince = (lastCared, curTime, threshold) => (daysSince(lastCared, curTime) >= threshold);
const checkHoursSince = (lastCared, curTime, threshold) => (hoursSince(curTime, lastCared) >= threshold);
