import React, { useEffect } from "react";
import { StyleSheet, View, ImageBackground, Image } from "react-native";
import { Icon } from 'native-base';
import AnimalVitalBar from "./AnimalVitalBar";
import { useSelector } from "react-redux";
import { ANIMAL_VITALS_WINDOW_HEIGHT, ANIMAL_VITALS_WINDOW_POSITION_TOP } from '../../layoutConsts';
import { depletionRates } from '../../BarConsts';

export default function AnimalVitalsWindow(props) {
  const loveInfo = useSelector((state) => state.bars.love);
  const cleanlinessInfo = useSelector((state) => state.bars.cleanliness);
  const hungerInfo = useSelector((state) => state.bars.hunger);
  const exerciseInfo = useSelector((state) => state.bars.exercise);

  return (
    <View style={styles.container}>
      <View style={styles.window}>
        <View style={styles.stackedBars}>
          <AnimalVitalBar
            icon={<Icon type='FontAwesome' name='heart' style={styles.icon} />}
            {...loveInfo}
            depletionRate={depletionRates.love}

          ></AnimalVitalBar>
          <AnimalVitalBar
            icon={<Icon type='FontAwesome5' name='bath' style={styles.icon} />}
            {...cleanlinessInfo}
            depletionRate={depletionRates.cleanliness}


          ></AnimalVitalBar>
        </View>
        <View style={styles.stackedBars}>
          <AnimalVitalBar
            icon={<Icon type='FontAwesome5' name='drumstick-bite' style={styles.icon} />}
            {...hungerInfo}
            depletionRate={depletionRates.hunger}

          ></AnimalVitalBar>
          <AnimalVitalBar
            icon={<Icon type='MaterialCommunityIcons' name='run-fast' style={styles.icon} />}
            {...exerciseInfo}
            depletionRate={depletionRates.exercise}

          ></AnimalVitalBar>
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
