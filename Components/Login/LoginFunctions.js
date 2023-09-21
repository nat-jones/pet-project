import Store from '../../store';
import { setCoins } from '../../Actions/CoinActions';
import { setAllCareerInfo } from '../../Actions/CareerActions';
import { setInventory, setItem } from '../../Actions/InventoryActions';
import { sponsorAnimal } from '../../Actions/SponsorableAnimalActions';
import { getAllAnimalInfo } from '../../DogScraper';
import { checkIn, getUserData } from '../../Backend/firebase';
import { setAllDogInfo } from '../../Actions/SponsorableAnimalActions';
import { SHOP_ITEM_INFO } from '../../shopItemInfo';
import { CAREER_INFO } from '../../careerInfo';
import { setHungerInfo } from '../../Actions/HungerActions';
import { setExerciseInfo } from '../../Actions/ExerciseActions';
import {
  reduxAndFirebaseSetHunger,
  reduxAndFirebaseSetExercise,
  reduxAndFirebaseSetCleanliness,
} from '../../ReduxBackendWrappers';
import { hideAnimal } from '../../Actions/AnimalLocationActions';
import { setTrainingData } from '../../Actions/TrainingActions';
import { setIntelligenceInfo } from '../../Actions/IntelligenceActions';
const dispatch = Store.dispatch;

export const dispatchUserData = async (data) => {
  date = new Date();
  let time = date.getTime();
  let lastCheckInDate = new Date(data.lastCheckIn);
  await dispatch(setCoins(data.coins));

  await checkIn(date.getTime());

  await reduxAndFirebaseSetHunger(dispatch, {
    lastFed: data.lastFed,
    didMisfeed: data.didMisfeed,
    hungerStars: data.hungerStars,
    timesFedToday: data.timesFedToday,
    lastCheckIn: lastCheckInDate,
    time: date,
  });

  await reduxAndFirebaseSetExercise(dispatch, {
    lastExercised: data.lastExercised,
    didMisexercise: data.didMisexercise,
    exerciseStars: data.exerciseStars,
    timesExercisedToday: data.timesExercisedToday,
    lastCheckIn: lastCheckInDate,
    time: date,
  });

  await reduxAndFirebaseSetCleanliness(dispatch, {
    lastCleaned: data.lastCleaned,
    didMisclean: data.didMisclean,
    cleanlinessStars: data.cleanlinessStars,
    timesCleanedToday: data.timesCleanedToday,
    lastCheckIn: lastCheckInDate,
    time: date,
  });
  let inventory = Object.keys(SHOP_ITEM_INFO).reduce((acc, e) => {
    acc[e] = data[e];
    return acc;
  }, {});

  await dispatch(
    setIntelligenceInfo({
      intelligenceStars: data.intelligenceStars,
      timesTrainedToday: data.timesTrainedToday,
    })
  );

  await dispatch(setInventory(inventory));

  await dispatch(sponsorAnimal(data.sponsoredAnimalID));

  await dispatch(
    setAllCareerInfo({
      career: data.careerID,
      expectedShiftEnd: data.expectedShiftEnd,
      lastShiftType: data.lastShiftType,
    })
  );

  await dispatch(setTrainingData(data.trainingData));

  checkOnShift(data.expectedShiftEnd) && dispatch(hideAnimal());
};

export const dispatchAllData = async (uid) => {
  let userData = await getUserData(uid);
  await dispatchUserData(userData);
  let dogInfo = await getAllAnimalInfo();
  await dispatch(setAllDogInfo(dogInfo));
};

const checkOnShift = (expectedShiftEnd) => {
  let date = new Date();
  let time = date.getTime();

  return time < expectedShiftEnd;
};

const collectPayment = (lastShiftStart, lastCheckIn, lastShiftType) => {
  let expectedShiftEnd;
};
