import React from "react";
import Routes from "./Routes.js";
import Store from './store';
import { Provider } from "react-redux";
import { AppRegistry } from "react-native";

function App(props) {

  return (
    <>
      <Provider store={Store}>
        <Routes />
      </Provider>

    </>
  );
}

export default App;
AppRegistry.registerComponent("App", () => App);
