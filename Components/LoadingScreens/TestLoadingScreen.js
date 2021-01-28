import React, { useEffect, useState } from "react";
import ForestBackground from "../Backgrounds/ForestBackground";
import { Spinner } from "native-base";
import { dispatchAllData } from '../Login/LoginFunctions';
import { useDispatch, useSelector } from 'react-redux';
import { Actions } from "react-native-router-flux";
import { Asset } from 'expo-asset';


export default function TestLoadingScreen(props) {

  const uid = useSelector(state => state.userID);
  const [didLoad, setDidLoad] = useState(false);

  useEffect(() => {
    async function loadInfo() {
      await dispatchAllData(uid);
      await Asset.loadAsync([
        require("../../assets/homescreenBackground.jpg"),
        require("../../assets/adultDogFood.png"),
        require("../../assets/receipt.png"),
        require("../../assets/apple.png"),
        require("../../assets/dogBone.png"),
        require("../../assets/dogOintment.png"),
        require("../../assets/dogPills.png"),
        require("../../assets/dogPlushToy.png"),
        require("../../assets/dogTreatMilkBone.png"),
        require("../../assets/RosiesRetailWoodBackground.png"),
        require("../../assets/rubberBall.png"),
        require("../../assets/testAnimal.png"),
        require("../../assets/puppyDogFood.png"),
        require("../../assets/rubberBall.png"),
        require("../../assets/tennisBall.png"),
        require("../../assets/dogFood.png"),
        require("../../assets/therapyDog.jpg"),
        require("../../assets/serviceDog.jpg"),
        require("../../assets/herdingDog.jpg"),
        require("../../assets/searchAndRescueDog.jpg"),
        require("../../assets/truffleDog.jpg"),
        require("../../assets/hollywoodDog.jpg"),
        require("../../assets/detectionDog.jpg"),

      ]);
      await setDidLoad(true);
    }
    loadInfo();
  }
    , []);
  useEffect(() => {
    if (didLoad) {
      Actions.main();
    }
  }, [didLoad]);

  return (
    <ForestBackground>
      <Spinner></Spinner>
    </ForestBackground>
  );
}
