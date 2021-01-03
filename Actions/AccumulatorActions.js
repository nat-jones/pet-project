/*
Actions used to control XP, coins, and gems
*/

export const addAccumulator = (numAdded, accumulator) => {
  return {
    type: "ADD_ACCUMULATOR",
    accumulator,
    numAdded,
  };
};

export const useAccumulator = (numSpent, accumulator) => {
  return {
    type: "USE_ACCUMULATOR",
    accumulator,
    numSpent,
  };
};

export const setAccumulator = (value, accumulator) => {
  return {
    type: "SET_ACCUMULATOR",
    accumulator,
    value,
  };
};

export const setAllAccumulators = (values) => {
  return {
    type: "SET_ALL_ACCUMULATORS",
    values: values,
  };
};
