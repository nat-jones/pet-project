
export default function (state = {
    lastExercised: null,
    timesExercisedToday: null,
    exerciseStars: null,
    didMisexercise: null,
    checkTimeSince: checkTimeSince
}, action) {


    switch (action.type) {

        case ("EXERCISE_PET"):
            return { ...state, ...action.value }

        case ("SET_EXERCISE_INFO"):
            return { ...action.value, checkTimeSince: checkTimeSince }


        default:
            return state
    }
}

const daysSince = (date1, date2) => (Math.ceil(Math.abs(date1 - date2) / (1000 * 60 * 60 * 24)));
const hoursSince = (date1, date2) => (Math.abs(date1 - date2) / 1000 / 60 / 60);
const checkTimeSince = (lastExercised, curTime) => (hoursSince(curTime, lastExercised) >= 2);


