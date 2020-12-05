import React from "react";
import { StyleSheet, View } from 'react-native';
import { Text, Icon } from 'native-base';
import { useSelector } from 'react-redux';


export default function HomeTopBar(props) {

    const gems = useSelector(state => state.accumulators.gems);
    const coins = useSelector(state => state.accumulators.coins);
    const xp = useSelector(state => state.accumulators.xp);

    return (
        <View style={styles.barWindow}>
            <View style={styles.dataSection}>
                <Icon type="FontAwesome" name="star" style={styles.icon} />
                <View style={styles.barOutline}>
                    <View style={{
                        width: props.value / 3,
                        height: 20,
                        backgroundColor: "green",
                    }} />
                </View>
            </View>
            <View style={styles.dataSection}>
                <Icon type="FontAwesome5" name="coins" style={styles.icon} />
                <View style={styles.dataBar}>
                    <Text style={styles.barLabel}>{coins}</Text>
                </View>
            </View>
            <View style={styles.dataSection}>
                <Icon type="FontAwesome5" name="gem" style={styles.icon} />
                <View style={styles.dataBar}>
                    <Text style={styles.barLabel}>{gems}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    dataSection: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    barWindow: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        marginTop: 30,
        height: 30,
    },
    barOutline: {
        height: 22,
        backgroundColor: "black",
        borderWidth: 1,
        width: 100,
        borderColor: "black"
    },
    dataBar: {
        height: 22,
        backgroundColor: "black",
        borderWidth: 1,
        width: 100,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "black"
    },
    barLabel: {
        fontSize: 30,
        color: "#bf9700"
    },
    icon: {
        color: "gold",
        marginRight: -10,
        zIndex: 2
    },
    barLabel: {
        color: "white",
        marginLeft: 15
    }
})