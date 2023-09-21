import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import InventoryDropDown from '../Inventory/InventoryDropDown';
import { useSelector, useDispatch } from 'react-redux';
import { setAnimalLocation } from '../../Actions/AnimalLocationActions';
import OverlayContainer from '../Containers/OverlayContainer';
import {
  ANIMAL_POSITION_BOTTOM,
  ANIMAL_HEIGHT,
  width,
  height,
  INVENTORY_POSITION_TOP,
  INVENTORY_HEIGHT,
} from '../../layoutConsts';
import { Icon } from 'native-base';
import DraggableImage from '../Inventory/DraggableImage';
import ToDoList from './ToDoList';
import TrainingInput from './TrainingInput';
import TrainingGuess from './TrainingGuess';
import SettingsMenu from './SettingsMenu';

function HomeScreenBackground(props) {
  const dispatch = useDispatch();
  const showAnimal = useSelector((state) => state.animalLocation.show);
  const [showToDoList, setShowToDoList] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const hungerInfo = useSelector((state) => state.hunger);
  const cleanlinessInfo = useSelector((state) => state.cleanliness);
  const exerciseInfo = useSelector((state) => state.exercise);
  const intelligenceInfo = useSelector((state) => state.intelligence);

  const dogChoice = useSelector((state) => state.settings.dog);

  const dogSelection = {
    goldenRetriever: {
      happy: require('../../assets/GoldenRetriever.png'),
      sad: require('../../assets/SadGoldenRetriever.png'),
    },
    scottishTerrier: {
      happy: require('../../assets/ScottishTerrier.png'),
      sad: require('../../assets/SadScottishTerrier.png'),
    },
  };

  const isHappy = () => {
    let happy = true;
    let date = new Date();
    happy =
      happy &&
      !(
        hungerInfo.checkTimeSince(date, hungerInfo.lastFed) &&
        hungerInfo.timesFedToday < 2
      );

    happy =
      happy &&
      !(
        exerciseInfo.checkTimeSince(date, exerciseInfo.lastExercised) &&
        exerciseInfo.timesExercisedToday < 3
      );

    happy =
      happy &&
      !(
        cleanlinessInfo.checkTimeSince(date, cleanlinessInfo.lastCleaned) &&
        cleanlinessInfo.timesCleanedToday < 1
      );

    happy = happy && intelligenceInfo.timesTrainedToday >= 5;

    return happy;
  };

  return (
    <View style={styles.homeScreenView}>
      <View
        style={styles.animalImageView}
        onLayout={(event) => {
          const layout = event.nativeEvent.layout;

          let location = {
            bottom: layout.y + layout.height,
            right: layout.width + layout.x,
            left: layout.x,
            top: layout.y,
          };

          dispatch(setAnimalLocation(location));
        }}
      >
        <Image
          source={
            isHappy()
              ? dogSelection[dogChoice].happy
              : dogSelection[dogChoice].sad
          }
          key={'animalImage'}
          style={[styles.animalImage, { opacity: showAnimal ? 1 : 0.5 }]}
          resizeMode="contain"
        />
      </View>
      <InventoryDropDown />
      <TouchableOpacity
        style={styles.toDoListButton}
        onPress={() => setShowToDoList(true)}
      >
        <Icon
          type="FontAwesome"
          name="pencil-square-o"
          style={styles.icon}
        ></Icon>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => setShowSettings(true)}
      >
        <Icon type="FontAwesome" name="gears" style={styles.icon}></Icon>
      </TouchableOpacity>
      <TrainingInput />
      <ToDoList setShowToDoList={setShowToDoList} showToDoList={showToDoList} />
      <TrainingGuess />
      <SettingsMenu showModal={showSettings} setShowModal={setShowSettings} />
      <StatusBar style="auto" />
    </View>
  );
}

export default function HomeScreen() {
  return (
    <OverlayContainer
      behind={<HomeScreenBackground />}
      front={<DraggableImage />}
    />
  );
}

const styles = StyleSheet.create({
  homeScreenView: {
    width: width,
    height: height,
    alignItems: 'center',
  },
  animalImageView: {
    height: ANIMAL_HEIGHT,
    borderColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: ANIMAL_POSITION_BOTTOM,
    zIndex: 1,
  },
  animalImage: {
    height: '100%',
    aspectRatio: 8 / 9,
    flex: 1,
    resizeMode: 'contain',
    zIndex: 1,
  },
  buttonArea: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLine: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    marginTop: '2%',
    marginBottom: '2%',
    width: 60,
    height: 60,
    backgroundColor: 'gold',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  buttonText: {
    fontSize: 20,
    color: '#bf9700',
  },
  toDoListButton: {
    top: INVENTORY_POSITION_TOP + INVENTORY_HEIGHT + height / 60,
    right: width / 100,
    position: 'absolute',
    backgroundColor: 'gold',
    padding: 5,
    borderRadius: 10,
    borderColor: '#ffec80',
    borderWidth: 2,
    height: 65,
    width: 65,
  },

  settingsButton: {
    top: INVENTORY_POSITION_TOP + INVENTORY_HEIGHT + (height / 60) * 2 + 65,
    right: width / 100,
    position: 'absolute',
    backgroundColor: 'gold',
    padding: 5,
    borderRadius: 10,
    borderColor: '#ffec80',
    borderWidth: 2,
    height: 65,
    width: 65,
  },
  icon: {
    fontSize: 50,
    color: '#998200',
  },
});
