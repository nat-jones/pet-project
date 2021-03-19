
export const HUNGER_DEPLETION_MULTIPLIER = 0.0000011574; //will drop 50% in 24 hours
export const CLEANLINESS_DEPLETION_MULTIPLIER = 0.0000005787; //will drop 25% in 24 hours
export const EXERCISE_DEPLETION_MULTIPLIER = 0.0000011574; //will drop 50% in 24 hours
export const LOVE_DEPLETION_MULTIPLIER = 0.0000011574; //will drop 50% in 24 hours

export const depletionRates = {
    love: 0.0000011574,
    hunger: 0.0000011574,
    cleanliness: 0.0000005787,
    exercise: 0.0000011574
}

export const ZERO_STAR_THRESHOLD = 0;
export const ONE_STAR_THRESHOLD = 480;
export const TWO_STAR_THRESHOLD = 1440;
export const THREE_STAR_THRESHOLD = 2880;
export const FOUR_STAR_THRESHOLD = 4800;
export const FIVE_STAR_THRESHOLD = 7200;

export const starRequirements = {
    0: 0,
    1: 8640,
    2: 17280,
    3: 34560,
    4: 69120,
    5: 138240
}

export const colorPoints = {
    green: 2,
    yellow: 0,
    orange: -.5,
    red: -1
}

export const cutoffs = [91, 83, 75, 25, 17, 9]

export const calculateIdleStars = (value, lastCared) => {
    let date = new Date();
    let curTime = date.getTime();
    let timeBetween = Math.floor((curTime - lastCared) / 1000);
    let starChange = 0
    curTime = Math.floor(curTime / 1000);
    while (timeBetween > 0) {
        starChange += starRatePerFiveSecondsAtBarValue(value);
        value -= 0.0011574 * 5;
        timeBetween -= 5
    }
    return starChange;
}

export const starRatePerFiveSecondsAtBarValue = (value) => {
    if (value < 9 || value > 91) {
        return -1;
    }

    else if (value < 17 || value > 83) {
        return -.5;
    }

    else if (value < 25 || value > 75) {
        return 0;
    }
    else { return 2 }
}


export const checkStarLevel = (value) => {
    if (value >= starRequirements[5]) {
        return 5;
    }

    if (value >= starRequirements[4]) {
        return 4;
    }

    if (value >= starRequirements[3]) {
        return 3;
    }

    if (value >= starRequirements[2]) {
        return 2;
    }

    if (value >= starRequirements[1]) {
        return 1;
    }

    return 0;
}