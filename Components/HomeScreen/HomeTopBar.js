import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, Icon } from "native-base";
import { useSelector } from "react-redux";
import { HOME_TOP_BAR_POSITION_TOP, HOME_TOP_BAR_HEIGHT, CONSUMABLES_BAR_WIDTH } from '../../layoutConsts';

export default function HomeTopBar(props) {
  const gems = useSelector((state) => state.accumulators.gems);
  const coins = useSelector((state) => state.accumulators.coins);
  const xp = useSelector((state) => state.accumulators.xp);

  return (
    <View style={styles.barWindow}>
      <View style={styles.dataSection}>
        <Icon type="FontAwesome" name="star" style={styles.icon} />
        <View style={styles.barOutline}>
          <View
            style={{
              width: props.value / 3,
              height: HOME_TOP_BAR_HEIGHT,
              backgroundColor: "green",
            }}
          />
        </View>
      </View>
      <View style={styles.dataSection}>
        <Icon type="FontAwesome5" name="coins" style={styles.icon} />
        <View style={[styles.barOutline, styles.dataBar]}>
          <Text style={styles.barLabel}>{coins}</Text>
        </View>
      </View>
      <View style={styles.dataSection}>
        <Icon type="FontAwesome5" name="gem" style={styles.icon} />
        <View style={[styles.barOutline, styles.dataBar]}>
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
    justifyContent: "center",
  },
  barWindow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: 'absolute',
    top: HOME_TOP_BAR_POSITION_TOP,
    left: 0,
    paddingLeft: 3,
    paddingRight: 3,
  },
  barOutline: {
    height: HOME_TOP_BAR_HEIGHT,
    backgroundColor: "black",
    width: CONSUMABLES_BAR_WIDTH,
    borderRadius: 5
  },
  dataBar: {
    justifyContent: "center",
    alignItems: "center",
  },
  barLabel: {
    fontSize: HOME_TOP_BAR_HEIGHT,
    color: "#bf9700",
  },
  icon: {
    color: "gold",
    marginRight: -10,
    zIndex: 2,
  },
  barLabel: {
    color: "white",
    marginLeft: 15,
  },
});
