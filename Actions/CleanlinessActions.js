export const setCleanlinessInfo = ({
  lastCleaned,
  timesCleanedToday,
  cleanlinessStars,
  didMisclean,
}) => {
  return {
    type: 'SET_CLEANLINESS_INFO',
    value: {
      lastCleaned: lastCleaned,
      timesCleanedToday: timesCleanedToday,
      cleanlinessStars: cleanlinessStars,
      didMisclean: didMisclean,
    },
  };
};

export const cleanPet = ({ lastCleaned, didMisclean, timesCleanedToday }) => {
  return {
    type: 'CLEAN_PET',
    value: {
      lastCleaned: lastCleaned,
      didMisclean: didMisclean,
      timesCleanedToday: timesCleanedToday,
    },
  };
};
