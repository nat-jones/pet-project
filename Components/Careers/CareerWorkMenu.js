import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import { Icon } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { WINDOW_WIDTH, WORK_BUS_HEIGHT, WORK_BUS_MARGIN_BOTTOM } from '../../layoutConsts';




export default function CareerWorkMenu(props) {

    const dispatch = useDispatch();
    const [menuState, setMenuState] = useState('Main')

    const dispatchShift = (shift) => {
        props.dispatchShift(shift);
        setMenuState('Main');

    }

    const showMenu = () => {
        if (menuState == "Work") {
            return (
                <>
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
                </>);
        }

        else {
            return (
                <>
                    <TouchableOpacity style={styles.shiftButton} onPress={() => setMenuState('Work')}>
                        <Text style={styles.buttonText}>
                            Go To Work
            </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.shiftButton} onPress={() => props.setShowCareerSelection(true)}>
                        <Text style={styles.buttonText}>
                            Change Career
            </Text>
                    </TouchableOpacity>

                </>
            )
        }

    }


    return (
        <Animated.View style={[
            {
                opacity: props.fadeAnim,
                zIndex: props.showShiftOptions ? 3 : 1

            },
            styles.shiftView
        ]}>
            <View style={styles.innerShiftView}>
                <TouchableOpacity onPress={() => {
                    props.fadeOut(() => setMenuState('Main'))
                }
                } style={styles.closeIconContainer}>
                    <Icon type='FontAwesome' name='close' style={styles.closeIcon} />
                </TouchableOpacity>
                {showMenu()}

            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create(
    {
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
    })