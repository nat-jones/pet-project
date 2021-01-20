import { SHOP_ITEM_INFO } from '../shopItemInfo';

const defaultInventory = Object.keys(SHOP_ITEM_INFO).reduce(
  (acc, e) => {
    acc[e] = 0;
    return acc;
  }, {}
);


const InventoryReducer = (state = defaultInventory, action) => {

  let key = action.key;
  let newState = { ...state };

  switch (action.type) {

    case "ADD_ITEM":
      newState[key] += action.numAdded;
      return newState;

    case "USE_ITEM":
      newState[key] -= 1;
      return newState;

    case "SET_INVENTORY":
      return { ...state, ...action.value };

    default:
      return state;
  }
};

export default InventoryReducer;
