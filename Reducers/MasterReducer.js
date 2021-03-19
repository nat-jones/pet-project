import LoginReducer from "./LoginReducer";
import AccumulatorReducer from "./AccumulatorReducer";
import InventoryReducer from "./InventoryReducer";
import BarReducer from "./BarReducer";
import AnimalLocationReducer from './AnimalLocationReducer';
import { combineReducers } from "redux";
import DragReducer from "./DragReducer";
import SponsorableAnimalReducer from "./SponsorableAnimalReducer";
import ShopReducer from './ShopReducer';
import CareerReducer from "./CareerReducer";
import HungerReducer from "./HungerReducer";
import ExerciseReducer from "./ExerciseReducer";
import CleanlinessReducer from "./CleanlinessReducer";

const MasterReducer = combineReducers({
  userID: LoginReducer,
  accumulators: AccumulatorReducer,
  inventory: InventoryReducer,
  bars: BarReducer,
  animalLocation: AnimalLocationReducer,
  drag: DragReducer,
  sponsorableAnimals: SponsorableAnimalReducer,
  cart: ShopReducer,
  career: CareerReducer,
  hunger: HungerReducer,
  exercise: ExerciseReducer,
  cleanliness: CleanlinessReducer
});

export default MasterReducer;
