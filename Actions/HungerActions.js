export const feedPet = (data) => {
    return (
        {
            type: "FEED_PET",
            value: data
        }
    )
}

export const setHungerInfo = ({ lastFed, timesFedToday, hungerStars, lastCheckIn, didMisfeed, time }) => {
    return (
        {
            type: "SET_HUNGER_INFO",
            value: {
                lastFed: lastFed,
                timesFedToday: timesFedToday,
                hungerStars: hungerStars,
                didMisfeed: didMisfeed
            }
        }
    )
}
