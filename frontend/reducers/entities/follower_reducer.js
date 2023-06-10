import { 
  RECEIVE_FOLLOWERS, RECEIVE_FOLLOWER, REMOVE_FOLLOWERS, REMOVE_FOLLOWER
} from '../../actions/follower_actions';

const FollowersReducer = (state = {}, action) => {
  Object.freeze(state);
  const nextState = Object.assign({}, state);

  switch (action.type) {
    case RECEIVE_FOLLOWERS:
      return Object.assign(nextState, action.data);

    case RECEIVE_FOLLOWER:
      return Object.assign(nextState, action.data);

    case REMOVE_FOLLOWERS:
      return {};

    case REMOVE_FOLLOWER:
      delete nextState[action.data];
      return nextState;

    default:
      return state;
  };
};

export default FollowersReducer