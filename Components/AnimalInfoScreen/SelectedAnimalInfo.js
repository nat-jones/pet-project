import React from 'react';
import { View, TouchableOpacity, ScrollView, Image, Text, StyleSheet } from 'react-native';
import { Icon } from 'native-base';
import { updateSponsoredAnimal } from '../../firebase';
import { sponsorAnimal } from '../../Actions/SponsorableAnimalActions';
import { useDispatch } from 'react-redux';


export default function SelectedAnimalInfo(props) {

    let imageSrc = { uri: props.imageSource }
    const dispatch = useDispatch();

    return (
        <View style={styles.window}>
            <TouchableOpacity style={styles.backArrowContainer} onPress={() => props.setSelectedAnimal(null)} >
                <Icon style={styles.backArrow} type='FontAwesome5' name='arrow-left'></Icon>
            </TouchableOpacity>
            <Image style={styles.image} source={imageSrc}></Image>
            <Text style={styles.dogName}>{props.name}</Text>
            <ScrollView style={styles.scrollView} alwaysBounceHorizontal={false}>
                <Text style={styles.description}>{props.description}</Text>
            </ScrollView>
            <TouchableOpacity style={styles.button} onPress={() => {
                updateSponsoredAnimal(props.id);
                dispatch(sponsorAnimal(props.id));
            }

            }>
                <Text style={styles.buttonText}>
                    {'Sponsor ' + props.name}
                </Text>
            </TouchableOpacity>
        </View >
    );
}

const styles = StyleSheet.create(
    {
        window: {
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            width: '100%',
            height: '100%',
            paddingHorizontal: 20
        },
        button: {
            width: 'auto',
            padding: 20,
            backgroundColor: 'gold',
            color: 'rgba(153, 130, 0, .5)',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            height: 'auto',
            margin: 20
        },
        buttonText: {
            fontSize: 20,
            color: 'black'
        },
        image: {
            width: 300,
            height: 300,
            borderRadius: 150,
            margin: 20,
            borderWidth: 2,
            borderColor: 'gold'
        },
        backArrowContainer: {
            position: 'absolute',
            top: 20,
            left: 20
        },
        backArrow: {
            color: 'gold'
        },
        dogName: {
            fontSize: 40,
            color: 'gold',
            margin: 20
        },
        scrollView: {
            backgroundColor: 'gold',
            borderRadius: 5,
            padding: 10
        },
        description: {
            color: 'black',
            fontSize: 20,
            textAlign: 'center'
        }



    }
)