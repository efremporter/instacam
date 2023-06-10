import { combineReducers } from "redux";
import PostsReducer from "./posts_reducer";
import UsersReducer from "./users_reducer";
import LikesReducer from "./likes_reducer";
import CommentsReducer from "./comments_reducer";
import FollowsReducer from "./follows_reducer";
import FollowersReducer from "./follower_reducer";

const EntitiesReducer = combineReducers({
  users: UsersReducer,
  posts: PostsReducer,
  likes: LikesReducer,
  comments: CommentsReducer,
  follows: FollowsReducer,
  followers: FollowersReducer
});

export default EntitiesReducer;