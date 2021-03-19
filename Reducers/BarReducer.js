import { depletionRates, calculateIdleStars } from '../BarConsts'


const BarReducer = (
  state = {
    love: {
      value: null,
      lastCared: null,
      stars: null
    },
    cleanliness: {
      value: null,
      lastCared: null,
      stars: null
    },
    hunger: {
      value: null,
      lastCared: null,
      stars: null
    },
    exercise: {
      value: null,
      lastCared: null,
      stars: null
    },
  },
  action
) => {
  let newState = {
    love: { ...state.love },
    cleanliness: { ...state.cleanliness },
    hunger: { ...state.hunger },
    exercise: { ...state.exercise }
  };

  switch (action.type) {

    case "SET_BAR":
      let category = action.category;

      newState[category] = action.value;
      return newState;

    case "SET_ALL_BARS":
      let date = new Date();
      let etime = date.getTime();

      //Prevents errors from null values
      let lastLoved = action.values.lastLoved ? action.values.lastLoved : etime;
      let lastFed = action.values.lastFed ? action.values.lastFed : etime;
      let lastCleaned = action.values.lastCleaned ? action.values.lastCleaned : etime;
      let lastExercised = action.values.lastExercised ? action.values.lastExercised : etime;



      let newValues = {
        love: {
          ...state.love,
          value: action.values.love,
          lastCared: lastLoved,
          stars: action.values.loveStars
        },
        hunger: {
          ...state.hunger,
          value: action.values.hunger,
          lastCared: lastFed,
          stars: action.values.hungerStars
        },
        exercise:
        {
          ...state.exercise,
          value: action.values.exercise,
          lastCared: lastExercised,
          stars: action.values.exerciseStars
        },
        cleanliness: {
          ...state.cleanliness,
          value: action.values.cleanliness,
          lastCared: lastCleaned,
          stars: action.values.cleanlinessStars
        }
      }

      return newValues;

    case "ADD_TO_BAR":
      let adjustedValue = calculateDepletedValue(action.category, newState[action.category], action.etime);
      let starChange = calculateIdleStars(
        newState[action.category].value,
        newState[action.category].lastCared
      )

      newState[action.category].stars += starChange;

      if (newState[action.category].stars < 0) {
        newState[action.category].stars = 0;
      }
      newState[action.category].value =
        adjustedValue + action.value > 100
          ? 100
          : adjustedValue + action.value;

      newState[action.category].lastCared = action.etime;


      return newState;


    default:
      return state;
  }
};

const calculateDepletedValue = (category, info, etime) => {
  let depletion = Math.min(depletionRates[category] * (etime - info.lastCared), info.value);
  return info.value - depletion;
}

export default BarReducer;
