import { RECEIVE_CURRENT_USER, SIGN_OUT_CURRENT_USER } from "../../actions/session_actions";

const UsersReducer = (state={}, action) => {
  Object.freeze(state);
  let nextState = Object.assign({}, state);

  switch (action.type) {

    case RECEIVE_CURRENT_USER:
      return Object.assign(nextState, { [action.data.user.id]: action.data.user });

    case SIGN_OUT_CURRENT_USER:
      return {};

    default:
      return state;
  }
};

export default UsersReducer;