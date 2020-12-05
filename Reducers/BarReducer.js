
const BarReducer = (state = {
    love: null,
    cleanliness: null,
    hunger: null,
    exercise: null
}, action) => {

    let newState = { ...state };
    switch (action.type) {
        case ("SET_BAR"):
            let category = action.category;

            newState[category] = action.value;
            return newState;

        case ("SET_ALL_BARS"):
            return action.values;

        case ("ADD_TO_BAR"):

            newState[action.category] = newState[action.category] + action.value > 100 ?
                100 :
                newState[action.category] + action.value;
            return newState;

        default:
            return state;
    }
};

export default BarReducer;