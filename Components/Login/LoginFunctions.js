import React from 'react';
import { useDispatch } from 'react-redux';
import Store from '../../store';
import { login } from "../../Actions/LoginActions";
import { setAllAccumulators } from "../../Actions/AccumulatorActions";
import { setAllBars } from "../../Actions/BarActions";
import { setFood } from "../../Actions/FoodActions";
import { sponsorAnimal } from '../../Actions/SponsorableAnimalActions';
import { getUserData } from '../../firebase';


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
    await dispatch(setFood(data.food));

    await dispatch(sponsorAnimal(data.sponsoredAnimalID));
};

export const dispatchAllData = async (user) => {

    dispatch(login(user.uid));
    let userData = await getUserData(user.uid);
    await dispatchUserData(userData);
}