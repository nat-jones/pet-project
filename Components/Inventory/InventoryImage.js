import React, { useRef, useState, useEffect } from "react";
import {
  Animated,
  View,
  Image,
  StyleSheet,
  PanResponder,
  Text,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { clearDragItem, setDragItem } from '../../Actions/DragActions';
import {
  INVENTORY_CARET_WIDTH,
  INVENTORY_ITEM_MARGIN,
  INVENTORY_ITEM_WIDTH,
  INVENTORY_LIST_WIDTH,
  INVENTORY_POSITION_TOP,
  TRAINING_INPUT_WINDOW_POSITION_TOP,
  height
} from "../../layoutConsts";


const InventoryImage = (props) => {

  const pan = useRef(new Animated.ValueXY());
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const offsetRef = useRef(null);

  const dispatch = useDispatch();
  const [location, setLocation] = useState({ x: 0, y: 0 })
  const animalLocation = useSelector((store) => store.animalLocation);
  const attempt = useSelector(state => state.training.guess);


  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start(async () => {
      await props.onUse(dispatch);
      pan.current.setValue({ x: 0, y: 0 });
      fadeAnim.setValue(1);
      dispatch(clearDragItem());
    });
  };

  const isInDropZone = (gestureState) => {
    if (props.menu === "Training" && attempt === null) {
      return false
    }
    return (
      gestureState.moveX > animalLocation.left &&
      gestureState.moveX < animalLocation.right &&
      gestureState.moveY > animalLocation.top &&
      gestureState.moveY < animalLocation.bottom
    );
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onPanResponderStart: function (e, gestureState) {
      if (props.value > 0) {
        dispatch(setDragItem(props, pan, location))
      }
    },

    onPanResponderMove: (evt, gestureState) => {
      if (props.value > 0) {
        pan.current.setValue({ x: gestureState.dx, y: gestureState.dy });
      }
    },
    onPanResponderRelease: (evt, gestureState) => {

      if (isInDropZone(gestureState) && props.value > 0 && animalLocation.show) {
        fadeOut();
      } else {
        Animated.timing(pan.current, {
          toValue: { x: 0, y: 0 },
          duration: 200,
          useNativeDriver: false,
        }).start(() => dispatch(clearDragItem()));
      }

    },
  });

  return (
    <View
      style={[styles.inventorySpace, { width: props.width ?? INVENTORY_ITEM_WIDTH, height: props.height ?? INVENTORY_ITEM_WIDTH }]}
      onLayout={(event) => {
        const layout = event.nativeEvent.layout;
        let x = layout.x % INVENTORY_LIST_WIDTH + (props.menu === "Inventory" ? INVENTORY_CARET_WIDTH : 0)
        let y = layout.y + 10 + (props.menu === "Inventory" ? INVENTORY_POSITION_TOP : TRAINING_INPUT_WINDOW_POSITION_TOP + height / 12)

        setLocation({
          x: x,
          y: y
        });
      }
      }
    >
      <Image
        style={[{ zIndex: 1 }, styles.image]}
        source={props.imageSrc}
        resizeMode="contain"
      />
      <Animated.View
        style={{
          transform: [{ translateX: pan.current.x }, { translateY: pan.current.y }],
          opacity: fadeAnim,
          width: "100%",
          height: "100%",
          zIndex: 3,

        }}
        {...panResponder.panHandlers}
      >

      </Animated.View>
      <View style={styles.value}>
        <Text style={styles.text}>{props.value}</Text>
      </View>
    </View>
  );
};
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

export default InventoryImage;
