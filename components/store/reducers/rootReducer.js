import { combineReducers } from "redux";
import cityReducer from "./cityReducer";
import sesionReducer from "./sesionReducer";
import itineraryReducer from "./itineraryReducer";
import commentReducer from "./commentReducer";
import favouriteReducer from "./favouriteReducer";


const rootReducer = combineReducers({
  cityReducer,
  sesionReducer,
  favouriteReducer,
  itineraryReducer,
  commentReducer
});

export default rootReducer;
