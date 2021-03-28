import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Image, Animated, StyleSheet } from 'react-native';
import { clearDragItem } from '../../Actions/DragActions';
import { INVENTORY_CARET_WIDTH, INVENTORY_HEIGHT, INVENTORY_ITEM_WIDTH, INVENTORY_POSITION_TOP } from '../../layoutConsts';


export default function DraggableImage(props) {

    const dragItem = useSelector(state => state.drag.dragItem);
    const pan = useSelector(state => state.drag.pan);
    const offset = useSelector(state => state.drag.location);
    const fadeAnim = useRef(new Animated.Value(1)).current;

    if (dragItem !== null) {

        return (
            <Animated.View
                style={{
                    transform: [{ translateX: pan.current.x }, { translateY: pan.current.y }],
                    opacity: fadeAnim,
                    width: "100%",
                    height: "100%",
                    zIndex: 3,

                }}
            >
                <Image
                    style={[{ top: offset.y, left: offset.x }, styles.image]}
                    source={dragItem.imageSrc}
                    resizeMode="contain"
                />
            </Animated.View>
        );
    }

    return null;

}

const styles = StyleSheet.create(
    {
        image: {
            height: INVENTORY_ITEM_WIDTH,
            width: INVENTORY_ITEM_WIDTH,
            zIndex: 3,
            position: "absolute",

        }
    }
);