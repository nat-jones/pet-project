import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { width, height, ANIMAL_INFO_WINDOW_HEIGHT, ANIMAL_INFO_WINDOW_WIDTH, ANIMAL_PICTURE_MARGIN } from '../../layoutConsts';
import SelectedAnimalInfo from './SelectedAnimalInfo';
import AnimalImage from './AnimalImage';


export default function AnimalInfoScreen(props) {

    const axios = require('axios');
    const cheerio = require('cheerio');
    const [dogs, setDogs] = useState([])
    const [isLoaded, setLoaded] = useState(false);
    const [selectedAnimal, setSelectedAnimal] = useState(null);
    const parseAnimalInfo = (rawInfo) => {

        const $ = cheerio.load(rawInfo);
        const animals = [];

    }
    const getAllAnimalInfo = async () => {
        const { data } = await axios.get('https://amigosdelosanimalespr.org/adoptable-dogs/');
        const $ = cheerio.load(data);


        const allDogs = $('.dog.dog')
            .get()
            .map(
                (dog) => {
                    const dogID = $(dog).find('.name a').attr('id');
                    const dogName = $(dog).find('.name a').text();
                    const dogImage = $(dog).find('.images img').attr('src');
                    const rawDogDescription = $(dog).find('.description p').text();
                    const parsedDogDescription = rawDogDescription.split('View full description')[0];
                    const info = $(dog).find('.images ul').find('.pet-options li').text();
                    console.log(info);
                    return {
                        id: dogID,
                        name: dogName,
                        src: dogImage,
                        description: parsedDogDescription
                    }
                    //console.log(dogImage.text());
                }
            );
        //console.log(dog);
        setDogs(allDogs);
        setLoaded(true);
        //parseAnimalInfo(data);
    }

    useEffect(() => { getAllAnimalInfo() }, [isLoaded])

    return (
        <View style={styles.window}>


            <View style={styles.animalInfoView}>
                {selectedAnimal != null ?
                    <SelectedAnimalInfo {...selectedAnimal} setSelectedAnimal={setSelectedAnimal} />
                    :
                    <ScrollView style={styles.scrollView} alwaysBounceHorizontal={false}>
                        {dogs.map(
                            (e) => {
                                return <AnimalImage setSelectedAnimal={setSelectedAnimal} imageSource={e.src} id={e.id} key={e.id} name={e.name} description={e.description} />
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