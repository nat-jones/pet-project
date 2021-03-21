import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, KeyboardAvoidingView } from "react-native";
import ForestBackground from "../Backgrounds/ForestBackground";
import { Actions } from "react-native-router-flux";
import { Item, Input, Button, Text } from "native-base";
import { useDispatch } from "react-redux";
import { setAllAccumulators } from "../../Actions/AccumulatorActions";
import { setItem } from "../../Actions/InventoryActions";
import { login } from "../../Actions/LoginActions";
import { createNewAccountWithUsernameAndPassword, setNewUserData, getUserData, firebase } from "../../Backend/firebase";

export default function NewAccount(props) {
  const dispatch = useDispatch();
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passConf, setPassConf] = useState("");
  const [errorMsg, setErrorMsg] = useState("");


  const onAuthStateChanged = async (user) => {
    if (user !== null) {
      await setNewUserData(user.uid);
      await dispatch(login(user.uid));
      let userData = await getUserData(user.uid);
      await dispatchUserData(userData);
      setLoggedIn(true);
    }
  };

  const unsubscribe = firebase.auth().onAuthStateChanged(onAuthStateChanged);

  const dispatchUserData = async (data) => {
    await dispatch(
      setAllAccumulators({
        coins: data.coins,
        xp: data.xp,
        gems: data.gems,
      })
    );
    await dispatch(setItem('dogFood', data.food));
  };

  useEffect(() => {

    if (loggedIn) {
      unsubscribe();
      Actions.main();
    }
  }, [loggedIn]);

  //const getUserData = async () => (await auth().onAuthStateChanged(onAuthStateChanged));
  return (
    <ForestBackground>
      <KeyboardAvoidingView
        behavior="position"
        style={styles.keyboardAvoidingView}>
        <ScrollView
          style={styles.formView}
          alwaysBounceHorizontal={false}
          alwaysBounceVertical={false}>
          <View style={styles.loginWindow}>
            <Text style={styles.header}>Create Account</Text>
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
            <Item regular style={styles.formItem}>
              <Input
                placeholder="Confirm Password"
                value={passConf}
                onChangeText={(e) => setPassConf(e)}
              />
            </Item>
            <Item style={styles.formItem}>
              <Button
                style={styles.button}
                title="Create Account"
                onPress={() => {
                  if (password !== passConf) {
                    setErrorMsg("Passwords don't match!");
                  } else {
                    createNewAccountWithUsernameAndPassword(username, password, setErrorMsg);
                  }
                }}
              >
                <Text>Create Account</Text>
              </Button>
            </Item>
            <Text style={[styles.link, styles.formItem]} onPress={() => {
              unsubscribe();
              Actions.login();
            }}>
              Already have an account? Sign in here!
              </Text>

            {errorMsg !== "" ? (
              <Text style={styles.error}>{"*" + errorMsg}</Text>
            ) : null}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ForestBackground>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    width: "90%",
    height: "50%",
    justifyContent: "center",

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
    height: "100%"
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