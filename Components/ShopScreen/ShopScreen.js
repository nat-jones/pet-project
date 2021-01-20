import React, { useState } from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    ScrollView,
    Text,
    ImageBackground,
    Modal
} from 'react-native';
import { Icon } from 'native-base';
import {
    SHELF_WINDOW_HEIGHT,
    SHOP_BACKGROUND_HEIGHT,
    SHOP_WINDOW_WIDTH, SIGN_BOTTOM_MARGIN,
    SIGN_FOOTER_HEIGHT,
    SIGN_HEIGHT,
    SIGN_TOP_MARGIN, width, height, SHELF_DEPTH
} from '../../layoutConsts';
import Shelf from './Shelf'
import Consumable from './Consumables/Consumable'
import CheckoutModal from './CheckoutModal';
import { SHOP_ITEM_INFO, SHELF_ORDER } from '../../shopItemInfo';

export default function shopScreen(props) {


    const [showCheckout, setShowCheckout] = useState(false);

    return (
        <View style={styles.shopWindow}>
            <View>
                <ImageBackground
                    source={require('../../assets/RosiesRetailWoodBackground.png')}
                    style={styles.shopBackgroundDims}
                    viewStyle={styles.centerChildren}
                    imageStyle={styles.shopBackgroundBorder}
                >
                    <View style={[styles.shopSign, styles.centerChildren]}>
                        <Text style={styles.signText}>{"Rosie's Retail"} </Text>
                    </View>
                    <View>
                        <ScrollView style={styles.shopArea} alwaysBounceHorizontal={false} contentContainerStyle={styles.scrollContainer}>
                            {SHELF_ORDER.map((row) => {

                                return (
                                    <Shelf key={'shelf' + row[0]}>
                                        {row.map((item) => {
                                            return (
                                                <Consumable {...SHOP_ITEM_INFO[item]} key={item} />
                                            );
                                        }
                                        )}
                                    </Shelf>
                                )
                            })}

                        </ScrollView>
                    </View>
                    <View style={styles.shopFooter}>
                        <Text style={styles.signFooterText}> Cart Total: </Text>
                        <TouchableOpacity style={styles.shoppingCartContainer} onPress={() => setShowCheckout(true)}>
                            <Icon type='FontAwesome5' name='shopping-cart' style={styles.shoppingCart}></Icon>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>


            </View>
            <Modal animationType='slide' visible={showCheckout} transparent={true}>
                <CheckoutModal closeModal={() => setShowCheckout(false)} />
            </Modal>

        </View>
    )
}


const styles = StyleSheet.create(
    {
        shopWindow: {
            width: width,
            height: height,
            justifyContent: 'flex-start',
            alignItems: 'center'
        },
        shopArea: {
            width: SHOP_WINDOW_WIDTH,
            height: SHELF_WINDOW_HEIGHT,
            overflow: 'hidden',
        },
        scrollContainer: {
            justifyContent: 'flex-end',
            alignItems: 'center'
        },
        centerChildren: {
            justifyContent: 'center',
            alignItems: 'center'
        },
        shopSign: {
            height: SIGN_HEIGHT,
            width: SHOP_WINDOW_WIDTH,
            borderWidth: 5,
            borderRadius: 5,
            borderColor: '#392613',
        },
        signText: {
            fontSize: 50,
            fontFamily: 'Didot-Italic',
            fontWeight: '900',
            color: 'white',
            borderRadius: 5,
            padding: 10,
            backgroundColor: 'rgba(232, 128, 140, .8)',
        },
        signFooterText: {
            fontSize: 40,
            fontFamily: 'Didot-Italic',
            fontWeight: '900',
            color: 'white'
        },
        shopBackgroundDims: {
            width: SHOP_WINDOW_WIDTH,
            height: SHOP_BACKGROUND_HEIGHT,
            marginTop: SIGN_TOP_MARGIN,
            marginBottom: SIGN_BOTTOM_MARGIN,

        },
        shopBackgroundBorder: {
            borderRadius: 5,
            borderColor: '#392613'
        },
        shoppingCart: {
            fontSize: 40,
            color: 'gold',
        },
        shoppingCartContainer: {
            alignItems: 'center',
            justifyContent: 'center',
        },
        shopFooter: {
            borderRadius: 5,
            borderWidth: 5,
            borderColor: '#392613',
            width: '100%',
            height: SIGN_FOOTER_HEIGHT,
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            flexDirection: 'row',
            backgroundColor: 'rgba(232, 128, 140, .8)'
        }

    }
)
0