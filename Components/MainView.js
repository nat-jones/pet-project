import React, { useState, useRef, useEffect } from 'react';
import HomeScreen from './HomeScreen/HomeScreen';
import ShopScreen from './ShopScreen/ShopScreen';
import AnimalInfoScreen from './AnimalInfoScreen/AnimalInfoScreen';
import { ScrollView, StyleSheet, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { getUserData } from '../firebase';
import ForestBackground from './Backgrounds/ForestBackground';
import NavBar from './NavBar'


const { width } = Dimensions.get('window');

const indexDict = {
    'pet': 0,
    'games': width,
    'home': width * 2,
    'shop': width * 3,
    'friends': width * 4
}

const pageDict = {}

Object.keys(indexDict).reduce(
    (acc, e) => {
        acc[indexDict[e]] = e;
        return acc
    }, pageDict
);

export default function MainView(props) {

    const scrollRef = useRef(null);
    const [activePage, setActivePage] = useState('home');
    const [userDidSwipe, setUserDidSwipe] = useState(false);
    const [didLoad, setDidLoad] = useState(false);
    const shouldScroll = useSelector(store => store.shouldScroll);
    const userID = useSelector(store => store.userID);

    const handleScroll = (event) => {

        let lastPosition = event.nativeEvent.contentOffset.x;
        let newPage = '';

        if (!userDidSwipe) {
            return;
        }

        if (lastPosition > width * 3.5) {

            newPage = 'friends';
        }

        else if (lastPosition > width * 2.5) {

            newPage = 'shop';
        }

        else if (lastPosition > width * 1.5) {

            newPage = 'home';
        }

        else if (lastPosition > width * .5) {

            newPage = 'games';
        }
        else {
            newPage = 'pet';
        }

        setActivePage(newPage);
        setUserDidSwipe(false);
    };


    useEffect(() => {
        scrollRef.current.scrollTo({ x: indexDict[activePage], animated: true });
    }
        , [activePage])


    return (
        <ForestBackground>
            <ScrollView
                horizontal={true}
                decelerationRate={0}
                pagingEnabled
                snapToAlignment={"center"}
                style={styles.scroll}
                ref={scrollRef}
                scrollEnabled={shouldScroll}
                onMomentumScrollEnd={handleScroll}
                onScrollBeginDrag={() => setUserDidSwipe(true)}
            >
                <AnimalInfoScreen />
                <ShopScreen />
                <HomeScreen />
                <ShopScreen />
                <ShopScreen />
            </ScrollView>
            <NavBar activePage={activePage} setActivePage={setActivePage} />
        </ForestBackground >

    )
}

const styles = StyleSheet.create(
    {
        scroll: {
            flex: 1
        }
    }
)