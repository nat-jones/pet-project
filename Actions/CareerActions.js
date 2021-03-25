import { CAREER_INFO } from '../careerInfo';

const date = new Date();

export const setCareer = (careerID) => {
    return {
        type: 'SET_CAREER',
        value: { ...CAREER_INFO[careerID] }
    }
};

export const startShift = (time, shiftType) => {
    return {
        type: 'START_SHIFT',
        expectedShiftEnd: time,
        lastShiftType: shiftType
    };
};

export const setAllCareerInfo = (value) => {
    return {
        type: 'SET_ALL_CAREER_INFO',
        value: { career: { ...CAREER_INFO[value.career] }, expectedShiftEnd: value.expectedShiftEnd, lastShiftType: value.lastShiftType }
    }
}

export const reduceShift = () => {

    return {
        type: "REDUCE_SHIFT"
    }
}




