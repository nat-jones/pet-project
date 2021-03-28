import { ActionSheet } from "native-base"

export const guess = (command, attempt) => {
    return {
        type: "GUESS",
        command: command,
        attempt: attempt
    }
}

export const learn = (command, attempt, outcome) => {
    return {
        type: "LEARN",
        command: command,
        attempt: attempt,
        outcome: outcome
    }
}

export const setTrainingData = (value) => {
    return {
        type: "SET_TRAINING",
        value: value
    }
}