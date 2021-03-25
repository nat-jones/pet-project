import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text, Modal } from 'react-native';
import {
    BAR_STATS_WRAPPER_HEIGHT,
    IMAGE_PADDING,
    CAREER_IMAGE_HEIGHT,
    BUTTON_HEIGHT,
    BUTTON_WIDTH,
    CAREER_WINDOW_PADDING,
    DESCRIPTION_HEIGHT,
    DESCRIPTION_WIDTH,
    ICON_CONTAINER_WIDTH,
    WINDOW_HEIGHT,
    WINDOW_WIDTH,
    DESCRIPTION_PADDING
} from '../../layoutConsts';
import { Icon } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { setCareer } from '../../Actions/CareerActions';

export default function CareerOption(props) {

    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();
    const [showUserStars, setShowUserStars] = useState(false);
    const hungerStars = useSelector(state => state.hunger.hungerStars);
    const exerciseStars = useSelector(state => state.exercise.exerciseStars);
    const cleanlinessStars = useSelector(state => state.cleanliness.cleanlinessStars);
    const starVals =
    {
        love: 0,
        hunger: hungerStars,
        cleanliness: cleanlinessStars,
        exercise: exerciseStars,
        intelligence: 0
    };



    return (
        <View style={[styles.optionWrapper, { backgroundColor: props.primaryColor }]}>
            <TouchableOpacity style={styles.iconContainer} onPress={() => setShowModal(true)}>
                {props.icon}
            </TouchableOpacity>
            <View>
                <Text style={[styles.jobTitle, styles.font]}>{props.displayString}</Text>
            </View>
            <View style={styles.imageWrapper}>
                <Image style={styles.image} source={props.imageSrc} />
            </View>
            <View style={styles.barStatsWrapper}>
                <View style={styles.barStatsArea}>
                    {Object.keys(props.barVals).map(
                        (e) => {
                            let icons = new Array(
                                showUserStars ? starVals[e] : props.barVals[e]
                            ).fill(
                                <Icon
                                    type='FontAwesome'
                                    name='star'
                                    style={[styles.barStat, styles.barStatIcon]}
                                />
                            );
                            return (
                                <View style={styles.barStatLine}>
                                    <View style={styles.barStatTextWrapper}>
                                        <Text style={[styles.barStat, styles.font]}>{e + ':'}</Text>
                                    </View>
                                    <View style={styles.barStatIconWrapper}>
                                        {icons}
                                    </View>
                                </View>);
                        }
                    )}
                </View>
                <View style={styles.dogStarToggle}>
                    <TouchableOpacity
                        onPressIn={() => {
                            setShowUserStars(true)
                        }}
                        onPressOut={() => setShowUserStars(false)}
                    >
                        <Icon type='MaterialCommunityIcons' name='dog' />
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <TouchableOpacity style={[styles.button]} onPress={
                    () => {
                        dispatch(setCareer(props.id));
                        props.setShowCareerSelection(false);
                    }
                }>
                    <Text style={[styles.font, styles.buttonFont]}>{"Become a " + props.displayString + " Dog!"}</Text>
                </TouchableOpacity>

            </View>
            <Modal visible={showModal} animationType='fade' transparent={true} style={styles.modal}>
                <View style={styles.modal}>
                    <View style={[styles.descriptionWrapper, { backgroundColor: props.primaryColor }]}>
                        <Text style={styles.descriptionFont}>{props.description}</Text>
                        <TouchableOpacity onPress={() => setShowModal(false)} style={styles.modalButton}>
                            <Text style={[styles.buttonFont, styles.font]}>
                                Close
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    optionWrapper: {
        width: WINDOW_WIDTH - 6,
        height: WINDOW_HEIGHT,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: CAREER_WINDOW_PADDING
    },
    jobTitle: {
        fontSize: 40
    },
    iconContainer: {
        width: ICON_CONTAINER_WIDTH,
        height: ICON_CONTAINER_WIDTH,
        borderRadius: ICON_CONTAINER_WIDTH / 2,
        borderWidth: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        width: BUTTON_WIDTH,
        height: BUTTON_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: 'gold'
    },
    modalButton: {
        width: DESCRIPTION_WIDTH * .6,
        height: BUTTON_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: 'gold'
    },
    font: {
        fontFamily: 'Didot-Italic',
        fontWeight: '900',
    },
    buttonFont: {
        fontSize: 20
    },
    imageWrapper: {
        width: '100%',
        height: CAREER_IMAGE_HEIGHT,
        marginTop: IMAGE_PADDING,
        borderWidth: 3,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: 0
    },
    descriptionWrapper: {
        alignItems: 'center',
        justifyContent: 'space-between',
        width: DESCRIPTION_WIDTH,
        height: DESCRIPTION_HEIGHT,
        padding: DESCRIPTION_PADDING,
        borderColor: 'gold',
        borderRadius: 5,
        borderWidth: 3
    },
    descriptionFont: {
        textAlign: 'center',
        fontSize: 20
    },
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(153, 153, 153, .6)'
    },
    barStatsWrapper: {
        width: "100%",
        height: BAR_STATS_WRAPPER_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    barStatsArea: {
        width: '80%',
        height: BAR_STATS_WRAPPER_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dogStarToggle: {
        width: '20%',
        height: BAR_STATS_WRAPPER_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
    },
    barStatIconWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '50%'
    },
    barStat: {
        fontSize: 20,
    },
    barStatIcon: {
        color: 'gold'
    },
    barStatLine: {
        width: '100%',
        flexDirection: 'row',
    },
    barStatTextWrapper: {
        width: '50%',
        paddingHorizontal: 5
    },
    image: {
        resizeMode: 'cover',
        width: '100%',
        height: CAREER_IMAGE_HEIGHT,
    }
})