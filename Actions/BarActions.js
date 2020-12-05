export const setBar = (category, value) => {
    return {
        type: "SET_BAR",
        category: category,
        value: value
    }
};

export const addToBar = (category, value) => {
    return {
        type: "ADD_TO_BAR",
        category: category,
        value: value
    }
}

export const setAllBars = (values) => {
    return {
        type: "SET_ALL_BARS",
        values: values
    }
}