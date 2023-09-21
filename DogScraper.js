let axios = require('axios');
let cheerio = require('cheerio');

export const getAllAnimalInfo = async () => {
  const { data } = await axios.get(
    'https://amigosdelosanimalespr.org/adoptable-dogs/'
  );
  const $ = cheerio.load(data);

  const allDogs = $('.dog.dog')
    .get()
    .reduce((acc, dog) => {
      const dogID = $(dog).find('.name a').attr('id');
      const dogName = $(dog).find('.name a').text();
      const dogImage = $(dog).find('.images img').attr('src');
      const rawDogDescription = $(dog).find('.description p').text();
      const parsedDogDescription = rawDogDescription.split(
        'View full description'
      )[0];
      const info = $(dog).find('.images ul').find('.pet-options li').text();
      acc[dogID] = {
        id: dogID,
        name: dogName,
        src: dogImage,
        description: parsedDogDescription,
      };
      return acc;
    }, {});
  return allDogs;
  //parseAnimalInfo(data);
};
