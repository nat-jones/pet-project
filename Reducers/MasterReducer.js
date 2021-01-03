import LoginReducer from "./LoginReducer";
import AccumulatorReducer from "./AccumulatorReducer";
import FoodReducer from "./FoodReducer";
import BarReducer from "./BarReducer";
import AnimalLocationReducer from './AnimalLocationReducer';
import { combineReducers } from "redux";
import ScrollReducer from "./ScrollReducer";
import SponsoredAnimalReducer from "./SponsoredAnimalReducer";

const MasterReducer = combineReducers({
  userID: LoginReducer,
  accumulators: AccumulatorReducer,
  food: FoodReducer,
  bars: BarReducer,
  animalLocation: AnimalLocationReducer,
  shouldScroll: ScrollReducer,
  sponsoredAnimal: SponsoredAnimalReducer
});

export default MasterReducer;
