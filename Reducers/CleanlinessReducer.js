export default function CleanlinessReducer(state = {
    cleanlinessStars: null,
    lastCleaned: null,
    didMisclean: null,
    timesCleanedToday: null
}, action) {

    switch (action.type) {

        case ("CLEAN_PET"):

            return { ...state, ...action.value };

        case ("SET_CLEANLINESS_INFO"):

            return action.value;

        default:
            return state;
    }
}