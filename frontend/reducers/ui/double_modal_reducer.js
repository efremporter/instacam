import { OPEN_DOUBLE_MODAL, CLOSE_DOUBLE_MODAL } from "../../actions/double_modal_actions";


const DoubleModalReducer = (state = null, action) => {
  Object.freeze(state);

  switch (action.type) {

    case OPEN_DOUBLE_MODAL:
      return action.data


    case CLOSE_DOUBLE_MODAL:
      return null

    default:
      return state;
  };
};

export default DoubleModalReducer;