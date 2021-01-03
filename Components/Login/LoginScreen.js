import React, { useState, useEffect } from "react";
import { Item, Input, Button, Text } from "native-base";
import { Actions } from "react-native-router-flux";
import {
    View,
    StyleSheet,
    KeyboardAvoidingView,
    ScrollView,
} from "react-native";
import ForestBackground from "../Backgrounds/ForestBackground";
import { useDispatch } from "react-redux";
import { login } from "../../Actions/LoginActions";
import { setAllAccumulators } from "../../Actions/AccumulatorActions";
import { setAllBars } from "../../Actions/BarActions";
import { setFood } from "../../Actions/FoodActions";
import { dispatchAllData } from './LoginFunctions';
import {
    firebase,
    loginWithUsernameAndPassword,
    getUserData,
} from "../../firebase";

/* This component represents the login screen for returning users*/

export default function LoginScreen(props) {


    const dispatch = useDispatch();
    const [loggedIn, setLoggedIn] = useState(false); //boolean to determine whether user is logged
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const goToHome = () => {
        Actions.home();
    };

    /* 
    A function to be passed to the onAuthStateChanged event listener.
    Will pull user data from firebase and call apropriate dispatch functions to load
    it into global store
    */
    const onAuthStateChanged = async (user) => {
        if (user !== null) {
            setLoggedIn(true);
            dispatchAllData(user);
        }
    };

    const unsubscribe = firebase.auth().onAuthStateChanged(onAuthStateChanged);

    // copies all user data into global store
    // const dispatchUserData = async (data) => {
    //     await dispatch(
    //         setAllAccumulators({
    //             coins: data.coins,
    //             xp: data.xp,
    //             gems: data.gems,
    //         })
    //     );
    //     await dispatch(
    //         setAllBars({
    //             love: data.love,
    //             cleanliness: data.cleanliness,
    //             hunger: data.hunger,
    //             exercise: data.exercise,
    //             lastFed: data.lastFed,
    //             lastCleaned: data.lastCleaned,
    //             lastLoved: data.lastLoved,
    //             lastExercised: data.lastExercised
    //         })
    //     );
    //     await dispatch(setFood(data.food));
    // };

    /* 
    attatches the onAuthStateChanged function to the appropriate listener
    If were logged in, it will route to home
    */
    useEffect(() => {

        if (loggedIn) {
            unsubscribe();
            Actions.main();
        }
    }, [loggedIn]);

    return (
        <ForestBackground>

            <KeyboardAvoidingView
                behavior="position"
                style={styles.keyboardAvoidingView}
            >

                <ScrollView
                    style={styles.formView}
                    alwaysBounceHorizontal={false}
                    alwaysBounceVertical={false}>

                    <View style={styles.loginWindow}>
                        <Text style={styles.header}>Login</Text>
                        <Item regular style={styles.formItem}>
                            <Input
                                placeholder="Email"
                                value={username}
                                onChangeText={(e) => setUsername(e)}
                            />
                        </Item>
                        <Item regular style={styles.formItem}>
                            <Input
                                placeholder="Password"
                                value={password}
                                onChangeText={(e) => setPassword(e)}
                            />
                        </Item>
                        <Item style={styles.formItem}>
                            <Button
                                title="sign in"
                                onPress={() => loginWithUsernameAndPassword(username, password)}
                            >
                                <Text>Login</Text>
                            </Button>
                        </Item>
                        <Text style={[styles.link, styles.formItem]} onPress={() => {
                            unsubscribe();
                            Actions.newAccount();
                        }}>
                            Create new account
                        </Text>
                    </View>
                </ScrollView>

            </KeyboardAvoidingView>
        </ForestBackground>
    );
}

const styles = StyleSheet.create({
    keyboardAvoidingView: {
        width: "90%",
        height: "40%",
    },
    loginWindow: {
        width: "100%",
        opacity: 0.9,
        height: "100%",
        borderRadius: 10,
        backgroundColor: "white",
        justifyContent: "space-evenly",
        alignItems: "center",
        flexDirection: "column",
        borderColor: "gold",
        padding: 10,
        borderWidth: 3,
    },
    formView: {
        width: "100%",
        height: "100%",
    },
    link: {
        color: "blue",
    },
    header: {
        color: "gold",
        fontSize: 40,
    },
    error: {
        color: "red",
    },
    formItem: {
        marginTop: 10,
        marginBottom: 10
    }
});
