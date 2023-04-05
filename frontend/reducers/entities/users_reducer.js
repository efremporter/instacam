import { RECEIVE_CURRENT_USER, SIGN_OUT_CURRENT_USER } from "../../actions/session_actions";
import { RECEIVE_USERS, RECEIVE_USER } from "../../actions/user_actions";

const UsersReducer = (state={}, action) => {
  Object.freeze(state);
  let nextState = Object.assign({}, state);

  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return Object.assign(nextState, { [action.data.id]: action.data });

    case RECEIVE_USERS:
      nextState = Object.assign(nextState, action.data);
      return nextState;
    
    case RECEIVE_USER:
      nextState[action.data.id] = action.data
      return nextState;

    case SIGN_OUT_CURRENT_USER:
      return {};

    default:
      return state;
  }
};

export default UsersReducer;