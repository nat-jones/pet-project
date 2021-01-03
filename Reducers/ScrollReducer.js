
const ScrollReducer = (state = true, action) => {

    switch (action.type) {

        case 'ENABLE_SCROLL':

            return true;

        case 'DISABLE_SCROLL':

            return false;

        default:

            return state
    }
};

export default ScrollReducer;