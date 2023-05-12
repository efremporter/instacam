import { combineReducers } from "redux";
import PostsReducer from "./posts_reducer";
import UsersReducer from "./users_reducer";
import LikesReducer from "./likes_reducer";
import CommentsReducer from "./comments_reducer";

const EntitiesReducer = combineReducers({
  users: UsersReducer,
  posts: PostsReducer,
  likes: LikesReducer,
  comments: CommentsReducer
});

export default EntitiesReducer;