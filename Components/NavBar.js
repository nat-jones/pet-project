import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import { Icon } from 'native-base';
import { NAV_BAR_HEIGHT } from '../layoutConsts';
import { useSelector } from 'react-redux';

const windowWidth = Dimensions.get('window').width;
const passiveOptionWidth = windowWidth * 0.18;
const activeOptionWidth = windowWidth * 0.28;

export default function NavBar(props) {
  const anims = {
    home: useRef(new Animated.Value(activeOptionWidth)).current,
    pet: useRef(new Animated.Value(passiveOptionWidth)).current,
    shop: useRef(new Animated.Value(passiveOptionWidth)).current,
    vet: useRef(new Animated.Value(passiveOptionWidth)).current,
    career: useRef(new Animated.Value(passiveOptionWidth)).current,
  };

  const [lastExpanded, setLastExpanded] = useState('home');
  const dogInfo = useSelector((state) => state.sponsorableAnimals);

  const [dogImage, setDogImage] = useState(false);

  useEffect(() => {
    if (props.activePage !== lastExpanded) {
      changePage(props.activePage);
    }
  }, [props.activePage]);

  useEffect(() => {
    const selectedDog = dogInfo.id;
    if (selectedDog && dogInfo.allDogInfo[selectedDog]) {
      setDogImage(dogInfo.allDogInfo[selectedDog].src);
    }
  }, [dogInfo]);

  const iconStyle = (page) =>
    page === props.activePage ? styles.activeIcon : styles.passiveIcon;

  const changePage = async (newPage) => {
    if (newPage === lastExpanded) {
      return;
    }

    shrink(lastExpanded);
    expand(newPage);
    setLastExpanded(newPage);
    newPage !== props.activePage && props.setActivePage(newPage);
  };

  const expand = (animation) => {
    Animated.timing(anims[animation], {
      toValue: activeOptionWidth,
      duration: 100,
      useNativeDriver: false,
    }).start();
  };

  const shrink = (animation) => {
    Animated.timing(anims[animation], {
      toValue: passiveOptionWidth,
      duration: 100,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.barWrapper}>
      <TouchableWithoutFeedback onPress={() => changePage('pet')}>
        <Animated.View style={[styles.barOption, { width: anims.pet }]}>
          {dogImage ? (
            <Image
              source={{ uri: dogImage }}
              style={[styles.barIcon, styles.dogImage]}
            />
          ) : (
            <Icon
              type="MaterialCommunityIcons"
              name="dog"
              style={[styles.barIcon, iconStyle('pet')]}
            />
          )}
        </Animated.View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={() => changePage('career')}>
        <Animated.View style={[styles.barOption, { width: anims.career }]}>
          <Icon
            type="FontAwesome5"
            name="user-clock"
            style={iconStyle('career')}
          />
        </Animated.View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => changePage('home')}>
        <Animated.View style={[styles.barOption, { width: anims.home }]}>
          <Icon type="FontAwesome5" name="home" style={iconStyle('home')} />
        </Animated.View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => changePage('shop')}>
        <Animated.View style={[styles.barOption, { width: anims.shop }]}>
          <Icon
            type="FontAwesome5"
            name="shopping-cart"
            style={iconStyle('shop')}
          />
        </Animated.View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => {
          changePage('vet');
        }}
      >
        <Animated.View style={[styles.barOption, { width: anims.vet }]}>
          <Icon
            type="FontAwesome5"
            name="clinic-medical"
            style={iconStyle('vet')}
          />
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  barWrapper: {
    width: '100%',
    height: NAV_BAR_HEIGHT,
    position: 'absolute',
    bottom: 0,
    left: 0,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  barOption: {
    height: '100%',
    borderColor: '#ffe866',
    borderLeftWidth: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#ffd700',
  },
  activeBarOption: {
    width: '28%',
  },
  passiveBarOption: {
    width: '18%',
  },
  passiveIcon: {
    color: '#998200',
    marginTop: 20,
  },
  activeIcon: {
    color: '#ffec80',
    marginTop: 20,
  },
  barIcon: {
    marginTop: 20,
    width: 40,
    height: 40,
  },
  dogImage: {
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#ffec80',
  },
});
