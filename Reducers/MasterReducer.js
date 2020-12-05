import LoginReducer from './LoginReducer';
import AccumulatorReducer from './AccumulatorReducer';
import FoodReducer from './FoodReducer';
import BarReducer from './BarReducer';
import { combineReducers } from 'redux';

const MasterReducer = combineReducers({
    userID: LoginReducer,
    accumulators: AccumulatorReducer,
    food: FoodReducer,
    bars: BarReducer
});

export default MasterReducer;