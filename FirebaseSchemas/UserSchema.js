const date = new Date();

export const NewUserSchema = {
  coins: 0,
  loveStars: 0,
  cleanlinessStars: 0,
  hungerStars: 0,
  exerciseStars: 0,
  intelligenceStars: 0,
  lastCleaned: date.getTime(),
  lastFed: date.getTime(),
  lastExercised: date.getTime(),
  lastLoved: date.getTime(),
};
