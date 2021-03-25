import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import CareerOption from './CareerOption';
import { CAREER_INFO } from '../../careerInfo';
import { WINDOW_HEIGHT, WINDOW_WIDTH, WINDOW_TOP_MARGIN, WINDOW_BOTTOM_MARGIN } from '../../layoutConsts';

export default function SelectCareerScreen(props) {

    return (
        <View style={styles.careerWindow}>
            <ScrollView
                horizontal={true}
                bounces={false}
                disableIntervalMomentum={true}
                pagingEnabled={true}
            >
                {Object.keys(CAREER_INFO).map(
                    (e) => (<CareerOption {...CAREER_INFO[e]}
                        setShowCareerSelection={props.setShowCareerSelection}
                        key={CAREER_INFO[e].id} />)
                )
                }
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    careerWindow: {
        maxWidth: WINDOW_WIDTH,
        maxHeight: WINDOW_HEIGHT,
        marginTop: WINDOW_TOP_MARGIN,
        marginBottom: WINDOW_BOTTOM_MARGIN,
        borderWidth: 3,
        borderRadius: 5,
        borderColor: 'gold',
    }
})