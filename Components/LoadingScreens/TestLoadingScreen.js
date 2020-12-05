import React from 'react';
import ForestBackground from "../Backgrounds/ForestBackground";
import { Spinner } from "native-base";



export default function TestLoadingScreen(props) {

    return (
        <ForestBackground>
            <Spinner></Spinner>
        </ForestBackground>
    )
}