import React, { useState, useRef } from 'react';
import { View, Image, Text, TouchableOpacity, Modal, Animated, StyleSheet } from 'react-native';
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
import { Icon } from 'native-base';
import { startShift } from '../../Actions/CareerActions';
import { hideAnimal, showAnimal } from '../../Actions/AnimalLocationActions';
import { updateStartedShift } from '../../firebase';


function CareerBackground(props) {

    const careerInfo = useSelector(state => state.career);
    const busX = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;
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

    const sendBusToWork = () => {
        Animated.timing(
            busX,
            {
                toValue: width * 4,
                duration: 3000,
                useNativeDriver: false
            }
        ).start()
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

    const fadeOut = async () => {

        Animated.timing(
            fadeAnim,
            {
                toValue: 0,
                duration: 150,
                useNativeDriver: false
            }
        ).start(() => setShowShiftOptions(false));
    };

    const dispatchShift = async (shiftType) => {
        let date = new Date();
        let time = date.getTime();
        fadeOut();
        sendBusToDog();
        setTimeout(sendBusToWork, 3000);
        await updateStartedShift(time, shiftType);
        await dispatch(startShift(time, shiftType));
    };

    const returnFromShift = async () => {
        sendBusFromWork();
        setTimeout(sendBusFromDog, 3000)
    }

    return (
        <View style={styles.pageContainer}>
            <View style={styles.header}>
                <Text style={styles.headerText}>
                    {careerInfo.displayString + " Dog"}
                </Text>
                <TouchableOpacity style={styles.button} onPress={returnFromShift}>

                </TouchableOpacity>
            </View>
            <TouchableOpacity>

            </TouchableOpacity>
            <TouchableOpacity style={styles.busButton} onPress={fadeIn}>
                <Animated.View style={{
                    transform: [{ translateX: busX }]
                }}>
                    <Image style={styles.workBus} source={require('../../assets/workBus.png')}>

                    </Image>
                </Animated.View>
            </TouchableOpacity>
            <Animated.View style={[
                {
                    opacity: fadeAnim,
                    zIndex: showShiftOptions ? 3 : 1

                },
                styles.shiftView
            ]}>
                <View style={styles.innerShiftView}>
                    <TouchableOpacity onPress={fadeOut} style={styles.closeIconContainer}>
                        <Icon type='FontAwesome' name='close' style={styles.closeIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.shiftButton} onPress={() => dispatchShift('short')}>
                        <Text style={styles.buttonText}>
                            Work a Short Shift
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.shiftButton} onPress={() => dispatchShift('medium')}>
                        <Text style={styles.buttonText}>
                            Work a Medium Shift
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.shiftButton} onPress={() => dispatchShift('long')}>
                        <Text style={styles.buttonText}>
                            Work a Long Shift
                        </Text>
                    </TouchableOpacity>

                </View>
            </Animated.View>

        </View>
    )
}

export default function CareerScreen(props) {

    const [showCareerSelection, setShowCareerSelection] = useState(true);

    return (
        <OverlayContainer front={showCareerSelection ? <SelectCareerScreen /> : null} behind={< CareerBackground />} />
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
            justifyContent: 'space-between',
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
        shiftView: {
            width: WINDOW_WIDTH,
            height: WORK_BUS_HEIGHT,
            borderColor: 'gold',
            borderWidth: 3,
            borderRadius: 5,
            position: 'absolute',
            bottom: WORK_BUS_MARGIN_BOTTOM,
            backgroundColor: 'rgba(153, 130, 0, .5)',
            alignItems: 'center',
            justifyContent: 'center',
        },
        innerShiftView: {
            width: WINDOW_WIDTH,
            height: WORK_BUS_HEIGHT,
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            paddingVertical: '5%'
        },

        closeIcon: {
            color: "gold",
        },
        closeIconContainer: {
            position: 'absolute',
            top: 5,
            right: 5,
            zIndex: 2
        },
        shiftButton: {
            width: '80%',
            height: '30%',
            backgroundColor: 'gold',
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center'
        },
        buttonText: {
            fontFamily: 'Didot-Italic',
            fontWeight: '900',
            fontSize: 30,
            color: "#998200"
        }

    }
)