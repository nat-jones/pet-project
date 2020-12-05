import React from 'react';
import { Router, Scene } from 'react-native-router-flux';
import LoginScreen from './Components/Login/LoginScreen';
import NewAccount from './Components/Login/NewAccount';
import HomeScreen from './Components/HomeScreen/HomeScreen';
import TreatThrow from './Components/TreatThrow';
import DraggableImage from './Components/Inventory/DraggableImage';

const Routes = () => (
    <Router>
        <Scene key="root" headerMode="none">
            <Scene key="home" component={HomeScreen} headerMode="none" />
            <Scene key="login" component={LoginScreen} initial={true} />
            <Scene key="newAccount" component={NewAccount} headerMode="none" />
            <Scene key="treatThrow" component={TreatThrow} headerMode="none" />
            <Scene key="drag" component={DraggableImage} headerMode="none" />
        </Scene>
    </Router>
)
export default Routes;