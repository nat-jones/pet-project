import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Animated, Dimensions, Text } from "react-native";
import { starRequirements, checkStarLevel } from '../../BarConsts';
import { useSelector } from "react-redux";
import { setBar } from "../../Actions/BarActions";


const MAX_BAR_WIDTH = Dimensions.get('window').width / 5 * 2;

export default function AnimalVitalsBar(props) {





  let date = new Date();
  const getAdjustedBarWidth = () => Math.max(0, props.value - (props.depletionRate * (date.getTime() - props.lastCared)));

  let initialBarWidth = getAdjustedBarWidth();

  let barState = 'green';
  if (initialBarWidth < 9 || initialBarWidth > 91) {
    barState = 'red';
  } else if (initialBarWidth < 17 || initialBarWidth > 83) {
    barState = 'orange';
  } else if (initialBarWidth < 25 || initialBarWidth > 75) {
    barState = 'yellow';
  }

  const [barColor, setBarColor] = useState(barState);

  const starPoints = useRef(new Animated.Value(0)).current;
  const barLength = useRef(new Animated.Value(initialBarWidth)).current;


  const [starLevel, setStarLevel] = useState(checkStarLevel(starPoints));

  starPoints.addListener(
    (value) => {
      if (value < starRequirements[starLevel]) {
        setStarLevel(starLevel - 1);
      }
      else if (value > starRequirements[starLevel + 1]) {
        setStarLevel(startLevel + 1);
      }
    }
  );

  // barLength.addListener(
  //   (value) => {

  //     let adjustedValue = value.value * 100 / MAX_BAR_WIDTH;

  //     if (barState === 'green' && adjustedValue > 75) {
  //       setBarColor('yellow');
  //     }
  //     else if (barState === 'green' && adjustedValue < 25) {
  //       setBarColor('yellow');
  //     }
  //     else if (barState === 'yellow' && adjustedValue < 17) {
  //       setBarColor('orange');
  //     }
  //     else if (barState === 'yellow' && adjustedValue > 83) {
  //       setBarColor('orange');
  //     }
  //     else if (barState === 'orange' && adjustedValue > 91) {
  //       setBarColor('red');
  //     }
  //     else if (barState === 'orange' && adjustedValue < 9) {
  //       setBarColor('red');
  //     }
  //     else if (barState === 'red' && adjustedValue >= 9) {
  //       setBarColor('orange');
  //     }
  //     else if (barState === 'red' && adjustedValue <= 91) {
  //       setBarColor('orange');
  //     }
  //     else if (barState === 'yellow' && adjustedValue >= 25) {
  //       setBarColor('green');
  //     }
  //     else if (barState === 'yellow' && adjustedValue <= 75) {
  //       setBarColor('green');
  //     }
  //     else if (barState === 'orange' && adjustedValue >= 17) {
  //       setBarColor('yellow');
  //     }
  //     else if (barState === 'orange' && adjustedValue <= 83) {
  //       setBarColor('yellow');
  //     }
  //   }
  // )


  const inRed = () => {
    Animated.timing(
      starPoints, {
      toValue: 0,
      duration: starPoints * 1000
    }
    ).start();
  }

  const inOrage = () => {
    Animated.timing(
      starPoints, {
      toValue: 0,
      duration: starPoints * 2000
    }
    ).start();
  }

  const inGreen = () => {
    Animated.timing(
      starPoints, {
      toValue: 9600,
      duration: starPoints * 500
    }
    )
  }

  const growBar = () => {

    Animated.timing(barLength, {
      toValue: getAdjustedBarWidth() / 100 * MAX_BAR_WIDTH,
      duration: 500,
      useNativeDriver: false,
    }).start(depleteBar);
  }

  const depleteBar = () => {
    Animated.timing(barLength, {
      toValue: 0,
      duration: props.value / props.depletionRate,
      useNativeDriver: false
    }).start();
  }



  useEffect(() => {
    growBar()
  }, [props.value]);

  useEffect(() => {
    Animated.timing(starPoints,
      {
        toValue: 6,
        duration: 6000,
        useNativeDriver: false
      }
    ).start();
  }, []);

  return (
    <View style={styles.barView}>
      <View style={styles.fullBar}>
        <Animated.Text>
          {starPoints}
        </Animated.Text>
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
