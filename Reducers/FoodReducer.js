const FoodReducer = (state = 0, action) => {
  switch (action.type) {
    case "ADD_FOOD":
      return state + action.numAdded;

    case "USE_FOOD":
      return state - 1;

    case "SET_FOOD":

      return action.value;

    default:
      return state;
  }
};

export default FoodReducer;
