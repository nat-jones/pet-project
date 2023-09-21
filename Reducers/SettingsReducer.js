export default function SettingsReducer(
  state = {
    background: 'cabin',
    dog: 'goldenRetriever',
  },
  action
) {
  switch (action.type) {
    case 'SET_DOG':
      return {
        ...state,
        dog: action.value,
      };
    case 'SET_BACKGROUND':
      return {
        ...state,
        background: action.value,
      };

    default:
      return state;
  }
}
