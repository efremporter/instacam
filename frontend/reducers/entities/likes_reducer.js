import { RECEIVE_LIKES, RECEIVE_LIKE, REMOVE_LIKE } from "../../actions/like_actions";

const LikesReducer = (state={}, action) => {
  Object.freeze(state);
  const nextState = Object.assign({}, state);

  switch (action.type) {
    case RECEIVE_LIKES:
      return Object.assign(nextState, action.data);
    
    case RECEIVE_LIKE:
      return Object.assign(nextState, action.data);

    case REMOVE_LIKE:
      delete nextState[action.data];
      return nextState;

    default:
      return state;
  };
};

export default LikesReducer;