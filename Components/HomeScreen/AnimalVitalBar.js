import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Animated, Dimensions, Button } from "react-native";
import { calculateIdleStars } from '../../BarConsts';


const MAX_BAR_WIDTH = Dimensions.get('window').width / 5 * 2;

export default function AnimalVitalsBar(props) {

  const getAdjustedBarValue = () => {
    let date = new Date();

    return (Math.max(0, props.value - (props.depletionRate * (date.getTime() - props.lastCared))));
  }

  const getBarWidth = (value) => value / 100 * MAX_BAR_WIDTH;

  const getBarColor = (adjustedValue) => {
    if (adjustedValue > 91 || adjustedValue < 9) { return 'red' }
    else if (adjustedValue > 83 || adjustedValue < 17) { return 'orange' }
    else if (adjustedValue > 75 || adjustedValue < 25) { return 'yellow' }
    else { return 'green' }
  }

  let initialBarWidth = getAdjustedBarValue();


  const [barColor, setBarColor] = useState(getBarColor(initialBarWidth));
  const [starPoints, setStarPoints] = useState(0);

  const barLength = useRef(new Animated.Value(initialBarWidth)).current;


  const adjustStarPointsAndBarColor = () => {
    let barColor = getBarColor(getAdjustedBarValue());
    setBarColor(barColor);
    if (barColor === 'green') { setStarPoints(starPoints + 2) }
    else if (barColor === 'orange') { setStarPoints(starPoints - .5) }
    else if (barColor === 'red') { setStarPoints(starPoints - 1) }
  }

  const growBar = (adjustedValue) => {
    Animated.timing(barLength, {
      toValue: getBarWidth(adjustedValue),
      duration: 500,
      useNativeDriver: false,
    }).start(() => depleteBar(getAdjustedBarValue() / props.depletionRate));
  }

  const depleteBar = (duration) => {
    Animated.timing(barLength, {
      toValue: 0,
      duration: duration,
      useNativeDriver: false
    }).start();
  }

  useEffect(() => {
    let adjustedValue = getAdjustedBarValue();
    growBar(adjustedValue)
  }, [props.lastCared]);

  useEffect(
    () => {
      let barColor = getBarColor(getAdjustedBarValue());
      setBarColor(barColor);
      //const startCheck = setInterval(adjustStarPointsAndBarColor, 1000)
      //return () => clearInterval(startCheck);
    }, [starPoints, props.lastCared]);

  return (
    <View style={styles.barView}>
      <View style={styles.fullBar}>
        <Animated.View
          style={[
            styles.partialBar,
            {
              width: barLength,
              backgroundColor: barColor,
            },
          ]}
        />
        <View style={styles.sweetSpot}>
          {props.icon}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  barView: {
    width: "100%",
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: "space-between",
    paddingLeft: 15,
    paddingRight: 15,
    height: 25
  },
  barCategory: {
    width: 100,
  },
  fontStyle: {
    color: "#998200",
    fontWeight: "800",
    fontSize: 20
  },
  fullBar: {
    height: 22,
    borderColor: "#ffd700",
    borderWidth: 1,
    width: MAX_BAR_WIDTH + 2,
    borderRadius: 20,
    backgroundColor: "#998200",
    position: 'relative'
  },
  partialBar: {
    borderRadius: 30,
    height: 20,
  },
  sweetSpot: {
    height: 24,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'gold',
    position: 'absolute',
    left: MAX_BAR_WIDTH * .25,
    top: -2,
    alignItems: 'center',
    justifyContent: 'center',
    width: MAX_BAR_WIDTH * .5
  }
});
