import React, { useRef, useState, useEffect } from "react";
import { View, Animated, StyleSheet, Image, PanResponder } from 'react-native';
import { Button, Text } from 'native-base';
import { useSelector } from 'react-redux';

import DraggableImage from './DraggableImage'

export default function InventoryDropDown(props) {

    const [isVisible, setOverflow] = useState(false);
    const [topOffset, setTopOffset] = useState(props.itemDropZone.y);

    const dropAnim = useRef(new Animated.Value(0)).current;
    const DOGFOODPATH = require('../../assets/dogFood.png');
    const DOGBONEPATH = require('../../assets/dogBone.png');
    const TENNISBALLPATH = require('../../assets/tennisBall.png');

    const food = useSelector(state => state.food);

    const dropIn = () => {
        Animated.timing(dropAnim, {
            toValue: 150,
            duration: 200,
            useNativeDriver: false
        }).start();
        setOverflow(true);
    };
    const dropOut = () => {
        Animated.timing(dropAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false
        }).start();
        setOverflow(false);
    };

    return (

        < View
            style={{ width: "100%", zIndex: 2 }}
            onLayout={event => console.log(event.nativeEvent.layout.y)}
        >
            <Button title="Inventory" style={styles.wideButton} onPress={() => {
                if (isVisible) {

                    dropOut();
                }
                else {

                    dropIn();
                }

            }}>
                <Text style={styles.buttonText}>INVENTORY</Text>
            </Button>
            <Animated.View style={
                [styles.menuBox, {
                    height: dropAnim,
                    overflow: isVisible ? "visible" : "hidden",
                }]} >

                <DraggableImage imageSource={DOGFOODPATH} value={food} itemDropZone={props.itemDropZone} />

                <DraggableImage imageSource={DOGBONEPATH} value={1} itemDropZone={props.itemDropZone} />

                <DraggableImage imageSource={TENNISBALLPATH} value={1} itemDropZone={props.itemDropZone} />

            </Animated.View>

        </View >
    );
}

const styles = StyleSheet.create({
    menuBox: {
        width: "100%",
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
        display: "flex",
        flexDirection: "row",
        backgroundColor: "gold",
        position: "absolute",
        alignItems: "center",
        justifyContent: "space-evenly",
        top: 73,
        zIndex: 1,
        opacity: 1
    },
    wideButton: {
        marginTop: "2%",
        width: "100%",
        height: 70,
        backgroundColor: "gold",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        zIndex: 2
    },
    buttonText: {
        fontSize: 20,
        color: "#bf9700"
    }
})



