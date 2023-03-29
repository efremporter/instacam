import { RECEIVE_POST, RECEIVE_POSTS, REMOVE_POST } from "../../actions/post_actions";

const PostsReducer = (state={}, action) => {
  Object.freeze(state);
  const nextState = Object.assign({}, state);

  switch (action.type) {
    case RECEIVE_POSTS:
      return Object.assign(nextState, action.data);

    case RECEIVE_POST:
      nextState[action.data.id] = action.data;
      return nextState;

    case REMOVE_POST:
      delete nextState[action.data]
      return nextState;

    default:
      return state;
  };
};

export default PostsReducer;