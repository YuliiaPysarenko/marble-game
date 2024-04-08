import { createPortal } from "react-dom";

const modalRootEl = document.getElementById("modal-root");

const Modal = ({ children, open = false }) => {
  if (!open) return null;

  return createPortal(children, modalRootEl);
};

export default Modal;
