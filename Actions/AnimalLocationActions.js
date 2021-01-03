
export const setAnimalLocation = (location) => {
    return (
        {
            type: 'SET_ANIMAL_LOCATION',
            location: { ...location }
        }
    )
}