import React, { useState, useRef, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import {
    width,
    height,
    WORK_BUS_HEIGHT,
    WORK_BUS_MARGIN_BOTTOM,
    CAREER_SCREEN_BUTTON_AREA_HEIGHT,
    CAREER_SCREEN_BUTTON_AREA_PADDING,
    WINDOW_WIDTH,
    CAREER_SCREEN_HEADER_HEIGHT,
    CAREER_SCREEN_HEADER_POSITION_TOP
} from '../../layoutConsts';
import SelectCareerScreen from './SelectCareerScreen';
import { useSelector, useDispatch, connect } from 'react-redux';
import OverlayContainer from '../Containers/OverlayContainer';
import { startShift } from '../../Actions/CareerActions';
import { hideAnimal, showAnimal } from '../../Actions/AnimalLocationActions';
import { updateStartedShift } from '../../Backend/firebase';
import CareerWorkMenu from './CareerWorkMenu';
import { reduxAndFirebaseAddCoins, reduxAndFirebaseReduceShift, reduxAndFirebaseStartShift } from "../../ReduxBackendWrappers";

var timeouts = [];

function CareerBackground(props) {

    const careerInfo = useSelector(state => state.career.career);
    const career = useSelector(state => state.career);
    const expectedShiftEnd = useSelector(state => state.career.expectedShiftEnd);
    const shiftType = useSelector(state => state.career.lastShiftType);
    const animalIsShown = useSelector(state => state.animalLocation.show);
    const busX = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const shiftTimeRemaining = useRef(new Animated.Value(0)).current;
    const [showShiftOptions, setShowShiftOptions] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        for (i = 0; i < timeouts.length; i++) {
            clearTimeout(timeouts[i]);
        }
        timeouts = [];
        if (!animalIsShown) {

            timeouts.push(setTimeout(checkShiftEnd, 1000));
        }
    }, [animalIsShown, expectedShiftEnd])

    const sendBusToDog = () => {
        Animated.timing(
            busX,
            {
                toValue: width,
                duration: 2000,
                useNativeDriver: false
            }
        ).start(() => dispatch(hideAnimal()))
    };

    const sendBusToWork = (callback) => {

        Animated.timing(
            busX,
            {
                toValue: width * 4,
                duration: 3000,
                useNativeDriver: false
            }
        ).start(() => { if (callback) { callback() } })
    };

    const sendBusFromWork = () => {
        Animated.timing(
            busX,
            {
                toValue: width,
                duration: 3000,
                useNativeDriver: false
            }
        ).start(() => {
            dispatch(showAnimal())
        });
    };

    const sendBusFromDog = () => {

        Animated.timing(
            busX,
            {
                toValue: 0,
                duration: 2000,
                useNativeDriver: false
            }
        ).start();
    };

    const fadeIn = async () => {
        await setShowShiftOptions(true);
        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                duration: 150,
                useNativeDriver: false
            }
        ).start();
    };

    const fadeOut = async (callback) => {

        Animated.timing(
            fadeAnim,
            {
                toValue: 0,
                duration: 150,
                useNativeDriver: false
            }
        ).start(() => {
            if (callback) { callback() }
            setShowShiftOptions(false)
        }
        );
    };

    const returnFromShift = async () => {
        sendBusFromWork();
        setTimeout(sendBusFromDog, 3000)
        reduxAndFirebaseAddCoins(dispatch, shiftType);

    };


    const dispatchShift = async (shiftType) => {

        fadeOut();
        sendBusToDog();
        reduxAndFirebaseStartShift(dispatch, shiftType);
        setTimeout(
            () => {
                sendBusToWork();
            }
            , 3000);


    };

    const formatShiftTimeRemaining = (seconds) => {
        let date = new Date(seconds);

        return (date.toLocaleTimeString());
    }

    const checkShiftEnd = () => {

        let date = new Date();

        if (date.getTime() > expectedShiftEnd) {
            for (i = 0; i < timeouts.length; i++) {
                clearTimeout(timeouts[i])
            }
            timeouts = []
            returnFromShift();
        }
        else {
            timeouts.push(setTimeout(checkShiftEnd, 1000))
        }
    }

    return (
        <View style={styles.pageContainer}>
            {!animalIsShown &&
                <View style={styles.awayMessageContainer}>
                    <View>

                        <Text style={styles.awayMessage}>Your dog is at work!</Text>
                        <Text style={styles.awayMessage}> {"It will return at " +
                            formatShiftTimeRemaining(expectedShiftEnd)}
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.reduceShiftButton} onPress={() => reduxAndFirebaseReduceShift(dispatch, expectedShiftEnd)}>
                        <Text style={styles.reduceShiftButtonText}>Reduce Shift</Text>
                    </TouchableOpacity>
                </View>}

            <>
                <TouchableOpacity style={styles.busButton} onPress={fadeIn}>
                    <Animated.View style={{
                        transform: [{ translateX: busX }]
                    }}>

                        <Image style={styles.workBus} source={require('../../assets/workBus.png')}>

                        </Image>
                        <View style={styles.workIcon}>
                            {careerInfo.icon}
                        </View>
                    </Animated.View>
                </TouchableOpacity>
                <CareerWorkMenu
                    fadeOut={fadeOut}
                    fadeAnim={fadeAnim}
                    showShiftOptions={showShiftOptions}
                    setShowShiftOptions={setShowShiftOptions}
                    setShowCareerSelection={props.setShowCareerSelection}
                    dispatchShift={dispatchShift}
                />
            </>



        </View>
    )
}

