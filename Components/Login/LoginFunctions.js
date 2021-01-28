
import Store from '../../store';
import { setAllAccumulators } from "../../Actions/AccumulatorActions";
import { setAllBars } from "../../Actions/BarActions";
import { setAllCareerInfo } from "../../Actions/CareerActions";
import { setInventory, setItem } from "../../Actions/InventoryActions";
import { sponsorAnimal } from '../../Actions/SponsorableAnimalActions';
import { getAllAnimalInfo } from '../../DogScraper';
import { getUserData } from '../../firebase';
import { setAllDogInfo } from '../../Actions/SponsorableAnimalActions';
import { SHOP_ITEM_INFO } from '../../shopItemInfo';
import { database } from 'firebase';


const dispatch = Store.dispatch;

export const dispatchUserData = async (data) => {

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
            lastExercised: data.lastExercised
        })
    );
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