import { combineReducers } from "redux";
import cityReducer from "./cityReducer";
/* import itineraryReducer from "./itineraryReducer";
import sesionReducer from "./sesionReducer";
import commentReducer from "./commentReducer";
import favouriteReducer from "./favouriteReducer"; */


const rootReducer = combineReducers({
  cityReducer/* ,
  itineraryReducer,
  sesionReducer,
  commentReducer,
  favouriteReducer */
});

export default rootReducer;
