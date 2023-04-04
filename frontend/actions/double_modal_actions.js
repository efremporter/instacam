export const OPEN_DOUBLE_MODAL = "OPEN_MODAL";
export const CLOSE_DOUBLE_MODAL = "CLOSE_MODAL";

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

export const openModal = type => dispatch => {
  dispatch(receiveModal(type));
};

export const closeModal = () => dispatch => {
  dispatch(collapseModal());
};