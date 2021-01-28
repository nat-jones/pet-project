import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, ImageBackground } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
    SHOP_BACKGROUND_HEIGHT,
    SHOP_WINDOW_WIDTH,
    SIGN_TOP_MARGIN,
    width,
    height,
    RECEIPT_HEADER_MARGIN_TOP,
    RECEIPT_HEADER_HEIGHT,
    SUMMARY_WIDTH,
    SUMMARY_HEIGHT
} from '../../layoutConsts';
import { SHOP_ITEM_INFO } from '../../shopItemInfo';
import { useAccumulator } from '../../Actions/AccumulatorActions';
import SummaryLineItem from './SummaryLineItem';
import { addCartload } from '../../Actions/InventoryActions';
import { purchaseInventory } from '../../firebase';
import { clearCart } from '../../Actions/ShopActions';


export default function CheckoutModal(props) {


    const shoppingCart = useSelector(state => state.cart);
    const coins = useSelector(state => state.accumulators.coins);
    const dispatch = useDispatch();

    const getItemsInCart = () => {
        let items = Object.keys(shoppingCart);
        let summary = items.reduce(
            (acc, e) => {
                if (shoppingCart[e] > 0) {
                    let itemInfo = { ...SHOP_ITEM_INFO[e], quantity: shoppingCart[e], lineNumber: acc.length + 1 }
                    acc.push(itemInfo);
                }
                return acc;
            }, [])
        return summary;
    }

    const getCartCost = () => {
        let items = Object.keys(shoppingCart);
        let cartCost = items.reduce(
            (acc, e) => {
                acc += (shoppingCart[e] * SHOP_ITEM_INFO[e].price);
                console.lof
                return acc;
            }, 0
        )

        return cartCost;
    }

    const purchase = async () => {

        let cartCost = getCartCost();

        if (coins >= cartCost) {
            await dispatch(useAccumulator(cartCost, 'coins'));
            await dispatch(addCartload(shoppingCart));
            await purchaseInventory(cartCost);
            await dispatch(clearCart());
            props.closeModal();
        }

    }

    return (
        <View style={styles.checkoutWrapper}>
            <View style={styles.checkoutWindow}>
                <ImageBackground source={require('../../assets/receipt.png')} style={styles.receipt}>
                    <View style={styles.receiptHeader}>
                        <Text style={styles.receiptHeaderText}>Order Summary</Text>
                    </View>
                    <View style={styles.receiptSummary}>
                        <ScrollView alwaysBounceHorizontal={false}>

                            {getItemsInCart().map(
                                (e) => {
                                    return <SummaryLineItem {...e} key={e.id} />
                                }
                            )}
                        </ScrollView>
                        <View>
                            <Text style={styles.receiptHeaderText}> {'Total: ' + getCartCost()} </Text>
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => {
                            props.closeModal();
                        }
                        } style={[styles.closeButton, styles.modalButton]}>
                            <Text style={styles.buttonText}>{"Close"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => purchase()} style={[styles.submitButton, styles.modalButton]}>
                            <Text style={styles.buttonText}>{'Purchase'}</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    checkoutWrapper: {
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    checkoutWindow: {
        width: width,
        height: height
    },
    receipt: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    modalButton: {
        height: 50,
        width: 120,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: "gold",
        fontSize: 20
    },
    closeButton: {
        backgroundColor: '#F86262'
    },
    submitButton: {
        backgroundColor: '#50C878'
    },
    buttonContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    receiptHeader: {
        marginTop: RECEIPT_HEADER_MARGIN_TOP,
        height: RECEIPT_HEADER_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
    },
    receiptHeaderText: {
        fontSize: 50,
        fontFamily: 'Didot-Italic',
    },
    receiptSummary: {
        width: SUMMARY_WIDTH,
        height: SUMMARY_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center'
    }
}
);