import { RECEIVE_USER_ERRORS, REMOVE_USER_ERRORS } from '../../actions/user_actions';

const UsersErrorsReducer = (state = [], action) => {

  Object.freeze(state);

  switch (action.type) {

    case RECEIVE_USER_ERRORS:
      return action.data;

    case REMOVE_USER_ERRORS:
      return [];

    default:
      return state;
  }

}

export default UsersErrorsReducer;