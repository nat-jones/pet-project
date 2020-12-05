import React from 'react';
import { StyleSheet, View, ImageBackground, Image } from 'react-native';
import AnimalVitalBar from "./AnimalVitalBar"
import { useSelector } from 'react-redux';

export default function AnimalVitalsWindow(props) {

    const loveVal = useSelector(state => state.bars.love);
    const cleanVal = useSelector(state => state.bars.cleanliness);
    const hungerVal = useSelector(state => state.bars.hunger);
    const exerciseVal = useSelector(state => state.bars.exercise);

    return (
        <View style={styles.background}>

            <AnimalVitalBar category="love" value={loveVal}></AnimalVitalBar>
            <AnimalVitalBar category="cleanliness" value={cleanVal}></AnimalVitalBar>
            <AnimalVitalBar category="hunger" value={hungerVal}></AnimalVitalBar>
            <AnimalVitalBar category="exercise" value={exerciseVal}></AnimalVitalBar>

        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        justifyContent: "center",
        width: "100%",
        backgroundColor: "gold",
        margin: 10,
        borderRadius: 10,
        padding: 10
    }

});