
const SponsorableAnimalReducer = (state = {
    id: null,
    moneyRaised: 0,
    allDogInfo: {}
}, action) => {

    switch (action.type) {

        case 'SPONSOR_ANIMAL':
            console.log(action.value)
            return { ...state, id: action.value };

        case 'SET_ALL_DOG_INFO':

            return { ...state, allDogInfo: { ...action.value } }

        default:

            return state;
    }
}

export default SponsorableAnimalReducer;