import React from 'react';
import Routes from './Routes.js';
import { createStore } from 'redux';
import MasterReducer from './Reducers/MasterReducer';
import { Provider } from 'react-redux';
import { AppRegistry } from 'react-native';

function App(props) {

  const store = createStore(MasterReducer);

  return (
    <>
      <Provider store={store}>
        < Routes />
      </Provider>
    </>
  );
}


export default App;
AppRegistry.registerComponent('App', () => App)
