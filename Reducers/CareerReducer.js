const CareerReducer = (state = { career: null, lastShiftStart: null, lastShiftType: null }, action) => {

    newState = { ...state };
    switch (action.type) {

        case 'SET_CAREER':

            newState.career = { ...action.value }

            return newState;

        case 'START_SHIFT':

            return { ...state, lastShiftStart: action.lastShiftStart, lastShiftType: action.lastShiftType };

        case 'SET_ALL_CAREER_INFO':
            return { ...action.value }

        default:

            return state;
    }
}

export default CareerReducer;