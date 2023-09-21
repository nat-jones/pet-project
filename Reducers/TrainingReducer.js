import { TRICK_DEFAULTS } from '../TrickConsts.js';

export default function TrainingReducer(
  state = {
    trainingData: {},
    guess: null,
    command: null,
  },
  action
) {
  let newState = { ...state };
  switch (action.type) {
    case 'SET_TRAINING':
      newState = { ...state, trainingData: { ...action.value } };
      return newState;

    case 'LEARN':
      if (!(action.command in state.trainingData)) {
        newState.trainingData[action.command] = { ...TRICK_DEFAULTS };
      }

      newState.trainingData[action.command][action.attempt] += action.outcome
        ? 0.25
        : -0.25;
      if (newState.trainingData[action.command][action.attempt] < 1) {
        newState.trainingData[action.command][action.attempt] = 1;
      }

      return newState;

    case 'GUESS':
      newState.guess = action.attempt;
      newState.command = action.command;
      return newState;

    default:
      return state;
  }
}
