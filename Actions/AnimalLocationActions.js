export const setAnimalLocation = (location) => {
  return {
    type: 'SET_ANIMAL_LOCATION',
    location: { ...location },
  };
};

export const showAnimal = () => {
  return {
    type: 'SHOW_ANIMAL',
  };
};

export const hideAnimal = () => {
  return {
    type: 'HIDE_ANIMAL',
  };
};
