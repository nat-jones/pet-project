export const SHOP_ITEM_INFO = {
    puppyFood: {
        id: 'puppyFood',
        price: 200,
        imageSrc: require('./assets/puppyDogFood.png'),
        displayString: 'Puppy Food'
    },
    dogFood: {
        id: 'dogFood',
        price: 150,
        imageSrc: require('./assets/dogFood.png'),
        displayString: 'Dog Food'
    },
    adultFood: {
        id: 'adultFood',
        price: 250,
        imageSrc: require('./assets/adultDogFood.png'),
        displayString: 'Adult Dog Food'
    },
    rubberBall: {
        id: 'rubberBall',
        price: 200,
        imageSrc: require('./assets/rubberBall.png'),
        displayString: 'Rubber Balls'
    },
    rawhideBone: {
        id: 'rawhideBone',
        price: 300,
        imageSrc: require('./assets/dogBone.png'),
        displayString: 'Rawhide Bones'
    },
    plushToy: {
        id: 'plushToy',
        price: 100,
        imageSrc: require('./assets/dogPlushToy.png'),
        displayString: 'Plush Toys'
    },
    apple: {
        id: 'apple',
        price: 50,
        imageSrc: require('./assets/apple.png'),
        displayString: 'Apple Slices'
    },
    milkBone: {
        id: 'milkBone',
        price: 60,
        imageSrc: require('./assets/dogTreatMilkBone.png'),
        displayString: 'Dog Treats'
    },
    peanutButter: {
        id: 'peanutButter',
        price: 200,
        imageSrc: require('./assets/peanutButter.png'),
        displayString: 'Peanut Butter'
    },
    pill: {
        id: 'pill',
        price: 1000,
        imageSrc: require('./assets/dogPills.png'),
        displayString: 'Pills'
    },
    ointment: {
        id: 'ointment',
        price: 700,
        imageSrc: require('./assets/dogOintment.png'),
        displayString: 'Ointment'
    }
}

export const SHELF_ORDER = [
    ['puppyFood', 'dogFood', 'adultFood'],
    ['rubberBall', 'rawhideBone', 'plushToy'],
    ['apple', 'milkBone', 'peanutButter'],
    ['pill', 'ointment']
]
