
const DragReducer = (state = { scrollEnabled: true, dragItem: null, pan: null, location: {} }, action) => {

    switch (action.type) {

        case 'ENABLE_SCROLL':

            return { ...state, scrollEnabled: true };

        case 'DISABLE_SCROLL':

            return { ...state, scrollEnabled: false };

        case 'SET_DRAG_ITEM':

            return { scrollEnabled: false, dragItem: action.item, pan: action.pan, location: action.location }

        case 'CLEAR_DRAG_ITEM':

            return { scrollEnabled: true, dragItem: null, pan: null, location: {} }

        default:

            return state
    }
};

export default DragReducer;