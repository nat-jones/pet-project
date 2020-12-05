export const addFood = (numAdded, size) => {
    return {
        type: "ADD_FOOD",
        numAdded: numAdded
    };
};

export const decrementFood = (numUsed, size) => {
    return {
        type: "USE_FOOD"
    }
}

export const setFood = (value) => {
    return {
        type: "SET_FOOD",
        value: value
    }
}

