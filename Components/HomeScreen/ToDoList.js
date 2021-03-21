import React from 'react';
import { View, Text, Image, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { height, TODO_LIST_HEIGHT, TODO_LIST_POSTITION_TOP, TODO_LIST_WIDTH, width } from '../../layoutConsts';
import { Icon } from 'native-base'
import ToDoLineItem from './ToDoLineItem';
import { useSelector } from 'react-redux';


export default function ToDoList({ setShowToDoList, showToDoList }) {

    const hungerInfo = useSelector(state => state.hunger);
    const exerciseInfo = useSelector(state => state.exercise);
    return (
        <Modal animationType="fade" transparent="true" visible={showToDoList}>
            <View style={styles.modalContainer}>
                <View style={styles.modalWindow}>
                    <View style={styles.toDoHeader}>
                        <Text style={styles.toDoHeaderText}>To Do</Text>
                    </View>
                    <ToDoLineItem
                        lineName="Hunger"
                        lineImage={require("../../assets/ToDoFood.png")}
                        checkedImage={require("../../assets/CheckedToDoFood.png")}
                        lastCared={hungerInfo.lastFed}
                        timesCaredToday={hungerInfo.timesFedToday}
                        didMiscare={hungerInfo.didMisfeed}
                        checkTimeSince={hungerInfo.checkTimeSince}
                        imgArr={[1, 2]}
                    />
                    <ToDoLineItem
                        lineName="Exercise"
                        lineImage={require("../../assets/ToDoExercise.png")}
                        checkedImage={require("../../assets/CheckedToDoExercise.png")}
                        lastCared={exerciseInfo.lastExercised}
                        timesCaredToday={exerciseInfo.timesExercisedToday}
                        didMiscare={exerciseInfo.didMisexercise}
                        checkTimeSince={exerciseInfo.checkTimeSince}
                        imgArr={[1, 2, 3]}
                    />
                    <ToDoLineItem
                        lineName="Cleanliness"
                        lineImage={require("../../assets/ToDoFood.png")}
                        checkedImage={require("../../assets/CheckedToDoFood.png")}
                        lastCared={hungerInfo.lastFed}
                        timesCaredToday={hungerInfo.timesFedToday}
                        didMiscare={hungerInfo.didMisfeed}
                        checkTimeSince={hungerInfo.checkTimeSince}
                        imgArr={[1, 2]}
                    />
                    <ToDoLineItem
                        lineName="Intelligence"
                        lineImage={require("../../assets/ToDoFood.png")}
                        checkedImage={require("../../assets/CheckedToDoFood.png")}
                        lastCared={hungerInfo.lastFed}
                        timesCaredToday={hungerInfo.timesFedToday}
                        didMiscare={hungerInfo.didMisfeed}
                        checkTimeSince={hungerInfo.checkTimeSince}
                        imgArr={[1, 2]}
                    />
                    <TouchableOpacity style={styles.closeButton} onPress={() => setShowToDoList(false)}>
                        <Icon type='FontAwesome' name='close' style={styles.closeIcon} />
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        position: 'relative',
        backgroundColor: "rgba(1, 1, 1, .2)"

    },
    modalWindow: {
        width: TODO_LIST_WIDTH,
        height: TODO_LIST_HEIGHT,
        backgroundColor: '#feff9c',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        borderRadius: 5,
        borderWidth: 3
    },
    toDoHeader: {
        height: TODO_LIST_HEIGHT / 4,
        width: TODO_LIST_WIDTH,
        justifyContent: "center",
        alignItems: "center"
    },
    toDoHeaderText: {
        fontFamily: "ChalkboardSE-Bold",
        fontSize: 50
    },
    closeButton: {
        position: "absolute",
        top: 5,
        right: 10
    }
});