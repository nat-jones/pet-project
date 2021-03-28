import { enableScroll } from './Actions/DragActions';
import { useItem } from './Actions/InventoryActions';
import { learn } from './Actions/TrainingActions';
import { updateBars, useInventory } from './Backend/firebase';
import {
    reduxAndFirebaseFeedPet,
    reduxAndFirebaseExercisePet,
    reduxAndFirebaseCleanPet,
    reduxAndFirebaseLearn
} from './ReduxBackendWrappers';
import Store from './store';

const onFoodUse = async (dispatch, quality, itemId) => {
    let hungerInfo = Store.getState().hunger;
    let inventory = Store.getState().inventory
    let date = new Date();
    let etime = date.getTime();

    dispatch(enableScroll());
    await useInventory(inventory, itemId);
    await dispatch(useItem(itemId));
    await reduxAndFirebaseFeedPet(dispatch, { ...hungerInfo, time: etime })
}

const onExerciseUse = async (dispatch, quality, itemId) => {
    let exerciseInfo = Store.getState().exercise;
    let inventory = Store.getState().inventory
    let date = new Date();
    let etime = date.getTime();

    dispatch(enableScroll());
    await useInventory(inventory, itemId);
    await dispatch(useItem(itemId));
    await reduxAndFirebaseExercisePet(dispatch, { ...exerciseInfo, time: etime })
}

const onCleanerUse = async (dispatch, quality, itemId) => {
    let cleanlinessInfo = Store.getState().cleanliness;
    let inventory = Store.getState().inventory
    let date = new Date();
    let etime = date.getTime();

    dispatch(enableScroll());
    await useInventory(inventory, itemId);
    await dispatch(useItem(itemId));
    await reduxAndFirebaseCleanPet(dispatch, { ...cleanlinessInfo, time: etime })
}

export const SHOP_ITEM_INFO = {
    discountFood: {
        id: 'discountFood',
        price: 50,
        imageSrc: require('./assets/discountFood.png'),
        displayString: 'Discount Food',
        onUse: async function (dispatch) {
            await onFoodUse(dispatch, 1, 'discountFood');
        }

    },
    felixFeast: {
        id: 'felixFeast',
        price: 100,
        imageSrc: require('./assets/felixFeast.png'),
        displayString: 'Felix Feast',
        onUse: async (dispatch) => {
            await onFoodUse(dispatch, 1, 'felixFeast');
        }
    },
    oscarOrganic: {
        id: 'oscarOrganic',
        price: 300,
        imageSrc: require('./assets/oscarOrganic.png'),
        displayString: "Oscar's Organic",
        onUse: async (dispatch) => {
            await onFoodUse(dispatch, 1, 'oscarOrganic');
        }
    },
    ricosRubber: {
        id: 'ricosRubber',
        price: 25,
        imageSrc: require('./assets/ricosRubber.png'),
        displayString: "Rico's Rubber Bones",
        onUse: async (dispatch) => {
            await onExerciseUse(dispatch, 1, 'ricosRubber')
        }
    },
    dozersDisc: {
        id: 'dozersDisc',
        price: 50,
        imageSrc: require('./assets/dozersDisc.png'),
        displayString: "Dozer's Discs",
        onUse: async (dispatch) => {
            await onExerciseUse(dispatch, 1, 'dozersDisc')
        }
    },
    whiskerAway: {
        id: 'whiskerAway',
        price: 100,
        imageSrc: require('./assets/whiskerAway.png'),
        displayString: 'Whisker Away Dog Walkers',
        onUse: async (dispatch) => {
            await onExerciseUse(dispatch, 1, 'whiskerAway')
        }
    },
    apple: {
        id: 'apple',
        price: 50,
        imageSrc: require('./assets/apple.png'),
        displayString: 'Apple Slices',
        onUse: async (dispatch, trainingData, command, attempt, outcome) => {
            reduxAndFirebaseLearn(dispatch, trainingData, command, attempt, outcome);

        }
    },
    milkBone: {
        id: 'milkBone',
        price: 60,
        imageSrc: require('./assets/dogTreatMilkBone.png'),
        displayString: 'Dog Treats',
        onUse: async (dispatch) => {
            let date = new Date();
            let etime = date.getTime();
            dispatch(enableScroll());
            await dispatch(useItem('milkBone'));
            await updateBars(["love", 'hunger'], etime);
        }
    },
    peanutButter: {
        id: 'peanutButter',
        price: 200,
        imageSrc: require('./assets/peanutButter.png'),
        displayString: 'Peanut Butter',
        onUse: async (dispatch) => {
            let date = new Date();
            let etime = date.getTime();
            dispatch(enableScroll());
            await dispatch(useItem('peanutButter'));
            await updateBars(["love", 'hunger'], etime);
        }
    },
    antibidogics: {
        id: 'antibidogics',
        price: 1000,
        imageSrc: require('./assets/antibidogics.png'),
        displayString: 'Pills',
        onUse: async (dispatch) => {
            let date = new Date();
            let etime = date.getTime();
            dispatch(enableScroll());
            await dispatch(useItem('pill'));
            await updateBars(["love", 'hunger'], etime);
        }
    },
    ointment: {
        id: 'ointment',
        price: 700,
        imageSrc: require('./assets/dogOintment.png'),
        displayString: 'Ointment',
        onUse: async (dispatch) => {
            let date = new Date();
            let etime = date.getTime();
            dispatch(enableScroll());
            await dispatch(useItem('ointment'));
            await updateBars(["love", 'hunger'], etime);
        }
    },
    sierrasShampoo: {
        id: 'sierrasShampoo',
        price: 500,
        imageSrc: require('./assets/sierrasShampoo.png'),
        displayString: "Sierra's Shampoo",
        onUse: async (dispatch) => {
            let date = new Date();
            let etime = date.getTime();
            dispatch(enableScroll());
            await onCleanerUse(dispatch, 1, 'sierrasShampoo');
        }
    },
    poochPerfume: {
        id: 'poochPerfume',
        price: 100,
        imageSrc: require('./assets/poochPerfume.png'),
        displayString: "Pooch Perfume",
        onUse: async (dispatch) => {
            let date = new Date();
            let etime = date.getTime();
            dispatch(enableScroll());
            await onCleanerUse(dispatch, 1, 'poochPerfume');
        }
    },
    bowWow: {
        id: 'bowWow',
        price: 300,
        imageSrc: require('./assets/bowWow.png'),
        displayString: "Bow WOW! Brush",
        onUse: async (dispatch) => {
            let date = new Date();
            let etime = date.getTime();
            dispatch(enableScroll());
            await onCleanerUse(dispatch, 1, 'bowWow');
        }
    }
}

export const SHELF_ORDER = [
    ['discountFood', 'felixFeast', 'oscarOrganic'],
    ['ricosRubber', 'dozersDisc', 'whiskerAway'],
    ['apple', 'milkBone', 'peanutButter'],
    ['poochPerfume', 'bowWow', 'sierrasShampoo'],
    ['antibidogics']
]
