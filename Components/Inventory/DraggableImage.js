import React, { useRef } from "react";
import {
  Animated,
  View,
  Image,
  StyleSheet,
  PanResponder,
  Text,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { decrementFood } from "../../Actions/FoodActions";
import { addToBar } from "../../Actions/BarActions";
import { updateBars } from '../../firebase';
import { disableScroll, enableScroll } from '../../Actions/ScrollActions';
import { INVENTORY_ITEM_MARGIN, INVENTORY_ITEM_WIDTH } from "../../layoutConsts";


const DraggableImage = (props) => {
  const pan = new Animated.ValueXY();
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const dispatch = useDispatch();
  const animalLocation = useSelector((store) => store.animalLocation);

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start(async () => {
      dispatch(enableScroll());
      await dispatch(decrementFood());
      await dispatch(addToBar("hunger", 25));
      await dispatch(addToBar("love", 10));
      await updateBars(["love", 'hunger']);
      pan.setValue({ x: 0, y: 0 });
      fadeAnim.setValue(1);
    });
  };

  const isInDropZone = (gestureState) => {
    return (
      gestureState.moveX > animalLocation.left &&
      gestureState.moveX < animalLocation.right &&
      gestureState.moveY > animalLocation.top &&
      gestureState.moveY < animalLocation.bottom
    );
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onPanResponderStart: (e, gestureState) => dispatch(disableScroll()),

    onPanResponderMove: (evt, gestureState) => {
      if (props.value > 0) {
        pan.setValue({ x: gestureState.dx, y: gestureState.dy });
      }
    },
    onPanResponderRelease: (evt, gestureState) => {


      if (isInDropZone(gestureState) && props.value > 0) {
        fadeOut();
      } else {
        Animated.timing(pan, {
          toValue: { x: 0, y: 0 },
          duration: 200,
          useNativeDriver: false,
        }).start(() => dispatch(enableScroll()));
      }

    },
  });

  return (
    <View style={styles.inventorySpace}>
      <Image style={[{ zIndex: 1 }, styles.image]} source={props.imageSource} />
      <Animated.View
        style={{
          transform: [{ translateX: pan.x }, { translateY: pan.y }],
          opacity: fadeAnim,
          width: "100%",
          height: "100%",
          zIndex: 3,
        }}
        {...panResponder.panHandlers}
      >
        <Image style={styles.image} source={props.imageSource} />
      </Animated.View>
      <View style={styles.value}>
        <Text style={styles.text}>{props.value}</Text>
      </View>
    </View>
  );
};
const INVENTORY_ITEM_HEIGHT = 90;
const styles = StyleSheet.create({
  image: {
    height: "100%",
    width: "100%",
    zIndex: 3,
    position: "absolute",
  },
  inventorySpace: {
    width: INVENTORY_ITEM_WIDTH,
    height: INVENTORY_ITEM_WIDTH,
    backgroundColor: "gray",
    opacity: 1,
    borderColor: "#5D5D5D",
    borderWidth: 3,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
    marginHorizontal: INVENTORY_ITEM_MARGIN
  },
  value: {
    position: "absolute",
    zIndex: 4,
    borderRadius: 50,
    backgroundColor: "red",
    bottom: 0,
    right: 0,
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 20,
    alignContent: "center",
  },
});

export default DraggableImage;
