
const SponsoredAnimalReducer = (state = {
    id: null,
    moneyRaised: 0,
}, action) => {

    switch (action.type) {

        case 'UPDATE_SPONSORED_ANIMAL':

            return { ...state, id: action.value };

        default:

            return state;
    }
}

export default SponsoredAnimalReducer;