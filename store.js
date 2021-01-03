import { createStore } from "redux";
import MasterReducer from "./Reducers/MasterReducer";

const Store = createStore(MasterReducer);

export default Store;