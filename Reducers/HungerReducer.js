
export default function (state = {
    lastFed: null,
    timesFedToday: null,
    hungerStars: null,
    didMisfeed: null,
    checkTimeSince: checkTimeSince

}, action) {


    switch (action.type) {

        case ("FEED_PET"):
            return { ...state, ...action.value }

        case ("SET_HUNGER_INFO"):
            return { ...action.value, checkTimeSince: checkTimeSince }

        default:
            return state
    }
}

const daysSince = (date1, date2) => (Math.ceil(Math.abs(date1 - date2) / (1000 * 60 * 60 * 24)));
const hoursSince = (date1, date2) => (Math.abs(date1 - date2) / 1000 / 60 / 60);
const checkTimeSince = (lastFed, curTime) => (hoursSince(curTime, lastFed) >= 8);


