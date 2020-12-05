import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import { Button, Icon } from "native-base";
import ForestBackground from "../Backgrounds/ForestBackground";
import AnimalVitalsWindow from "./AnimalVitalsWindow";
import HomeTopBar from "./HomeTopBar";
import InventoryDropDown from '../Inventory/InventoryDropDown';
//import firestore from '@react-native-firebase/firestore';
import TestLoadingScreen from "../LoadingScreens/TestLoadingScreen";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../Actions/LoginActions";
import { setAllAccumulators } from '../../Actions/AccumulatorActions';
import { firebase } from "../../firebase";
import { Actions } from 'react-native-router-flux';




export default function HomeScreen(props) {

    const userID = useSelector(state => state.userID);
    const store = useSelector(state => state);
    const testAnimal = require("../../assets/testAnimal.png");
    const [itemDropZone, setItemDropZone] = useState({});
    const animalRef = useRef();

    const dispatch = useDispatch();
    const xp = useSelector(state => state.accumulators.xp);
    const [didLoad, setLoaded] = useState(true);

    useEffect(() => {
        if (animalRef.current) {
            console.log(Object.keys(animalRef.current));
        }
    })

    if (!didLoad) {
        return (
            <TestLoadingScreen />
        );
    }
    return (

        <ForestBackground>
            <View style={styles.homeScreenView}>

                <HomeTopBar value={200} />

                <View style={styles.buttonArea}>

                    <InventoryDropDown itemDropZone={itemDropZone} />

                    <View style={styles.buttonLine}>
                        <Button title="games" style={styles.button} onPress={() => Actions.treatThrow()}>
                            <Icon type="FontAwesome5" name="dice" style={styles.icon} />
                        </Button>
                        <Button title="info" style={styles.button} onPress={() => {
                            firebase.auth().signOut();
                            dispatch(logout());
                            Actions.login();
                        }}>
                            <Icon type="MaterialCommunityIcons" name="dog" style={styles.icon} />
                        </Button>

                    </View>

                    <View style={styles.buttonLine}>
                        <Button title="friends" style={styles.button}>
                            <Icon type="FontAwesome5" name="user-friends" style={styles.icon} onPress={() => Actions.drag()} />
                        </Button>
                        <Button title="store" style={styles.button}>
                            <Icon type="FontAwesome5" name="coins" style={styles.icon} />
                        </Button>
                    </View>
                </View>
                <View style={styles.animalImageView}
                    onLayout={event => {
                        const layout = event.nativeEvent.layout;
                        console.log(layout);
                        let dims = {
                            'bottom': layout.y + layout.height,
                            'right': layout.width + layout.x,
                            'left': layout.x,
                            'top': layout.y
                        }

                        setItemDropZone(dims);
                    }}
                >
                    <Image source={testAnimal} key={"animalImage"} style={styles.animalImage} />
                </View>
                <AnimalVitalsWindow />

                <StatusBar style="auto" />

            </View>
        </ForestBackground>
    );
}

const styles = StyleSheet.create({
    homeScreenView: {
        width: "100%",
        height: "100%",
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    animalImageView: {
        height: "35%",
        borderColor: "red",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        zIndex: 1
    },
    animalImage: {
        height: "100%",
        aspectRatio: 8 / 9,
        flex: 1,
        resizeMode: "cover",
        position: "relative",
        zIndex: 1
    },
    buttonArea: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    buttonLine: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    button: {
        marginTop: "2%",
        marginBottom: "2%",
        width: 60,
        height: 60,
        backgroundColor: "gold",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2
    },
    icon: {
        color: "#bf9700",
        opacity: .8
    },
    buttonText: {
        fontSize: 20,
        color: "#bf9700"
    }
});
