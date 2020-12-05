import React from "react";
import { ImageBackground, StyleSheet } from "react-native";

const forestImage = require("../../assets/homescreenBackground.jpg");

export default function ForestBackground(props) {

    return (
        <ImageBackground source={forestImage} style={styles.root} >
            { props.children}
        </ImageBackground >
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    }
});