import React, { useState, useRef, useEffect } from 'react';
import HomeScreen from './HomeScreen/HomeScreen';
import ShopScreen from './ShopScreen/ShopScreen';
import AnimalInfoScreen from './AnimalInfoScreen/AnimalInfoScreen';
import { ScrollView, StyleSheet, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import ForestBackground from './Backgrounds/ForestBackground';
import CareerScreen from './Careers/CareerScreen';
import NavBar from './NavBar';

const { width } = Dimensions.get('window');

const indexDict = {
  pet: 0,
  career: width,
  home: width * 2,
  shop: width * 3,
  vet: width * 4,
};

const pageDict = {};

Object.keys(indexDict).reduce((acc, e) => {
  acc[indexDict[e]] = e;
  return acc;
}, pageDict);

export default function MainView(props) {
  const scrollRef = useRef(null);
  const [activePage, setActivePage] = useState('home');
  const [userDidSwipe, setUserDidSwipe] = useState(false);
  const shouldScroll = false;
  //useSelector(store => store.drag.scrollEnabled);

  const handleScroll = (event) => {
    let lastPosition = event.nativeEvent.contentOffset.x;
    let newPage = '';

    if (!userDidSwipe) {
      return;
    }

    if (lastPosition > width * 3.5) {
      newPage = 'vet';
    } else if (lastPosition > width * 2.5) {
      newPage = 'shop';
    } else if (lastPosition > width * 1.5) {
      newPage = 'home';
    } else if (lastPosition > width * 0.5) {
      newPage = 'career';
    } else {
      newPage = 'pet';
    }

    setActivePage(newPage);
    setUserDidSwipe(false);
  };

  useEffect(() => {
    scrollRef.current.scrollTo({ x: indexDict[activePage], animated: true });
  }, [activePage]);

  return (
    <ForestBackground>
      <ScrollView
        horizontal={true}
        decelerationRate={0}
        pagingEnabled
        contentOffset={{ x: indexDict['home'], y: 0 }}
        snapToAlignment={'center'}
        style={styles.scroll}
        ref={scrollRef}
        scrollEnabled={shouldScroll}
        onMomentumScrollEnd={handleScroll}
        onScrollBeginDrag={() => setUserDidSwipe(true)}
      >
        <AnimalInfoScreen />
        <CareerScreen />
        <HomeScreen />
        <ShopScreen />
        <ShopScreen />
      </ScrollView>
      <NavBar activePage={activePage} setActivePage={setActivePage} />
    </ForestBackground>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
});
