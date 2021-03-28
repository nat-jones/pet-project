import React, { useRef, useState, useEffect } from "react";
import { View, Animated, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Icon } from "native-base";
import { useSelector } from "react-redux";
import {
  INVENTORY_POSITION_TOP,
  INVENTORY_HEIGHT,
  INVENTORY_WRAPPER_WIDTH,
  INVENTORY_CARET_WIDTH,
  INVENTORY_LIST_WIDTH,
  INVENTORY_ITEM_WIDTH,
  INVENTORY_ITEM_MARGIN
} from '../../layoutConsts';

import InventoryImage from "./InventoryImage";
import { SHOP_ITEM_INFO } from "../../shopItemInfo";

export default function InventoryDropDown(props) {

  const [isVisible, setOverflow] = useState(false);
  const [invListPosition, setInvListPosition] = useState(0);

  const scrollRef = useRef(null);
  const DOGFOODPATH = require("../../assets/dogFood.png");
  const DOGBONEPATH = require("../../assets/dogBone.png");
  const TENNISBALLPATH = require("../../assets/tennisBall.png");

  const inventory = useSelector((state) => state.inventory);

  const scrollRight = () => {
    scrollRef.current.scrollTo({ x: invListPosition + INVENTORY_LIST_WIDTH });
    setInvListPosition(invListPosition + INVENTORY_LIST_WIDTH);
  }
  const scrollLeft = () => {
    scrollRef.current.scrollTo({ x: invListPosition - INVENTORY_LIST_WIDTH });
    setInvListPosition(invListPosition - INVENTORY_LIST_WIDTH);
  }

  return (
    <View
      style={styles.inventoryWrapper}
    >
      <TouchableOpacity style={styles.button} onPress={scrollLeft}>
        <Icon type='FontAwesome5' name='caret-left' style={styles.icon} />
      </TouchableOpacity>
      <View style={styles.inventoryList}>
        <ScrollView
          horizontal={true}
          ref={scrollRef}
          decelerationRate={0}
          pagingEnabled
          snapToAlignment={"center"}
          scrollEnabled={false}
          style={styles.scroll}

        >
          {Object.keys(SHOP_ITEM_INFO).map(
            (e) => {
              let inventoryItem = { ...SHOP_ITEM_INFO[e] }
              inventoryItem.value = inventory[inventoryItem.id];
              inventoryItem['key'] = inventoryItem.id;
              inventoryItem.menu = "Inventory"
              return <InventoryImage {...inventoryItem} />
            }
          )}
        </ScrollView>
      </View>
      <TouchableOpacity style={styles.button} onPress={scrollRight}>
        <Icon type='FontAwesome5' name='caret-right' style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
}



const styles = StyleSheet.create({
  inventoryWrapper: {
    width: INVENTORY_WRAPPER_WIDTH,
    height: INVENTORY_HEIGHT,
    position: 'absolute',
    top: INVENTORY_POSITION_TOP,
    zIndex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(153, 130, 0, .5)',
    borderColor: "#ffd700",
    borderWidth: 2,
    borderRadius: 5,
    overflow: 'visible'
  },
  inventoryList: {
    flexDirection: 'row',
    width: INVENTORY_LIST_WIDTH,
    justifyContent: 'space-evenly',
    overflow: 'visible',
    zIndex: 3
  },
  button: {
    width: INVENTORY_CARET_WIDTH,
    borderRadius: 3,
    height: INVENTORY_HEIGHT - 4,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2
  },
  icon: {
    width: 'auto',
    color: 'gold'
  },
  scroll: {
    flex: 1
  }
});
