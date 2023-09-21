export const sponsorAnimal = (sponsoredAnimalID) => {
  return {
    type: 'SPONSOR_ANIMAL',
    value: sponsoredAnimalID,
  };
};

export const setAllDogInfo = (dogInfo) => {
  return {
    type: 'SET_ALL_DOG_INFO',
    value: dogInfo,
  };
};
