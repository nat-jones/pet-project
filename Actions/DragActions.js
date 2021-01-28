
export const enableScroll = () => ({ type: 'ENABLE_SCROLL' });

export const disableScroll = () => ({ type: 'DISABLE_SCROLL' });

export const setDragItem = (dragItem, pan, location) => (
    {
        type: 'SET_DRAG_ITEM',
        item: dragItem,
        pan: pan,
        location: location
    }
)

export const clearDragItem = () => (
    {
        type: 'CLEAR_DRAG_ITEM'
    }
)