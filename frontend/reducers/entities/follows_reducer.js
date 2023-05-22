import { RECEIVE_FOLLOWS, RECEIVE_FOLLOW, REMOVE_FOLLOW } from '../../actions/follow_actions';

const FollowsReducer = (state={}, action) => {
  Object.freeze(state);
  const nextState = Object.assign({}, state);

  switch(action.type) {
    case RECEIVE_FOLLOWS: 
      return action.data;

    case RECEIVE_FOLLOW:
      return Object.assign(nextState, action.data);
    
    case REMOVE_FOLLOW:
      delete nextState[action.data];
      return nextState;

    default:
      return state;
  };
};

export default FollowsReducer