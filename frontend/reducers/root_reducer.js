import { combineReducers } from "redux";
import EntitiesReducer from "../reducers/entities/entities_reducer"
import UsersReducer from "./entities/users_reducer";

const RootReducer = combineReducers({
  entities: EntitiesReducer,
  users: UsersReducer
});

export default RootReducer;