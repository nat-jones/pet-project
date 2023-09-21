export default function IntelligenceReducer(
  state = {
    intelligenceStars: null,
    timesTrainedToday: null,
  },
  action
) {
  switch (action.type) {
    case 'SET_INTELLIGENCE_INFO':
      return action.value;

    case 'TRAIN':
      let newState = {
        ...state,
        timesTrainedToday: state.timesTrainedToday + 1,
      };

      return newState;

    default:
      return state;
  }
}
