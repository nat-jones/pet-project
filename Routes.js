import React from "react";
import { Router, Scene } from "react-native-router-flux";
import LoginScreen from "./Components/Login/LoginScreen";
import NewAccount from "./Components/Login/NewAccount";
import MainView from "./Components/MainView";
import TestLoadingScreen from './Components/LoadingScreens/TestLoadingScreen';

const Routes = () => (
  <Router>
    <Scene key="root" headerMode="none">
      <Scene key="main" component={MainView} headerMode="none" gesturesEnabled={false} />
      <Scene key="login" component={LoginScreen} initial={true} gesturesEnabled={false} />
      <Scene key="newAccount" component={NewAccount} headerMode="none" gesturesEnabled={false} />
      <Scene key='loading' component={TestLoadingScreen} headerMode='none' gesturesEnabled={false} />
    </Scene>
  </Router>
);
export default Routes;
