const CoinReducer = (
  state = 0,
  action
) => {
  switch (action.type) {
    case "ADD_COINS":

      return state + action.amount;

    case "USE_COINS":

      return state - action.amount;

    case "SET_COINS":

      return action.amount;

    default:

      return state;
  }
};

export default CoinReducer;
