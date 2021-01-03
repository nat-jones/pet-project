import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'


const windowDims = Dimensions.get('window');
// Show something on top of other
export default function OverlayContainer(props) {

    const { behind, front, under } = props

    return (
        <View style={styles.container}>
            <View style={styles.center}>
                <View style={styles.behind}>
                    {behind}
                </View>
                {front}
            </View>
            {under}
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        height: windowDims.height,
        width: windowDims.width,
        justifyContent: 'center',
    },
    center: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    behind: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%'
    }
})