import React from "react";

const ModalCloseButton = ({ onClick }) => (
  <button className="modal__close-button" onClick={onClick}>
    <i className="fas fa-times"></i>
  </button>
);

export default ModalCloseButton;
