export const HUNGER_DEPLETION_MULTIPLIER = 0.0000011574; //will drop 50% in 24 hours
export const CLEANLINESS_DEPLETION_MULTIPLIER = 0.0000005787; //will drop 25% in 24 hours
export const EXERCISE_DEPLETION_MULTIPLIER = 0.0000011574; //will drop 50% in 24 hours
export const LOVE_DEPLETION_MULTIPLIER = 0.0000011574; //will drop 50% in 24 hours

export const depletionRates = {
    love: 0.0000011574 * 500,
    hunger: 0.0000011574 * 500,
    cleanliness: 0.0000005787 * 500,
    exercise: 0.0000011574 * 500
}

export const ZERO_STAR_THRESHOLD = 0;
export const ONE_STAR_THRESHOLD = 480;
export const TWO_STAR_THRESHOLD = 1440;
export const THREE_STAR_THRESHOLD = 2880;
export const FOUR_STAR_THRESHOLD = 4800;
export const FIVE_STAR_THRESHOLD = 7200;

export const starRequirements = {
    0: 0,
    1: 480,
    2: 1440,
    3: 2880,
    4: 4800,
    5: 7200
}

export const colorPoints = {
    green: 2,
    yellow: 0,
    orange: -.5,
    red: -1
}

export const checkStarLevel = (value) => {
    if (value >= FIVE_STAR_THRESHOLD) {
        return 5;
    }

    if (value >= FOUR_STAR_THRESHOLD) {
        return 4;
    }

    if (value >= THREE_STAR_THRESHOLD) {
        return 3;
    }

    if (value >= TWO_STAR_THRESHOLD) {
        return 2;
    }

    if (value >= ONE_STAR_THRESHOLD) {
        return 1;
    }

    return 0;
}