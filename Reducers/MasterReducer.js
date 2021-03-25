import LoginReducer from "./LoginReducer";
import CoinReducer from "./CoinReducer";
import InventoryReducer from "./InventoryReducer";
import AnimalLocationReducer from './AnimalLocationReducer';
import { combineReducers } from "redux";
import DragReducer from "./DragReducer";
import SponsorableAnimalReducer from "./SponsorableAnimalReducer";
import ShopReducer from './ShopReducer';
import CareerReducer from "./CareerReducer";
import HungerReducer from "./HungerReducer";
import ExerciseReducer from "./ExerciseReducer";
import CleanlinessReducer from "./CleanlinessReducer";
import LoveReducer from "./LoveReducer";
import IntelligenceReducer from "./IntelligenceReducer";

const MasterReducer = combineReducers({
  userID: LoginReducer,
  coins: CoinReducer,
  inventory: InventoryReducer,
  animalLocation: AnimalLocationReducer,
  drag: DragReducer,
  sponsorableAnimals: SponsorableAnimalReducer,
  cart: ShopReducer,
  career: CareerReducer,
  hunger: HungerReducer,
  exercise: ExerciseReducer,
  cleanliness: CleanlinessReducer,
  love: LoveReducer,
  intelligence: IntelligenceReducer
});

export default MasterReducer;
