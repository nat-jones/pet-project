import { Actions } from "react-native-router-flux";

const HUNGER_DEPLETION_MULTIPLIER = 0.0000011574; //will drop 50% in 24 hours
const CLEANLINESS_DEPLETION_MULTIPLIER = 0.0000005787; //will drop 25% in 24 hours
const EXERCISE_DEPLETION_MULTIPLIER = 0.0000011574; //will drop 50% in 24 hours
const LOVE_DEPLETION_MULTIPLIER = 0.0000011574; //will drop 50% in 24 hours

const BarReducer = (
  state = {
    love: null,
    cleanliness: null,
    hunger: null,
    exercise: null,
  },
  action
) => {
  let newState = { ...state };
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
        love: Math.max(action.values.love - (etime - lastLoved) * LOVE_DEPLETION_MULTIPLIER, 0),
        hunger: Math.max(action.values.hunger - (etime - lastFed) * HUNGER_DEPLETION_MULTIPLIER, 0),
        exercise: Math.max(action.values.exercise - (etime - lastExercised) * EXERCISE_DEPLETION_MULTIPLIER, 0),
        cleanliness: Math.max(action.values.cleanliness - (etime - lastCleaned) * CLEANLINESS_DEPLETION_MULTIPLIER, 0)
      }

      return newValues;

    case "ADD_TO_BAR":
      newState[action.category] =
        newState[action.category] + action.value > 100
          ? 100
          : newState[action.category] + action.value;
      return newState;

    default:
      return state;
  }
};

export default BarReducer;
