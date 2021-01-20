import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'native-base';
import { LINE_ITEM_HEIGHT, SUMMARY_WIDTH } from '../../layoutConsts';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { removeItemFromCart } from '../../Actions/ShopActions';



export default function SummaryLineItem(props) {

    const dispatch = useDispatch();



    return (
        <View style={styles.lineItemWrapper}>
            <Text style={[styles.summaryText, styles.lineNoContainer]}>
                {props.lineNumber + '.'}
            </Text>
            <Text style={[styles.summaryText, styles.displayStringContainer]} numberOfLines={1}>
                {props.displayString + ' x ' + props.quantity + '...........................................'}
            </Text>
            <Text style={[styles.summaryText, styles.priceContainer]}>
                {props.price * props.quantity}
            </Text>
            <TouchableOpacity style={styles.cancelButtonContainer} onPress={() => dispatch(removeItemFromCart(props.id))}>
                <Icon style={[styles.summaryText, styles.cancelButton]} type='MaterialIcons' name='cancel' />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create(
    {
        lineItemWrapper: {
            width: SUMMARY_WIDTH,
            height: LINE_ITEM_HEIGHT,
            paddingHorizontal: 10,
            marginVertical: 5,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        summaryText: {
            fontSize: 20
        },
        lineNoContainer: {
            width: 'auto',
            marginHorizontal: 5
        },
        displayStringContainer: {
            flex: 1,
            overflow: 'hidden',

        },
        priceContainer: {
            width: 'auto',
            marginHorizontal: 8
        },
        cancelButton: {
            color: '#F86262'
        },
        cancelButtonContainer: {
            width: 'auto',
            height: 'auto',
            margin: 10,
            alignItems: 'center',
            justifyContent: 'center',
        }


    }
)