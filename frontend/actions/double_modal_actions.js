export const OPEN_DOUBLE_MODAL = "OPEN_DOUBLE_MODAL";
export const CLOSE_DOUBLE_MODAL = "CLOSE_DOUBLE_MODAL";

const receiveModal = modalType => {
  return {
    type: OPEN_DOUBLE_MODAL,
    data: modalType
  };
};

const collapseModal = () => {
  return {
    type: CLOSE_DOUBLE_MODAL
  };
};

export const openDoubleModal = type => dispatch => {
  dispatch(receiveModal(type));
};

export const closeDoubleModal = () => dispatch => {
  dispatch(collapseModal());
};