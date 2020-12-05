import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { Text } from "native-base";

export default function AnimalVitalsBar(props) {

    let barColor = "green"

    if (props.value < 25) {
        barColor = "red"
    }
    else if (props.value < 50) {
        barColor = "orange"
    }
    else if (props.value < 75) {
        barColor = "yellow"
    }

    const barGrow = useRef(new Animated.Value(0)).current;

    useEffect(() => {

        Animated.timing(
            barGrow, {
            toValue: props.value * 2,
            duration: 500,
            useNativeDriver: false
        }
        ).start()

    }, [props.value]);

    return (
        <View style={styles.barView}>

            <View style={styles.barCategory}>
                <Text style={styles.fontStyle}>{props.category + ": "}</Text>

            </View>
            <View style={styles.fullBar}>

                <Animated.View style={
                    [styles.partialBar, {
                        width: barGrow,
                        backgroundColor: barColor,
                    }
                    ]} />
            </View>
        </View>);
}

const styles = StyleSheet.create({
    barView: {
        flexDirection: "row",
        marginTop: 10,
        marginBottom: 10
    },
    barCategory: {
        width: 100
    },
    fontStyle: {
        fontWeight: "800"
    },
    fullBar: {
        borderColor: "blue",
        borderWidth: 2,
        width: 204,
        borderRadius: 20,
        backgroundColor: "gray",
        opacity: 0.7
    },
    partialBar: {
        borderRadius: 30,
        height: 20,
    }
});
