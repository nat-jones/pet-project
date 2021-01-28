import React from "react";
import { StyleSheet, View, ImageBackground, Image } from "react-native";
import { Icon } from 'native-base';
import AnimalVitalBar from "./AnimalVitalBar";
import { useSelector } from "react-redux";
import { ANIMAL_VITALS_WINDOW_HEIGHT, ANIMAL_VITALS_WINDOW_POSITION_TOP } from '../../layoutConsts';

export default function AnimalVitalsWindow(props) {
  const loveVal = useSelector((state) => state.bars.love);
  const cleanVal = useSelector((state) => state.bars.cleanliness);
  const hungerVal = useSelector((state) => state.bars.hunger);
  const exerciseVal = useSelector((state) => state.bars.exercise);

  return (
    <View style={styles.container}>
      <View style={styles.window}>
        <View style={styles.stackedBars}>
          <AnimalVitalBar icon={<Icon type='FontAwesome' name='heart' style={styles.icon} />} value={loveVal}></AnimalVitalBar>
          <AnimalVitalBar icon={<Icon type='FontAwesome5' name='bath' style={styles.icon} />} value={cleanVal}></AnimalVitalBar>
        </View>
        <View style={styles.stackedBars}>
          <AnimalVitalBar icon={<Icon type='FontAwesome5' name='drumstick-bite' style={styles.icon} />} value={hungerVal}></AnimalVitalBar>
          <AnimalVitalBar icon={<Icon type='MaterialCommunityIcons' name='run-fast' style={styles.icon} />} category="exercise" value={exerciseVal}></AnimalVitalBar>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    position: "absolute",
    top: ANIMAL_VITALS_WINDOW_POSITION_TOP,
  },
  window: {
    width: "98%",
    backgroundColor: "rgba(153, 130, 0, .5)",
    borderRadius: 5,
    height: ANIMAL_VITALS_WINDOW_HEIGHT,
    borderColor: "#ffd700",
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 20,
    color: "#ffd700",
  },
  stackedBars: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
