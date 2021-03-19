import { enableScroll } from './Actions/DragActions';
import { addToBar } from './Actions/BarActions';
import { useItem } from './Actions/InventoryActions';
import { updateBars } from './Backend/firebase';
import {
    reduxAndFirebaseFeedPet,
    reduxAndFirebaseExercisePet,
    reduxAndFirebaseCleanPet
} from './ReduxBackendWrappers';
import Store from './store';

const onFoodUse = async (dispatch, quality, itemId) => {
    let hungerInfo = Store.getState().hunger;
    let date = new Date();
    let etime = date.getTime();

    dispatch(enableScroll());
    await dispatch(useItem(itemId));
    await reduxAndFirebaseFeedPet(dispatch, { ...hungerInfo, time: etime })
}

const onExerciseUse = async (dispatch, quality, itemId) => {
    let exerciseInfo = Store.getState().exercise;
    let date = new Date();
    let etime = date.getTime();

    dispatch(enableScroll());
    await dispatch(useItem(itemId));
    await reduxAndFirebaseExercisePet(dispatch, { ...exerciseInfo, time: etime })
}

const onCleanerUse = async (dispatch, quality, itemId) => {
    let cleanlinessInfo = Store.getState().cleanliness;
    let date = new Date();
    let etime = date.getTime();

    dispatch(enableScroll());
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
    rubberBall: {
        id: 'rubberBall',
        price: 200,
        imageSrc: require('./assets/rubberBall.png'),
        displayString: 'Rubber Balls',
        onUse: async (dispatch) => {
            await onExerciseUse(dispatch, 1, 'rubberBall')
        }
    },
    rawhideBone: {
        id: 'rawhideBone',
        price: 300,
        imageSrc: require('./assets/dogBone.png'),
        displayString: 'Rawhide Bones',
        onUse: async (dispatch) => {
            await onExerciseUse(dispatch, 1, 'rahideBone')
        }
    },
    plushToy: {
        id: 'plushToy',
        price: 100,
        imageSrc: require('./assets/dogPlushToy.png'),
        displayString: 'Plush Toys',
        onUse: async (dispatch) => {
            await onExerciseUse(dispatch, 1, 'plushToy')
        }
    },
    apple: {
        id: 'apple',
        price: 50,
        imageSrc: require('./assets/apple.png'),
        displayString: 'Apple Slices',
        onUse: async (dispatch) => {
            await onCleanerUse(dispatch, 1, 'apple')
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
            await dispatch(addToBar("hunger", 5, etime));
            await dispatch(addToBar("love", 10, etime));
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
            await dispatch(addToBar("hunger", 5, etime));
            await dispatch(addToBar("love", 10, etime));
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
            await dispatch(addToBar("hunger", 25, etime));
            await dispatch(addToBar("love", 10, etime));
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
            await dispatch(addToBar("hunger", 25, etime));
            await dispatch(addToBar("love", 10, etime));
            await updateBars(["love", 'hunger'], etime);
        }
    },
    sierraShampoo: {
        id: 'sierraShampoo',
        price: 500,
        imageSrc: require('./assets/sierraShampoo.png'),
        displayString: "Sierra's Shampoo",
        onUse: async (dispatch) => {
            let date = new Date();
            let etime = date.getTime();
            dispatch(enableScroll());
            await reduxAndFirebaseCleanPet(dispatch, 1, 'sierraShampoo');
        }
    }
}

export const SHELF_ORDER = [
    ['discountFood', 'felixFeast', 'oscarOrganic'],
    ['rubberBall', 'rawhideBone', 'plushToy'],
    ['apple', 'milkBone', 'peanutButter'],
    ['sierraShampoo', 'antibidogics', 'ointment']
]
