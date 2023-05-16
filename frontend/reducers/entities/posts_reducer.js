import { RECEIVE_POST, RECEIVE_POSTS, REMOVE_POST, REMOVE_POSTS } from "../../actions/post_actions";

const PostsReducer = (state={}, action) => {
  Object.freeze(state);
  const nextState = Object.assign({}, state);

  switch (action.type) {
    case RECEIVE_POSTS:
      return action.data;

    case RECEIVE_POST:
      return Object.assign(nextState, action.data);

    case REMOVE_POST:
      delete nextState[action.data]
      return nextState;

    case REMOVE_POSTS:
      return {};

    default:
      return state;
  };
};

export default PostsReducer;