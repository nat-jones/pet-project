

const AnimalLocationReducer = (state = { bottom: null, right: null, top: null, left: null }, action) => {

    switch (action.type) {

        case 'SET_ANIMAL_LOCATION':

            return action.location;

        default:

            return state
    }
}

export default AnimalLocationReducer;