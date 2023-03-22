import { combineReducers } from "redux";
import EntitiesReducer from "./entities/entities_reducer"
import SessionReducer from "./session/session_reducer";
// import UIReducer from "./ui/ui_reducer";

const RootReducer = combineReducers({
  entities: EntitiesReducer,
  session: SessionReducer,
  // ui: UIReducer,
});

export default RootReducer;