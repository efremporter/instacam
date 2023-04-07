export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";

const receiveModal = modal => {
  return {
    type: OPEN_MODAL,
    data: modal
  };
};

const collapseModal = () => {
  return {
    type: CLOSE_MODAL
  };
};

export const openModal = modal => dispatch => {
  dispatch(receiveModal(modal));
};

export const closeModal = () => dispatch => {
  dispatch(collapseModal());
};