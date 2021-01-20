import { SHOP_ITEM_INFO } from '../shopItemInfo';


const emptyCart = Object.keys(SHOP_ITEM_INFO).reduce(
    (acc, e) => {
        acc[e] = 0
        return acc;
    }, {}
);

const ShopReducer = (state = emptyCart, action) => {

    let key = action.itemID;
    let newState = { ...state };

    switch (action.type) {

        case 'ADD_TO_CART':
            newState[key] = newState[key] + action.quantity;
            return newState;

        case 'REMOVE_QUANTITY_FROM_CART':

            newState[key] = newState[key] - action.quantity;
            return newState;

        case 'REMOVE_ITEM_FROM_CART':

            newState[key] = 0;
            return newState;

        case 'clearCart':

            return emptyCart;

        default:
            return state;
    }

}

export default ShopReducer;