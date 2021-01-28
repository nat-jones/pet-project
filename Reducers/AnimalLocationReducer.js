

const AnimalLocationReducer = (state = { bottom: null, right: null, top: null, left: null, show: true }, action) => {

    switch (action.type) {

        case 'SET_ANIMAL_LOCATION':

            return { ...state, ...action.location };

        case 'SHOW_ANIMAL':

            return { ...state, show: true }

        case 'HIDE_ANIMAL':

            return { ...state, show: false }


        default:

            return state
    }
}

export default AnimalLocationReducer;