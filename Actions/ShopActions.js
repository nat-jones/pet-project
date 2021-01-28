
export const addToCart = (itemID, quantity) => {

    return {
        type: 'ADD_TO_CART',
        itemID: itemID,
        quantity: quantity
    }
}

export const removeQuantityFromCart = (itemID, quantity) => {

    return {
        type: 'REMOVE_QUANTITY_FROM_CART',
        itemID: itemID,
        quantity: quantity
    }
}

export const clearCart = () => {

    return {
        type: 'CLEAR_CART'
    }
}

export const removeItemFromCart = (itemID) => {

    return {
        type: 'REMOVE_ITEM_FROM_CART',
        itemID: itemID
    }
}