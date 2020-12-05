import React, { useState, useEffect } from "react";
import { View, StyleSheet } from 'react-native';
import ForestBackground from '../Backgrounds/ForestBackground';
import { Actions } from "react-native-router-flux";
import { Item, Input, Button, Text } from 'native-base';
//import auth, { firebase } from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';
//import firestore from '@react-native-firebase/firestore';
import { login } from '../../Actions/LoginActions';
import { createNewAccountWithUsernameAndPassword } from "../../firebase";



export default function NewAccount(props) {


    const dispatch = useDispatch();
    const [didCreateUserData, setDidCreateUserData] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passConf, setPassConf] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    // Handle user state changes


    //const getUserData = async () => (await auth().onAuthStateChanged(onAuthStateChanged));
    return (
        <ForestBackground>

            <View style={styles.loginWindow}>
                <Text style={styles.header}>Create Account</Text>
                <Item regular>
                    <Input placeholder="Email" value={username} onChangeText={(e) => setUsername(e)} />
                </Item>
                <Item regular>
                    <Input placeholder="Password" value={password} onChangeText={(e) => setPassword(e)} />
                </Item>
                <Item regular>
                    <Input placeholder="Confirm Password" value={setPassConf} onChangeText={(e) => setPassConf(e)} />
                </Item>
                <Item>
                    <Button
                        style={styles.button}
                        title="Create Account"
                        onPress={() => {
                            if (password !== passConf) {
                                setErrorMsg("Passwords don't match!");
                            }
                            else {
                                createNewAccountWithUsernameAndPassword(username, password);
                            }
                        }
                        }>

                        <Text>Create Account</Text>
                    </Button>
                </Item>
                {errorMsg !== "" ? <Text style={styles.error}>{"*" + errorMsg}</Text> : null}
            </View>
        </ForestBackground >
    );
}

const styles = StyleSheet.create({
    loginWindow: {
        width: "90%",
        opacity: .9,
        height: "55%",
        borderRadius: 10,
        backgroundColor: "white",
        justifyContent: "space-evenly",
        alignItems: "center",
        flexDirection: "column",
        borderColor: "gold",
        padding: 10,
        borderWidth: 5
    },

    error: {
        color: "red"
    },
    header: {
        color: "gold",
        fontSize: 40
    }

})