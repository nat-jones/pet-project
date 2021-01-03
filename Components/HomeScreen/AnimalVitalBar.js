import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Animated, Dimensions } from "react-native";


const MAX_BAR_WIDTH = Dimensions.get('window').width / 5 * 2;

export default function AnimalVitalsBar(props) {
  let barColor = 'green';

  if (props.value < 25) {
    barColor = "red";
  } else if (props.value < 50) {
    barColor = "orange";
  } else if (props.value < 75) {
    barColor = "yellow";
  }

  const barGrow = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(barGrow, {
      toValue: props.value / 100 * MAX_BAR_WIDTH,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [props.value]);

  return (
    <View style={styles.barView}>
      <View style={styles.fullBar}>
        {props.icon}
        <Animated.View
          style={[
            styles.partialBar,
            {
              width: barGrow,
              backgroundColor: barColor,
            },
          ]}
        />
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
    justifyContent: "space-between",
    paddingLeft: 15,
    paddingRight: 15
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
});
