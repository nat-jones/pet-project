import React, { useState } from 'react';
import { View, Image, Pressable, Modal, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import { SHELF_SPACING, SHELF_WIDTH, SHELF_HEIGHT, width } from '../../../layoutConsts';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../Actions/ShopActions';


export default function Consumable(props) {

    const [didPress, setDidPress] = useState(false);
    const [quantity, setQuantity] = useState(0);
    const dispatch = useDispatch();

    const dispatchToCart = () => {
        console.log('reached')
        dispatch(addToCart(props.id, quantity));
        setQuantity(0);
        setDidPress(false);
    }
    return (
        <View style={styles.shopItemContainer}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={didPress}>
                <View style={styles.modalWindow}>
                    <View style={styles.modalBackground}>
                        <View style={styles.infoContainer}>
                            <Text style={styles.infoText}>
                                {props.displayString}
                            </Text>
                        </View>
                        <View style={styles.quantitySelector}>
                            <TouchableOpacity style={styles.iconContainer} onPress={() => {
                                if (quantity > 0) {
                                    setQuantity(quantity - 1)
                                }
                            }}>
                                <Icon type='FontAwesome' name='caret-left' style={styles.modalIcon} />
                            </TouchableOpacity>
                            <View style={styles.quantityBackground}>
                                <Text style={styles.quantityText}>{quantity}</Text>
                            </View>
                            <TouchableOpacity style={styles.iconContainer} onPress={() => setQuantity(quantity + 1)}>
                                <Icon type='FontAwesome' name='caret-right' style={styles.modalIcon} />
                            </TouchableOpacity>

                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={() => {
                                setQuantity(0);
                                setDidPress(false);
                            }
                            } style={[styles.closeButton, styles.modalButton]}>
                                <Text style={styles.buttonText}>{"Close"}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => dispatchToCart()} style={[styles.submitButton, styles.modalButton]}>
                                <Text style={styles.buttonText}>{'Add To Cart'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <TouchableOpacity onPress={() => setDidPress(true)}>
                <Image source={props.imageSrc} style={styles.shopItem} />
            </TouchableOpacity>
            <View style={styles.priceTag}>
                <View style={styles.nail} />
                <Text style={styles.price}>{props.price}</Text>
                <View style={styles.nail} />
            </View>
        </View>
    );

}

const styles = StyleSheet.create(
    {
        shopItem: {
            maxWidth: SHELF_WIDTH * 2 / 7,
            maxHeight: SHELF_SPACING - 5,
            flex: 1,
            marginTop: 10,
            resizeMode: 'contain'
        },
        modalWindow: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        },
        modalBackground: {
            borderColor: "#998200",
            borderWidth: 2,
            backgroundColor: 'gold',
            justifyContent: "center",
            alignItems: "center",
            height: 300,
            width: 300,
            borderRadius: 10
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
            height: '33%'
        },
        infoContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            height: '33%'
        },
        infoText: {
            textAlign: 'center',
            fontSize: 30,
            color: "#998200",
        },
        quantitySelector: {
            width: '100%',
            height: '33%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
        },
        quantityBackground: {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: "#998200",
            borderRadius: 5,
            padding: 20
        },
        quantityText: {
            fontSize: 40,
            color: 'gold'
        },
        modalIcon: {
            width: 'auto',
            color: "#998200",
            fontSize: 80
        },
        iconContainer: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        shopItemContainer: {
            width: SHELF_WIDTH / 4,
            height: SHELF_SPACING + SHELF_HEIGHT + 10,
            justifyContent: 'flex-start',
            alignItems: 'center',

        },
        price: {
            fontSize: 20,
        },
        priceTag: {
            height: SHELF_HEIGHT - 5,
            width: SHELF_WIDTH * .2,
            backgroundColor: 'silver',
            marginTop: 8,
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            paddingHorizontal: 5
        },
        nail: {
            height: SHELF_HEIGHT - 20,
            width: SHELF_HEIGHT - 20,
            backgroundColor: '#ac7339',
            borderRadius: (SHELF_HEIGHT - 10) / 2
        }
    }
)