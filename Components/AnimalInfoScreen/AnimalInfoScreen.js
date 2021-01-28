import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { width, height, WINDOW_HEIGHT, WINDOW_WIDTH, ANIMAL_PICTURE_MARGIN, WINDOW_BOTTOM_MARGIN, WINDOW_TOP_MARGIN } from '../../layoutConsts';
import SelectedAnimalInfo from './SelectedAnimalInfo';
import AnimalImage from './AnimalImage';
import { useDispatch, useSelector } from 'react-redux';


export default function AnimalInfoScreen(props) {

    const dispatch = useDispatch();
    const sponsorableAnimalsInfo = useSelector(state => state.sponsorableAnimals);
    const [selectedAnimal, setSelectedAnimal] = useState(null);


    return (
        <View style={styles.window}>

            <View style={styles.animalInfoView}>

                {selectedAnimal != null ?
                    <SelectedAnimalInfo {...selectedAnimal} setSelectedAnimal={setSelectedAnimal} />
                    :
                    <ScrollView style={styles.scrollView} alwaysBounceHorizontal={false}>
                        {Object.keys(sponsorableAnimalsInfo.allDogInfo).map(
                            (e) => {
                                let dogInfo = sponsorableAnimalsInfo.allDogInfo[e]
                                return <AnimalImage setSelectedAnimal={setSelectedAnimal} imageSource={dogInfo.src} id={dogInfo.id} key={dogInfo.id} name={dogInfo.name} description={dogInfo.description} />
                            }
                        )}

                    </ScrollView>
                }

            </View>

        </View>
    )
}

const styles = StyleSheet.create(
    {
        window: {
            width: width,
            height: height,
            alignItems: 'center',
            justifyContent: 'center'
        },
        animalInfoView: {
            width: WINDOW_WIDTH,
            maxHeight: WINDOW_HEIGHT,
            marginBottom: WINDOW_BOTTOM_MARGIN,
            marginTop: WINDOW_TOP_MARGIN,
            borderRadius: 5,
            backgroundColor: "rgba(153, 130, 0, .5)",
            borderWidth: 2,
            borderColor: 'gold',
            overflow: 'hidden'
        },
        scrollView: {
            width: WINDOW_WIDTH,
            height: WINDOW_HEIGHT,
            paddingTop: ANIMAL_PICTURE_MARGIN,
            flexDirection: 'row',
            flexWrap: 'wrap',

        }
    }
)