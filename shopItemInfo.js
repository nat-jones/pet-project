import { enableScroll } from './Actions/DragActions';
import { addToBar } from './Actions/BarActions';
import { useItem } from './Actions/InventoryActions';
import { updateBars } from './firebase';

export const SHOP_ITEM_INFO = {
    puppyFood: {
        id: 'puppyFood',
        price: 200,
        imageSrc: require('./assets/puppyDogFood.png'),
        displayString: 'Puppy Food',
        onUse: async function (dispatch) {
            let date = new Date();
            let etime = date.getTime();
            console.log(etime);
            dispatch(enableScroll());
            await dispatch(useItem('puppyFood'));
            await dispatch(addToBar("hunger", 25, etime));
            await dispatch(addToBar("love", 10, etime));
            await updateBars(["love", 'hunger'], etime);
        }

    },
    dogFood: {
        id: 'dogFood',
        price: 150,
        imageSrc: require('./assets/dogFood.png'),
        displayString: 'Dog Food',
        onUse: async (dispatch) => {
            let date = new Date();
            let etime = date.getTime();
            dispatch(enableScroll());
            await dispatch(useItem('dogFood'));
            await dispatch(addToBar("hunger", 25, etime));
            await dispatch(addToBar("love", 10, etime));
            await updateBars(["love", 'hunger'], etime);
        }
    },
    adultFood: {
        id: 'adultFood',
        price: 250,
        imageSrc: require('./assets/adultDogFood.png'),
        displayString: 'Adult Dog Food',
        onUse: async (dispatch) => {
            let date = new Date();
            let etime = date.getTime();
            dispatch(enableScroll());
            await dispatch(useItem('adultDogFood'));
            await dispatch(addToBar("hunger", 25, etime));
            await dispatch(addToBar("love", 10, etime));
            await updateBars(["love", 'hunger'], etime);
        }
    },
    rubberBall: {
        id: 'rubberBall',
        price: 200,
        imageSrc: require('./assets/rubberBall.png'),
        displayString: 'Rubber Balls',
        onUse: async (dispatch) => {
            dispatch(enableScroll());
            await dispatch(useItem('rubberBall'));
            await dispatch(addToBar("hunger", 25));
            await dispatch(addToBar("love", 10));
            await updateBars(["love", 'hunger']);
        }
    },
    rawhideBone: {
        id: 'rawhideBone',
        price: 300,
        imageSrc: require('./assets/dogBone.png'),
        displayString: 'Rawhide Bones',
        onUse: async (dispatch) => {
            dispatch(enableScroll());
            await dispatch(useItem('rawhideBone'));
            await dispatch(addToBar("hunger", 25));
            await dispatch(addToBar("love", 10));
            await updateBars(["love", 'hunger']);
        }
    },
    plushToy: {
        id: 'plushToy',
        price: 100,
        imageSrc: require('./assets/dogPlushToy.png'),
        displayString: 'Plush Toys',
        onUse: async (dispatch) => {
            dispatch(enableScroll());
            await dispatch(useItem('plushToy'));
            await dispatch(addToBar("hunger", 25));
            await dispatch(addToBar("love", 10));
            await updateBars(["love", 'hunger']);
        }
    },
    apple: {
        id: 'apple',
        price: 50,
        imageSrc: require('./assets/apple.png'),
        displayString: 'Apple Slices',
        onUse: async (dispatch) => {
            dispatch(enableScroll());
            await dispatch(useItem('apple'));
            await dispatch(addToBar("hunger", 25));
            await dispatch(addToBar("love", 10));
            await updateBars(["love", 'hunger']);
        }
    },
    milkBone: {
        id: 'milkBone',
        price: 60,
        imageSrc: require('./assets/dogTreatMilkBone.png'),
        displayString: 'Dog Treats',
        onUse: async (dispatch) => {
            dispatch(enableScroll());
            await dispatch(useItem('milkBone'));
            await dispatch(addToBar("hunger", 25));
            await dispatch(addToBar("love", 10));
            await updateBars(["love", 'hunger']);
        }
    },
    peanutButter: {
        id: 'peanutButter',
        price: 200,
        imageSrc: require('./assets/peanutButter.png'),
        displayString: 'Peanut Butter',
        onUse: async (dispatch) => {
            dispatch(enableScroll());
            await dispatch(useItem('peanutButter'));
            await dispatch(addToBar("hunger", 25));
            await dispatch(addToBar("love", 10));
            await updateBars(["love", 'hunger']);
        }
    },
    pill: {
        id: 'pill',
        price: 1000,
        imageSrc: require('./assets/dogPills.png'),
        displayString: 'Pills',
        onUse: async (dispatch) => {
            dispatch(enableScroll());
            await dispatch(useItem('pill'));
            await dispatch(addToBar("hunger", 25));
            await dispatch(addToBar("love", 10));
            await updateBars(["love", 'hunger']);
        }
    },
    ointment: {
        id: 'ointment',
        price: 700,
        imageSrc: require('./assets/dogOintment.png'),
        displayString: 'Ointment',
        onUse: async (dispatch) => {
            dispatch(enableScroll());
            await dispatch(useItem('ointment'));
            await dispatch(addToBar("hunger", 25));
            await dispatch(addToBar("love", 10));
            await updateBars(["love", 'hunger']);
        }
    }
}

export const SHELF_ORDER = [
    ['puppyFood', 'dogFood', 'adultFood'],
    ['rubberBall', 'rawhideBone', 'plushToy'],
    ['apple', 'milkBone', 'peanutButter'],
    ['pill', 'ointment']
]
