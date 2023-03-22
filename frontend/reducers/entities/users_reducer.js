import { RECEIVE_CURRENT_USER, SIGN_OUT_CURRENT_USER } from "../../actions/session_actions";

const UsersReducer = (state={}, action) => {
  Object.freeze(state);
  let nextState = Object.assign({}, state);

  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      console.log(action.data.id)
      return Object.assign(nextState, { [action.data.id]: action.data });

    case SIGN_OUT_CURRENT_USER:
      return {};

    default:
      return state;
  }
};

export default UsersReducer;