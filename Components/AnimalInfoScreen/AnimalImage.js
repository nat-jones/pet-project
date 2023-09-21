import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {
  ANIMAL_BIO_WIDTH,
  ANIMAL_PICTURE_MARGIN,
  ANIMAL_PICTURE_WIDTH,
} from '../../layoutConsts';

export default function AnimalImage(props) {
  return (
    <>
      <View style={styles.infoContainer}>
        <Text style={[styles.text, styles.name]}>{props.name}</Text>
        <View style={styles.bioContainer}>
          <TouchableOpacity
            onPress={() => props.setSelectedAnimal({ ...props })}
          >
            <Image style={styles.image} source={{ uri: props.imageSource }} />
          </TouchableOpacity>
          <View style={styles.textContainer}>
            <Text
              numberOfLines={6}
              elipsizeMode="tail"
              style={[styles.text, styles.bio]}
            >
              {props.description}
            </Text>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  infoContainer: {
    flexDirection: 'column',
    marginHorizontal: ANIMAL_PICTURE_MARGIN,
    marginBottom: ANIMAL_PICTURE_MARGIN,
  },
  bioContainer: {
    flexDirection: 'row',
    width: '100%',
    height: ANIMAL_PICTURE_WIDTH,
  },
  image: {
    width: ANIMAL_PICTURE_WIDTH,
    height: ANIMAL_PICTURE_WIDTH,
    borderColor: 'gold',
    borderWidth: 2,
    borderRadius: 5,
    marginRight: ANIMAL_PICTURE_MARGIN,
  },
  textContainer: {
    width: ANIMAL_BIO_WIDTH,
    overflow: 'hidden',
    backgroundColor: 'gold',
    padding: 5,
    borderRadius: 5,
  },
  text: {
    color: 'black',
  },
  bio: {
    fontSize: 20,
  },
  name: {
    color: 'gold',
    fontSize: 30,
  },
});
