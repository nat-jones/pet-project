import { StatusBar } from "expo-status-bar";
import React, { useState, useRef } from "react";
import { StyleSheet, View, Image, Dimensions } from "react-native";
import AnimalVitalsWindow from "./AnimalVitalsWindow";
import HomeTopBar from "./HomeTopBar";
import InventoryDropDown from "../Inventory/InventoryDropDown";
import TestLoadingScreen from "../LoadingScreens/TestLoadingScreen";
import { useSelector, useDispatch } from "react-redux";
import { setAnimalLocation } from '../../Actions/AnimalLocationActions';
import OverlayContainer from '../Containers/OverlayContainer';
import { ANIMAL_POSITION_BOTTOM, ANIMAL_HEIGHT, width, height } from '../../layoutConsts';
import DraggableImage from "../Inventory/DraggableImage";

const windowDims = Dimensions.get('window')


function HomeScreenBackground(props) {

  const testAnimal = require("../../assets/testAnimal.png");

  const dispatch = useDispatch();
  const showAnimal = useSelector(state => state.animalLocation.show);



  return (

    <View style={styles.homeScreenView} >
      <View
        style={styles.animalImageView}
        onLayout={(event) => {
          const layout = event.nativeEvent.layout;

          let location = {
            bottom: layout.y + layout.height,
            right: layout.width + layout.x,
            left: layout.x,
            top: layout.y,
          };

          dispatch(setAnimalLocation(location));
        }}
      >
        <Image
          source={require('../../assets/ScottishTerrier.png')}
          key={"animalImage"}
          style={[styles.animalImage, { opacity: (showAnimal ? 1 : .5) }]}
        />
      </View>
      <AnimalVitalsWindow />
      <InventoryDropDown />
      <StatusBar style="auto" />

    </View>


  );
}

export default function HomeScreen() {
  return (
    <OverlayContainer behind={<HomeScreenBackground />} front={<DraggableImage />} />

  );
}

const styles = StyleSheet.create({
  homeScreenView: {
    width: width,
    height: height,
    alignItems: "center"
  },
  animalImageView: {
    height: ANIMAL_HEIGHT,
    borderColor: "red",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: ANIMAL_POSITION_BOTTOM,
    zIndex: 1,
  },
  animalImage: {
    height: "100%",
    aspectRatio: 8 / 9,
    flex: 1,
    resizeMode: "cover",
    zIndex: 1,
  },
  buttonArea: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonLine: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    marginTop: "2%",
    marginBottom: "2%",
    width: 60,
    height: 60,
    backgroundColor: "gold",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  icon: {
    color: "#bf9700",
    opacity: 0.8,
  },
  buttonText: {
    fontSize: 20,
    color: "#bf9700",
  },
});
