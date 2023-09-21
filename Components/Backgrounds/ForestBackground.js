import React, { useEffect } from 'react';
import { ImageBackground, StyleSheet, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';

const windowDims = Dimensions.get('window');

export default function ForestBackground(props) {
  const background = useSelector((state) => state.settings.background);
  const backgrounds = {
    cabin: require('../../assets/CabinBackground.png'),
    desert: require('../../assets/DesertBackground.png'),
    beach: require('../../assets/BeachBackground.png'),
  };
  return (
    <ImageBackground source={backgrounds[background]} style={styles.root}>
      {props.children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: windowDims.width,
    height: windowDims.height,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
