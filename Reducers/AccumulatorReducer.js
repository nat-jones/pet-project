const AccumulatorReducer = (state = { "coins": null, "gems": null, "xp": null }, action) => {

    let key = action.accumulator;

    switch (action.type) {

        case ("ADD_ACCUMULATOR"):
            return { ...state, key: state.key + action.numAdded };

        case ("USE_ACCUMULATOR"):
            return { ...state, key: state.key - action.numSpent };

        case ("SET_ACCUMULATOR"):
            return { ...state, key: action.value };

        case ("SET_ALL_ACCUMULATORS"):
            return { ...action.values };

        default:
            return state;
    }
}

export default AccumulatorReducer;