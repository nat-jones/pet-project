import React, { useRef } from "react";
import { Animated, View, Image, StyleSheet, PanResponder, Text } from "react-native";
import { useDispatch } from 'react-redux';
import { decrementFood } from '../../Actions/FoodActions';
import { addToBar } from '../../Actions/BarActions';

const DraggableImage = (props) => {

    const pan = new Animated.ValueXY();
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const dispatch = useDispatch();


    const fadeOut = () => {


        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false
        }).start(
            () => {
                dispatch(decrementFood());
                dispatch(addToBar("hunger", 25));
                dispatch(addToBar("love", 10));
                pan.setValue({ x: 0, y: 0 });
                fadeAnim.setValue(1);
            }
        );

    }

    const isInDropZone = (gestureState) => {
        return gestureState.moveX > props.itemDropZone.left &&
            gestureState.moveX < props.itemDropZone.right &&
            gestureState.moveY > props.itemDropZone.top &&
            gestureState.moveY < props.itemDropZone.bottom
    }

    const panResponder =
        PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,

            onPanResponderMove: (evt, gestureState) => {
                pan.setValue({ x: gestureState.dx, y: gestureState.dy });
            },
            onPanResponderRelease: (evt, gestureState) => {

                if (isInDropZone(gestureState)) {
                    fadeOut();
                }
                else {
                    Animated.spring(pan, {
                        toValue: { x: 0, y: 0 },
                        friction: 10,
                        useNativeDriver: false
                    }).start();
                }

            }
        })


    return (
        <View style={styles.inventorySpace}>
            <Image
                style={[{ zIndex: 1 }, styles.image]}
                source={props.imageSource}
            />
            <Animated.View
                style={{
                    transform: [{ translateX: pan.x }, { translateY: pan.y }],
                    opacity: fadeAnim,
                    width: "100%",
                    height: "100%",
                    zIndex: 3
                }}
                {...panResponder.panHandlers}
            >

                <Image
                    style={styles.image}
                    source={props.imageSource}
                />
            </Animated.View>
            <View style={styles.value}>
                <Text style={styles.text}>
                    {props.value}
                </Text>
            </View>
        </View>
    );
}
const INVENTORYITEMHEIGHT = 110
const styles = StyleSheet.create({

    image: {
        height: "100%",
        width: "100%",
        zIndex: 3,
        position: "absolute",

    },
    inventorySpace: {
        width: "30%",
        height: 110,
        backgroundColor: "gray",
        opacity: 1,
        borderColor: "#5D5D5D",
        borderWidth: 3,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2
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
        justifyContent: "center"
    },
    text: {
        color: "white",
        fontSize: 20,
        alignContent: "center"
    }
});

export default DraggableImage;