const CareerReducer = (state = { career: null, lastShiftStart: null, lastShiftType: null }, action) => {

    switch (action.type) {

        case 'SET_CAREER':

            return { ...state, career: action.value };

        case 'START_SHIFT':
            console.log('action');
            console.log(action);
            return { ...state, lastShiftStart: action.lastShiftStart, lastShiftType: action.lastShiftType };

        case 'SET_ALL_CAREER_INFO':

            return { ...action.value }

        default:

            return state;
    }
}

export default CareerReducer;