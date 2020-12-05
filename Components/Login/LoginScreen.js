import React, { useState, useEffect } from 'react';
import { Item, Input, Button, Text } from 'native-base';
import { Actions } from "react-native-router-flux";
import { View, StyleSheet } from 'react-native';
import ForestBackground from '../Backgrounds/ForestBackground';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../Actions/LoginActions';
import { setAllAccumulators } from '../../Actions/AccumulatorActions';
import { setAllBars } from '../../Actions/BarActions';
import { setFood } from '../../Actions/FoodActions';
import { firebase, loginWithUsernameAndPassword, getUserData } from "../../firebase";

//import { GoogleSignin } from '@react-native-community/google-signin';



// async function onGoogleButtonPress() {
//     // Get the users ID token
//     const { idToken } = await GoogleSignin.signIn();

//     // Create a Google credential with the token
//     const googleCredential = auth.GoogleAuthProvider.credential(idToken);

//     // Sign-in the user with the credential
//     return auth().signInWithCredential(googleCredential);
// }


export default function LoginScreen(props) {

    const dispatch = useDispatch();
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(false);
    const goToHome = () => { Actions.home() };

    const onAuthStateChanged = async (user) => {
        if (user !== null) {
            setLoggedIn(true);
            dispatch(login(user.uid));
            let userData = await getUserData(user.uid);
            await setAllUserData(userData);
        }
        // Do other things
    };

    const setAllUserData = async (data) => {
        await dispatch(setAllAccumulators({
            coins: data.coins,
            xp: data.xp,
            gems: data.gems
        }));
        await dispatch(setAllBars({
            love: data.love,
            cleanliness: data.cleanliness,
            hunger: data.hunger,
            exercise: data.exercise
        }));
        await dispatch(setFood(data.food));
    }

    useEffect(() => {

        let unsubscribe = firebase.auth().onAuthStateChanged(onAuthStateChanged);

        if (loggedIn) {
            unsubscribe();
            Actions.home();
        }

    });

    return (
        <ForestBackground>
            <View style={styles.loginWindow}>
                <Text style={styles.header}>Login</Text>
                <Item regular>
                    <Input placeholder="Email" value={username} onChangeText={(e) => setUsername(e)} />
                </Item>
                <Item regular>
                    <Input placeholder="Password" value={password} onChangeText={(e) => setPassword(e)} />
                </Item>
                <Item>
                    <Button
                        title="sign in"
                        onPress={() => loginWithUsernameAndPassword(username, password)} >

                        <Text>Login</Text>
                    </Button>
                </Item>
                <Text style={styles.link} onPress={Actions.newAccount}>Create new account</Text>
            </View>
        </ForestBackground>
    );
}

const styles = StyleSheet.create({
    loginWindow: {
        width: "90%",
        opacity: .9,
        height: "40%",
        borderRadius: 10,
        backgroundColor: "white",
        justifyContent: "space-evenly",
        alignItems: "center",
        flexDirection: "column",
        borderColor: "gold",
        padding: 10,
        borderWidth: 3
    },
    link: {
        color: "blue"
    },
    header: {
        color: "gold",
        fontSize: 40
    },
    error: {
        color: "red"
    }

})