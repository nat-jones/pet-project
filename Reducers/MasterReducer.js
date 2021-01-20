import LoginReducer from "./LoginReducer";
import AccumulatorReducer from "./AccumulatorReducer";
import InventoryReducer from "./InventoryReducer";
import BarReducer from "./BarReducer";
import AnimalLocationReducer from './AnimalLocationReducer';
import { combineReducers } from "redux";
import ScrollReducer from "./ScrollReducer";
import SponsorableAnimalReducer from "./SponsorableAnimalReducer";
import ShopReducer from './ShopReducer';

const MasterReducer = combineReducers({
  userID: LoginReducer,
  accumulators: AccumulatorReducer,
  inventory: InventoryReducer,
  bars: BarReducer,
  animalLocation: AnimalLocationReducer,
  shouldScroll: ScrollReducer,
  sponsorableAnimals: SponsorableAnimalReducer,
  cart: ShopReducer
});

export default MasterReducer;
