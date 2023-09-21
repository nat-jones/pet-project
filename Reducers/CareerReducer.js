const CareerReducer = (
  state = { career: null, expectedShiftEnd: null, lastShiftType: null },
  action
) => {
  let newState = {
    career: { ...state.career },
    expectedShiftEnd: state.expectedShiftEnd,
    lastShiftType: state.lastShiftType,
  };

  switch (action.type) {
    case 'SET_CAREER':
      newState.career = { ...action.value };

      return newState;

    case 'START_SHIFT':
      newState.expectedShiftEnd = action.expectedShiftEnd;
      newState.lastShiftType = action.lastShiftType;

      return newState;

    case 'SET_ALL_CAREER_INFO':
      return { ...action.value };

    case 'REDUCE_SHIFT':
      newState.expectedShiftEnd = state.expectedShiftEnd - 1800000;

    default:
      return newState;
  }
};

export default CareerReducer;
