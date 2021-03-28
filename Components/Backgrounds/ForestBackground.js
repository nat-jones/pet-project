import React, { useEffect } from "react";
import { ImageBackground, StyleSheet, Dimensions } from "react-native";

const forestImage = require("../../assets/CabinBackground.png");
const windowDims = Dimensions.get('window')

export default function ForestBackground(props) {


  return (
    <ImageBackground source={forestImage} style={styles.root}>
      {props.children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: windowDims.width,
    height: windowDims.height,
    justifyContent: "center",
    alignItems: "center",
  },
});
