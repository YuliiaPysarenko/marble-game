import { useEffect } from "react";
import Modal from "./Modal";

export default function Notification({
  closeFn = () => null,
  open = false,
  textNotification,
}) {
  useEffect(() => {
    const notificationIsOpen = document.querySelector("#modal-root .congrats");
    if (open && notificationIsOpen) {
      setTimeout(() => {
        closeFn();
      }, 5000);
    }
  }, [open]);
  
  return (
    <Modal open={open}>
      <div className="congrats">
        <p>{textNotification}</p>
        <button type="button" className="close-modal" onClick={closeFn}>
          <svg id="icon-clear" viewBox="0 0 24 24">
            <path d="M18.984 6.422l-5.578 5.578 5.578 5.578-1.406 1.406-5.578-5.578-5.578 5.578-1.406-1.406 5.578-5.578-5.578-5.578 1.406-1.406 5.578 5.578 5.578-5.578z"></path>
          </svg>
        </button>
      </div>
    </Modal>
  );
}
