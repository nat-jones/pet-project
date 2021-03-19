
import Store from '../../store';
import { setAllAccumulators } from "../../Actions/AccumulatorActions";
import { setAllBars } from "../../Actions/BarActions";
import { setAllCareerInfo } from "../../Actions/CareerActions";
import { setInventory, setItem } from "../../Actions/InventoryActions";
import { sponsorAnimal } from '../../Actions/SponsorableAnimalActions';
import { getAllAnimalInfo } from '../../DogScraper';
import { getUserData } from '../../Backend/firebase';
import { setAllDogInfo } from '../../Actions/SponsorableAnimalActions';
import { SHOP_ITEM_INFO } from '../../shopItemInfo';
import { setHungerInfo } from '../../Actions/HungerActions';
import { setExerciseInfo } from '../../Actions/ExerciseActions';
import {
    reduxAndFirebaseSetHunger,
    reduxAndFirebaseSetExercise,
    reduxAndFirebaseSetCleanliness
} from '../../ReduxBackendWrappers';
const dispatch = Store.dispatch;

export const dispatchUserData = async (data) => {

    date = new Date();
    let time = date.getTime()
    await dispatch(
        setAllAccumulators({
            coins: data.coins,
            xp: data.xp,
            gems: data.gems,
        })
    );
    await dispatch(
        setAllBars({
            love: data.love,
            cleanliness: data.cleanliness,
            hunger: data.hunger,
            exercise: data.exercise,
            lastFed: data.lastFed,
            lastCleaned: data.lastCleaned,
            lastLoved: data.lastLoved,
            lastExercised: data.lastExercised,
            loveStars: data.loveStars,
            exerciseStars: data.exerciseStars,
            hungerStars: data.hungerStars,
            cleanlinessStars: data.cleanlinessStars
        })
    );
    await reduxAndFirebaseSetHunger(dispatch,
        {
            lastFed: data.lastFed,
            didMisfeed: data.didMisfeed,
            hungerStars: data.hungerStars,
            timesFedToday: data.timesFedToday,
            lastCheckIn: data.lastCheckIn,
            time: time
        }
    );

    await reduxAndFirebaseSetExercise(dispatch,
        {
            lastExercised: data.lastExercised,
            didMisexercise: data.didMisexercise,
            exerciseStars: data.exerciseStars,
            timesExercisedToday: data.timesExercisedToday,
            lastCheckIn: data.lastCheckIn,
            time: time
        });

    await reduxAndFirebaseSetCleanliness(dispatch,
        {
            lastCleaned: data.lastCleaned,
            didMisclean: data.didMisclean,
            cleanlinessStars: data.cleanlinessStars,
            timesCleanedToday: data.timesCleanedToday,
            lastCheckIn: data.lastCheckIn,
            time: time
        }
    )
    let inventory = Object.keys(SHOP_ITEM_INFO).reduce(
        (acc, e) => {

            acc[e] = data[e];
            return acc;
        }, {}
    );


    await dispatch(setInventory(inventory));

    await dispatch(sponsorAnimal(data.sponsoredAnimalID));

    await dispatch(setAllCareerInfo({
        careerID: data.careerID,
        lastShiftStart: data.lastShiftStart
    }
    ));
};

export const dispatchAllData = async (uid) => {

    let userData = await getUserData(uid);
    await dispatchUserData(userData);
    let dogInfo = await (getAllAnimalInfo());
    await dispatch(setAllDogInfo(dogInfo));
}