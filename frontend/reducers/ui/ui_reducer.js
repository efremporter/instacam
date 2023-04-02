import { combineReducers } from "redux";
import DoubleModalReducer from "./double_modal_reducer";
import ModalReducer from "./modal_reducer";

const UIReducer = combineReducers({
  modal: ModalReducer,
  doubleModal: DoubleModalReducer,
});

export default UIReducer;