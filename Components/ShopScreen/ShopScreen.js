import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window')

export default function shopScreen(props) {


    return (

        <View style={styles.shopArea}>
            <View>

            </View>
            <Image source={require('../../assets/rosiesRetail.png')} style={styles.kiosk}>

            </Image>
        </View>
    )
}


const styles = StyleSheet.create(
    {
        shopArea: {
            width: width,
            height: height
        },
        kiosk: {
            width: width,
            resizeMode: 'contain',
            height: height,
            position: 'absolute',
            top: 100
        },
        purchaseWindow: {
            width: '100%',
            height: 200
        }
    }
)
