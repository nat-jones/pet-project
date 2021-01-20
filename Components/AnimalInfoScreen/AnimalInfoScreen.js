import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { width, height, ANIMAL_INFO_WINDOW_HEIGHT, ANIMAL_INFO_WINDOW_WIDTH, ANIMAL_PICTURE_MARGIN } from '../../layoutConsts';
import SelectedAnimalInfo from './SelectedAnimalInfo';
import AnimalImage from './AnimalImage';
import { getAllAnimalInfo } from '../../DogScraper';
import { useDispatch, useSelector } from 'react-redux';
import { setAllDogInfo } from '../../Actions/SponsorableAnimalActions';


export default function AnimalInfoScreen(props) {

    const dispatch = useDispatch();
    const sponsorableAnimalsInfo = useSelector(state => state.sponsorableAnimals);
    const [dogs, setDogs] = useState([])
    const [isLoaded, setLoaded] = useState(false);
    const [selectedAnimal, setSelectedAnimal] = useState(null);


    const loadPage = async () => {
        let dogInfo = await (getAllAnimalInfo());
        dispatch(setAllDogInfo(dogInfo));
        setLoaded(true);

    }


    useEffect(() => { loadPage() }, [isLoaded])

    return (
        <View style={styles.window}>

            <View style={styles.animalInfoView}>
                {isLoaded &&
                    selectedAnimal != null ?
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
            width: ANIMAL_INFO_WINDOW_WIDTH,
            height: ANIMAL_INFO_WINDOW_HEIGHT,
            borderRadius: 5,
            backgroundColor: "rgba(153, 130, 0, .5)",
            borderWidth: 2,
            borderColor: 'gold',
            overflow: 'hidden'
        },
        scrollView: {
            width: ANIMAL_INFO_WINDOW_WIDTH,
            height: ANIMAL_INFO_WINDOW_HEIGHT,
            paddingTop: ANIMAL_PICTURE_MARGIN,
            flexDirection: 'row',
            flexWrap: 'wrap',

        }
    }
)