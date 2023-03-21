import { RECEIVE_CURRENT_USER, SIGN_O, SIGN_OUT_CURRENT_USER } from "../../actions/session_actions";

const SessionReducer = (state={id: null}, action) => {
  Object.freeze(state);
  let nextState = Object.assign({}. state);

  switch(action.type) {

    case RECEIVE_CURRENT_USER:
      return Object.assign(nextState, { id: action.data.user.id })

    case SIGN_OUT_CURRENT_USER:
      return {id: null}

    default:
      return state;
  };
};

export default SessionReducer;