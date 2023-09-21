export default function CleanlinessReducer(
  state = {
    cleanlinessStars: null,
    lastCleaned: null,
    didMisclean: null,
    timesCleanedToday: null,
    checkTimeSince: checkTimeSince,
  },
  action
) {
  switch (action.type) {
    case 'CLEAN_PET':
      return { ...state, ...action.value };

    case 'SET_CLEANLINESS_INFO':
      return { ...action.value, checkTimeSince: checkTimeSince };

    default:
      return state;
  }
}
const hoursSince = (date1, date2) => Math.abs(date1 - date2) / 1000 / 60 / 60;
const checkTimeSince = (lastFed, curTime) => hoursSince(curTime, lastFed) >= 12;
