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
import { useSelector, useDispatch } from 'react-redux';
import OverlayContainer from '../Containers/OverlayContainer';
import { startShift } from '../../Actions/CareerActions';
import { hideAnimal, showAnimal } from '../../Actions/AnimalLocationActions';
import { updateStartedShift } from '../../Backend/firebase';
import CareerWorkMenu from './CareerWorkMenu';


function CareerBackground(props) {

    const careerInfo = useSelector(state => state.career.career);
    const shiftStart = useSelector(state => state.career.lastShiftStart);
    const shiftType = useSelector(state => state.career.lastShiftType);
    const busX = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const shiftTimeRemaining = useRef(new Animated.Value(0)).current;
    const [showShiftOptions, setShowShiftOptions] = useState(false);
    const dispatch = useDispatch();

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
        ).start(callback)
    };

    const sendBusFromWork = () => {
        Animated.timing(
            busX,
            {
                toValue: width,
                duration: 3000,
                useNativeDriver: false
            }
        ).start(() => dispatch(showAnimal()));
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

    const dispatchShift = async (shiftType) => {
        let date = new Date();
        let time = date.getTime();
        fadeOut();
        sendBusToDog();
        setTimeout(() => sendBusToWork(startShiftCountdown), 3000);
        await updateStartedShift(time, shiftType);
        await dispatch(startShift(time, shiftType));
    };

    const returnFromShift = async () => {
        sendBusFromWork();
        setTimeout(sendBusFromDog, 3000)
    };

    const startShiftCountdown = async () => {
        shiftDuration = calculateShiftTimeRemaining();
        Animated.timing(
            shiftTimeRemaining,
            {
                toValue: 0,
                fromValue: shiftDuration,
                duration: shiftDuration,
                useNativeDriver: false
            }
        ).start()
    }

    const calculateShiftTimeRemaining = () => {

        let shiftDuration = 0;
        let date = new Date();
        if (props.shiftType === "short") {
            shiftDuration = 36000000;
        }
        else if (props.shiftType === "medium") {
            shiftDuration = 3600000 * 4;
        }
        else if (props.shiftType === "long") {
            shiftDuration = 3600000 * 8
        }
        else {
            return 0;
        }

        if (!lastShiftStart) {
            return 0;
        }

        return lastShiftStart + shiftDuration - date.getTime();
    }

    return (
        <View style={styles.pageContainer}>
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
            {
                shiftTimeRemaining.value > 0 ?
                    <Animated.Text>{shiftTimeRemaining.value}</Animated.Text>
                    : <CareerWorkMenu
                        sendBusToWork={sendBusToDog}
                        fadeAnim={fadeAnim}
                        fadeOut={fadeOut}
                        showShiftOptions={showShiftOptions}
                        setShowShiftOptions={setShowShiftOptions}
                        setShowCareerSelection={props.setShowCareerSelection}
                        startShiftCountdown={startShiftCountdown}
                        sendBusToDog={sendBusToDog}
                        sendBusToWork={sendBusToWork}
                    />}

        </View>
    )
}

export default function CareerScreen(props) {

    const [showCareerSelection, setShowCareerSelection] = useState(true);

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
            justifyContent: 'flex-end',
            alignItems: 'center',
            position: 'relative',
        },
        workBus: {
            resizeMode: 'center',
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
        }

    }
)