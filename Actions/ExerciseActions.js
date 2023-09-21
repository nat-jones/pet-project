export const exercisePet = (data) => {
  return {
    type: 'EXERCISE_PET',
    value: data,
  };
};

export const setExerciseInfo = ({
  lastExercised,
  timesExercisedToday,
  exerciseStars,
  didMisexercise,
}) => {
  return {
    type: 'SET_EXERCISE_INFO',
    value: {
      lastExercised: lastExercised,
      timesExercisedToday: timesExercisedToday,
      exerciseStars: exerciseStars,
      didMisexercise: didMisexercise,
    },
  };
};
