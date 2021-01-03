import React from "react";
import { Router, Scene } from "react-native-router-flux";
import LoginScreen from "./Components/Login/LoginScreen";
import NewAccount from "./Components/Login/NewAccount";
import MainView from "./Components/MainView";
import TreatThrow from "./Components/TreatThrow";
import DraggableImage from "./Components/Inventory/DraggableImage";

const Routes = () => (
  <Router>
    <Scene key="root" headerMode="none">
      <Scene key="main" component={MainView} headerMode="none" gesturesEnabled={false} />
      <Scene key="login" component={LoginScreen} initial={true} gesturesEnabled={false} />
      <Scene key="newAccount" component={NewAccount} headerMode="none" gesturesEnabled={false} />
      <Scene key="treatThrow" component={TreatThrow} headerMode="none" gesturesEnabled={false} />
      <Scene key="drag" component={DraggableImage} headerMode="none" gesturesEnabled={false} />
    </Scene>
  </Router>
);
export default Routes;
