import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import {
  TODO_LIST_HEIGHT,
  TODO_LIST_TEXT_MARGIN_LEFT,
  TODO_LIST_WIDTH,
} from '../../layoutConsts';

export default function ToDoLineItem({
  lineName,
  checkedImage,
  lineImage,
  imgArr,
  lastCared,
  timesCaredToday,
  didMiscare,
  checkTimeSince,
}) {
  let date = new Date();
  let imgWidth = TODO_LIST_WIDTH / (2 * imgArr.length);
  return (
    <View style={styles.line}>
      <Text style={styles.lineText}>{lineName + ':'}</Text>
      <View style={styles.imageContainer}>
        {imgArr.map((e) => {
          if (timesCaredToday < e) {
            if (checkTimeSince(date, lastCared)) {
              return (
                <Image
                  source={lineImage}
                  style={[styles.lineImage, { width: imgWidth }]}
                  key={e}
                ></Image>
              );
            } else {
              return (
                <Image
                  source={lineImage}
                  style={[
                    styles.lineImage,
                    styles.grayedImage,
                    { width: imgWidth },
                  ]}
                  key={e}
                ></Image>
              );
            }
          } else {
            return (
              <Image
                source={checkedImage}
                style={[styles.lineImage, { width: imgWidth }]}
                key={e}
              ></Image>
            );
          }
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  line: {
    width: '100%',
    height: TODO_LIST_HEIGHT / 6,
    borderTopColor: 'blue',
    borderTopWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lineText: {
    fontSize: 30,
    fontFamily: 'ChalkboardSE-Bold',
    marginLeft: TODO_LIST_TEXT_MARGIN_LEFT,
  },
  lineImage: {
    height: TODO_LIST_HEIGHT / 8,
    width: TODO_LIST_WIDTH / 4,
    resizeMode: 'contain',
  },
  grayedImage: {
    opacity: 0.3,
  },
  imageContainer: {
    width: TODO_LIST_WIDTH / 2,
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'relative',
  },
});
