import { RECEIVE_COMMENTS, RECEIVE_COMMENT, REMOVE_COMMENT } from '../../actions/comment_actions';

const CommentsReducer = (state = {}, action) => {
  Object.freeze(state);
  const nextState = Object.assign({}, state);

  switch (action.type) {
    case RECEIVE_COMMENTS:
      return Object.assign(nextState, action.data);

    case RECEIVE_COMMENT:
      return Object.assign(nextState, action.data);

    case REMOVE_COMMENT:
      delete nextState[action.data];
      return nextState;

    default:
      return state;
  };
};

export default CommentsReducer;