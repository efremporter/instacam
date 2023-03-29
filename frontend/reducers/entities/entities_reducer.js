import { combineReducers } from "redux";
import PostsReducer from "./posts_reducer";
import UsersReducer from "./users_reducer";

const EntitiesReducer = combineReducers({
  users: UsersReducer,
  posts: PostsReducer
});

export default EntitiesReducer;