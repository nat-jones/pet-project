export const addItem = (key, numAdded) => {
  return {
    type: "ADD_ITEM",
    key: key,
    numAdded: numAdded,
  };
};

export const useItem = (key) => {
  return {
    type: "USE_ITEM",
    key: key,
  };
};

export const setInventory = (value) => {
  return {
    type: 'SET_INVENTORY',
    value: value
  }
}

export const addCartload = (cartload) => {

  return {
    type: "ADD_CARTLOAD",
    value: { ...cartload }
  }
};
