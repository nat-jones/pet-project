import React, { useState } from "react";
import ForestBackground from "./Backgrounds/ForestBackground";
import { StyleSheet, View, Pressable, Dimensions } from "react-native";
import Draggable from "react-native-draggable";
import * as Animatable from "react-native-animatable";

const ZDISTANCE = 150;
const GRAVITY = 10;
const SCREEN_DIMENSIONS = Dimensions.get("window");

export default function TreatThrow(props) {
  const [touchedX, setTouchedX] = useState(null);
  const [touchedY, setTouchedY] = useState();

  return (
    <ForestBackground>
      <View style={styles.touchableContainer}>
        {/* <Animatable.View
                        animation={{
                            0: { translateY: 500 },
                            0.5: { translateY: 300 },
                            1: { translateY: 500 }
                        }}
                        duration={1000}
                        delay={0}
                        easing={t => Math.pow(t, 1.7)}
                        iterationCount="infinite"
                        useNativeDriver
                        style={{
                            position: 'absolute',
                            paddingHorizontal: 50,
                            left: 200

                        }}> */}
        <Draggable
          style={styles.draggable}
          onPressIn={(e) => console.log(e.locationX)}
        >
          <View style={styles.ball} />
        </Draggable>
        {/* </Animatable.View> */}
      </View>
    </ForestBackground>
  );
}

const styles = StyleSheet.create({
  touchableArea: {
    borderWidth: 2,
    borderColor: "red",
    height: "100%",
    width: "100%",
  },
  touchableContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderColor: "red",
    borderWidth: 2,
  },
  ball: {
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: "red",
  },
  draggable: {
    justifyContent: "center",
    alignItems: "center",
  },
});