export default function CareerScreen(props) {

    const careerId = useSelector(state => state.career.career.id)

    const [showCareerSelection, setShowCareerSelection] = useState(careerId === null);


    return (
        <OverlayContainer front={
            showCareerSelection ?
                <SelectCareerScreen setShowCareerSelection={setShowCareerSelection} /> : null}
            behind={< CareerBackground setShowCareerSelection={setShowCareerSelection} />} />
    )
}


const styles = StyleSheet.create(
    {
        pageContainer: {
            width: width,
            height: height,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
        },
        workBus: {
            resizeMode: 'contain',
            width: width,
            height: WORK_BUS_HEIGHT,
            position: 'absolute',
        },
        busButton: {
            width: width,
            height: WORK_BUS_HEIGHT,
            position: 'absolute',
            bottom: WORK_BUS_MARGIN_BOTTOM,
            zIndex: 2
        },
        button: {
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
            backgroundColor: 'gold',
            width: CAREER_SCREEN_HEADER_HEIGHT - 16,
            height: CAREER_SCREEN_HEADER_HEIGHT - 16,
        },
        buttonArea: {
            height: CAREER_SCREEN_BUTTON_AREA_HEIGHT,
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: CAREER_SCREEN_BUTTON_AREA_PADDING,
        },
        header: {
            width: WINDOW_WIDTH,
            height: CAREER_SCREEN_HEADER_HEIGHT,
            borderRadius: 5,
            borderColor: 'gold',
            borderWidth: 3,
            position: 'absolute',
            top: CAREER_SCREEN_HEADER_POSITION_TOP,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            backgroundColor: 'rgba(153, 130, 0, .5)',
            padding: 5
        },
        headerText: {
            fontFamily: 'Didot-Italic',
            fontWeight: '900',
            color: 'gold',
            fontSize: 50
        },

        workIcon: {
            position: "absolute",
            top: WORK_BUS_HEIGHT * .55,
            left: WINDOW_WIDTH * .6
        },
        awayMessage: {
            fontSize: 30,
            textAlign: "center",
            fontFamily: 'Didot-Italic',
            color: "#998200"
        },
        awayMessageContainer: {
            alignItems: "center",
            justifyContent: "space-evenly",
            backgroundColor: '#FFFDD0',
            borderColor: "gold",
            borderWidth: 3,
            borderRadius: 5,
            width: WINDOW_WIDTH,
            height: WORK_BUS_HEIGHT,
            position: 'absolute',
            bottom: WORK_BUS_MARGIN_BOTTOM,
            zIndex: 3
        },
        reduceShiftButton: {
            width: "auto",
            height: "auto",
            padding: "5%",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
            backgroundColor: "gold"
        },
        reduceShiftButtonText: {
            fontFamily: 'Didot-Italic',
            fontSize: 20,

        }

    }
)