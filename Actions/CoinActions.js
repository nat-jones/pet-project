/*
Actions used to control XP, coins, and gems
*/

export const setCoins = (coins) => {
  return {
    type: 'SET_COINS',
    amount: coins,
  };
};

export const useCoins = (coins) => {
  return {
    type: 'USE_COINS',
    amount: coins,
  };
};

export const addCoins = (coins) => {
  return {
    type: 'ADD_COINS',
    amount: coins,
  };
};
