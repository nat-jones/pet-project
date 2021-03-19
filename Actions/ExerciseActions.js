export const exercisePet = (time) => {
    return (
        {
            type: "EXERCISE_PET",
            time: time
        }
    )
}

export const setExerciseInfo = ({ lastExercised, timesExercisedToday, exerciseStars, didMisexercise }) => {
    return (
        {
            type: "SET_EXERCISE_INFO",
            value: {
                lastExercised: lastExercised,
                timesExercisedToday: timesExercisedToday,
                exerciseStars: exerciseStars,
                didMisexercise: didMisexercise
            }

        }
    )
}
