import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
  Text,
} from 'react-native';
import { Icon } from 'native-base';
import {
  INVENTORY_POSITION_TOP,
  INVENTORY_HEIGHT,
  height,
  width,
  TODO_LIST_WIDTH,
  TODO_LIST_HEIGHT,
} from '../../layoutConsts';
import { useDispatch } from 'react-redux';
import { setBackground, setDog } from '../../Actions/SettingsActions';

export default function ({ showModal, setShowModal }) {
  const dispatch = useDispatch();

  return (
    <Modal visible={showModal} transparent={true} animationType="fade">
      <View style={styles.modalBackgound}>
        <View style={styles.modalWindow}>
          <TouchableOpacity
            onPress={() => setShowModal(false)}
            style={styles.closeButton}
          >
            <Icon type="FontAwesome" name="close" style={styles.closeIcon} />
          </TouchableOpacity>
          <Text style={styles.menuTitle}>Settings</Text>
          <View style={styles.settingsRow}>
            <Text style={styles.settingText}>Select Background: </Text>
            <View style={styles.center}>
              <TouchableOpacity
                onPress={() => dispatch(setBackground('desert'))}
              >
                <Image
                  source={require('../../assets/DesertBackground.png')}
                  resizeMode="contain"
                  style={styles.backgroundChoice}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => dispatch(setBackground('cabin'))}
              >
                <Image
                  source={require('../../assets/CabinBackground.png')}
                  resizeMode="contain"
                  style={styles.backgroundChoice}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => dispatch(setBackground('beach'))}
              >
                <Image
                  source={require('../../assets/BeachBackground.png')}
                  resizeMode="contain"
                  style={styles.backgroundChoice}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.settingsRow}>
            <Text style={styles.settingText}>Select Dog: </Text>
            <View style={styles.center}>
              <TouchableOpacity
                onPress={() => dispatch(setDog('goldenRetriever'))}
              >
                <Image
                  source={require('../../assets/GoldenRetriever.png')}
                  resizeMode="contain"
                  style={styles.backgroundChoice}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => dispatch(setDog('scottishTerrier'))}
              >
                <Image
                  source={require('../../assets/ScottishTerrier.png')}
                  resizeMode="contain"
                  style={styles.backgroundChoice}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  icon: {
    fontSize: 50,
    color: '#ffec80',
  },
  button: {
    top:
      INVENTORY_POSITION_TOP +
      INVENTORY_HEIGHT +
      (height / 60) * 2 +
      height / 13,
    right: width / 100,
    position: 'absolute',
    backgroundColor: 'gold',
    padding: 5,
    borderRadius: 10,
    borderColor: '#ffec80',
    borderWidth: 2,
  },
  modalBackgound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    backgroundColor: 'rgba(1, 1, 1, .2)',
  },
  modalWindow: {
    width: TODO_LIST_WIDTH,
    height: TODO_LIST_HEIGHT,
    backgroundColor: '#ffec80',
    borderColor: 'gold',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderRadius: 5,
    flexDirection: 'column',
  },
  closeButton: {
    position: 'absolute',
    top: 5,
    right: 10,
  },
  closeIcon: {
    color: 'gold',
  },
  settingsRow: {
    width: TODO_LIST_WIDTH * 0.9,
    flexDirection: 'row',
    height: TODO_LIST_HEIGHT / 3,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  backgroundChoice: {
    maxWidth: TODO_LIST_WIDTH / 7,
    maxHeight: TODO_LIST_HEIGHT / 4,
    margin: 2,
  },
  settingText: {
    fontSize: 20,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    flex: 1,
  },
  menuTitle: {
    fontSize: 50,
  },
});
