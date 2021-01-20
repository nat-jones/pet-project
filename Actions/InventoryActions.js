export const addItem = (key, numAdded) => {
  return {
    type: "ADD_FOOD",
    key: key,
    numAdded: numAdded,
  };
};

export const decrementItem = (key) => {
  return {
    type: "USE_FOOD",
    key: key,
  };
};

export const setInventory = (key) => {
  return {
    type: 'SET_INVENTORY',
  }
}
