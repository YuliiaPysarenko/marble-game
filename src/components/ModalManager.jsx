import { EditUserData, RecordTable } from "../views";
import Notification from "./Notification";

export default function ModalManager({
  closeFn = () => null,
  modal = "",
  textNotification,
}) {
  return (
    <>
      <EditUserData closeFn={closeFn} open={modal === "editData"} />
      <RecordTable
        closeFn={closeFn}
        open={modal === "recordTable"}
        textNotification={textNotification}
      />
      <Notification
        closeFn={closeFn}
        open={modal === "notification"}
        textNotification={textNotification}
      />
    </>
  );
}
