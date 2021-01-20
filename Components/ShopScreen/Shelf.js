import React from 'react'
import { View, Image, StyleSheet, Text } from 'react-native';
import { SHELF_DEPTH, SHELF_HEIGHT, SHELF_SPACING, SHELF_WIDTH } from '../../layoutConsts';
import Consumable from './Consumables/Consumable';


export default function Shelf(props) {

    return (
        <View style={{ position: 'relative', justifyContent: 'flex-start' }}>
            <View style={styles.itemArea}>

                {props.children}


            </View>
            <View style={styles.shelfTop}>
            </View>
            <View style={styles.shelfFront}>
            </View>
        </View>
    );
}

const styles = StyleSheet.create(

    {
        shelfWrapper: {
            position: 'relative'
        },
        shelfTop: {
            marginTop: SHELF_SPACING,
            width: SHELF_WIDTH,
            height: 0,
            borderBottomWidth: SHELF_DEPTH,
            borderBottomColor: '#c68c53',
            borderLeftWidth: 30,
            borderLeftColor: "transparent",
            borderRightWidth: 30,
            borderRightColor: "transparent",
            borderStyle: "solid",
        },
        shelfFront: {
            height: SHELF_HEIGHT,
            width: SHELF_WIDTH,
            backgroundColor: '#ac7339',
        },
        itemArea: {
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            width: SHELF_WIDTH,
            height: SHELF_SPACING + SHELF_HEIGHT + SHELF_DEPTH,
            zIndex: 2,
            position: 'absolute',
            flexDirection: 'row',
        },
        shopItem: {
            resizeMode: 'contain',
            flex: 1
        },
        shopItemContainer: {
            width: SHELF_WIDTH / 4,
            height: SHELF_SPACING - 5,
            justifyContent: 'center',
            alignItems: 'center'
        }
    }
)


