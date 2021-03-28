import React, { useRef, useState } from 'react';
import { TouchableOpacity, Animated, View, TextInput, StyleSheet } from 'react-native';
import { Icon } from 'native-base';
import { INVENTORY_POSITION_TOP, INVENTORY_HEIGHT, height, width } from '../../layoutConsts';
import { useDispatch, useSelector } from 'react-redux';
import { TRICK_DEFAULTS } from '../../TrickConsts';
import { reduxAndFirebaseLearn } from '../../ReduxBackendWrappers';
import { setTrainingData, guess, learn } from '../../Actions/TrainingActions';
import InventoryImage from '../Inventory/InventoryImage';
import { SHOP_ITEM_INFO } from '../../shopItemInfo';

export default function TrainingInput(props) {

    const widthAnim = useRef(new Animated.Value(width / 6)).current;
    const heightAnim = useRef(new Animated.Value(height / 12)).current;
    const [isExpanded, setIsExpanded] = useState(false);
    const [activeGuess, setActiveGuess] = useState(0);
    const [disabled, setDisabled] = useState(false);
    const [trick, setTrick] = useState("");
    const dispatch = useDispatch();

    const trainingData = useSelector(state => state.training.trainingData)
    const trickAttempt = useSelector(state => state.training.guess);
    const prevCommand = useSelector(state => state.training.command);
    const inventory = useSelector(state => state.inventory);



    const expand = () => {
        setIsExpanded(true);
        Animated.timing(
            widthAnim,
            {
                toValue: width * .75,
                duration: 200,
                useNativeDriver: false
            }
        ).start();
        Animated.timing(
            heightAnim,
            {
                toValue: height / 6,
                duration: 200,
                useNativeDriver: false
            }
        ).start();
    }

    const contract = () => {
        setIsExpanded(false);
        Animated.timing(
            widthAnim,
            {
                toValue: width / 6,
                duration: 200,
                useNativeDriver: false
            }
        ).start();

        Animated.timing(
            heightAnim,
            {
                toValue: height / 12,
                duration: 200,
                useNativeDriver: false
            }
        ).start();
    }

    const pickTrick = (options) => {
        let val = Math.random();
        let keys = Object.keys(options);
        let factor = keys.reduce(
            (acc, e) => {
                acc += options[e];
                return acc
            }, 0
        );

        val *= factor;
        let sum = 0
        for (i = 0; i < keys.length; i++) {
            sum += options[keys[i]];
            if (sum > val) {
                return keys[i]
            }
        }
    }

    const attemptTrick = (command) => {
        if (activeGuess !== 0) {
            clearTimeout(activeGuess);
            reduxAndFirebaseLearn(dispatch, trainingData, prevCommand, trickAttempt, false);
            setActiveGuess(0);
        }
        let attempt = ""
        if (command in trainingData) {
            attempt = pickTrick(trainingData[command])
        }
        else {
            attempt = pickTrick(TRICK_DEFAULTS);
        }

        setDisabled(true);

        dispatch(guess(command, attempt))
        setTimeout(
            () => setDisabled(false), 1000
        )
        let timeoutID = setTimeout(
            () => {
                setActiveGuess(0);
                reduxAndFirebaseLearn(dispatch, trainingData, command, attempt, false);
                dispatch(guess(null, null));
            }
            , 4000);
        setActiveGuess(timeoutID)
    }

    return (
        <Animated.View style={[{ width: widthAnim, height: heightAnim }, styles.expandButton]}>
            <View style={styles.inputRow}>
                <TouchableOpacity onPress={isExpanded ? contract : expand}>
                    <Icon
                        type="MaterialCommunityIcons"
                        name="whistle"
                        style={styles.icon}
                    ></Icon>
                </TouchableOpacity>
                <TextInput
                    style={styles.textInput}
                    value={trick}
                    onChangeText={setTrick}
                    textAlign="center"
                ></TextInput>
                <TouchableOpacity
                    style={styles.checkButton}
                    onPress={() => attemptTrick(trick)}
                    disabled={disabled || trick === ""}
                >
                    <Icon
                        type="FontAwesome5"
                        name="check"
                        style={styles.checkIcon}
                    ></Icon>
                </TouchableOpacity>
            </View>
            <View style={styles.trainingRow}>
                <InventoryImage
                    {...SHOP_ITEM_INFO.apple}
                    value={inventory.apple}
                    key="apple"
                    height={height / 14}
                    width={height / 14}
                    menu="Training"
                    onUse={(dispatch) => {
                        clearTimeout(activeGuess);
                        setActiveGuess(0);
                        SHOP_ITEM_INFO.apple.onUse(dispatch, trainingData, trick, trickAttempt, true);
                        dispatch(guess(null, null))
                    }
                    }
                />
                <InventoryImage
                    {...SHOP_ITEM_INFO.milkBone}
                    value={inventory.milkBone}
                    key="milkBone"
                    height={height / 14}
                    width={height / 14}
                    menu="Training" />
                <InventoryImage
                    {...SHOP_ITEM_INFO.peanutButter}
                    value={inventory.peanutButter}
                    key="peanutButter"
                    height={height / 14}
                    width={height / 14}
                    menu="Training" />
            </View>
        </ Animated.View >
    );
}

const styles = StyleSheet.create(
    {
        container: {
            backgroundColor: "gold",
            borderRadius: 5,
            borderWidth: 2
        },
        expandButton: {
            top: INVENTORY_POSITION_TOP + INVENTORY_HEIGHT + height / 60,
            left: width / 100,
            position: "absolute",
            backgroundColor: "gold",
            padding: 5,
            borderRadius: 10,
            borderColor: '#ffec80',
            borderWidth: 2,
            overflow: 'hidden',
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start"
        },
        icon: {
            fontSize: 50,
            color: "#998200"
        },
        textInput: {
            width: width / 2,
            backgroundColor: '#ffec80',
            borderRadius: 5,
            flex: 1,
            maxHeight: height / 15,
            marginHorizontal: 10,
            fontSize: 30,
            color: "#998200",
            padding: 10
        },
        checkButton: {
            backgroundColor: "#50C878",
            borderRadius: 5,
            alignItems: "center",
            justifyContent: "center",
            height: "auto",
            maxHeight: height / 15

        },
        checkIcon: {
            fontSize: 40,
            padding: 5,
            color: "gold",
        },
        inputRow: {
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            width: "100%",
            height: height / 13,
        },
        trainingRow:
        {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: height / 14,
        }
    }
)