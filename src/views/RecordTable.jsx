import { useContext, useEffect, useState } from "react";
import { UserContext } from "../utils/firebase/const";
import { getAllRecords } from "../utils/firebase/helpers";
import { Modal } from "../components";

export default function RecordTable({
  closeFn = () => null,
  open = false,
  textNotification,
}) {
  const [recordsList, setRecordsList] = useState([]);
  const user = useContext(UserContext);

  useEffect(() => {
    if (open && !recordsList.length) {
      getAllRecords(setRecordsList);
    }
  }, [open]);

  return (
    <Modal open={open}>
      <div className="modal">
        <h2>{textNotification || "TOP-10"}</h2>
        <table className="table">
          <tbody>
            {recordsList && recordsList.length > 0
              ? recordsList.map((item, index) => {
                  return item.record ? (
                    <tr
                      key={index}
                      className={`table__record-item record-${index + 1}`}
                    >
                      <td className="number">{index + 1}</td>
                      <td
                        className={`name ${
                          user.uid === item.uid ? "current" : ""
                        }`}
                      >
                        {item.publicName || item.displayName}
                      </td>
                      <td className="time-record">
                        {item.record}
                        {index + 1 === 1 ? (
                          <svg id="icon-trophy11" viewBox="0 0 32 32">
                            <path d="M26 6v-4h-20v4h-6v4c0 3.314 2.686 6 6 6 0.627 0 1.232-0.096 1.801-0.275 1.443 2.063 3.644 3.556 6.199 4.075v6.2h-2c-2.209 0-4 1.791-4 4h16c0-2.209-1.791-4-4-4h-2v-6.2c2.555-0.519 4.756-2.012 6.199-4.075 0.568 0.179 1.173 0.275 1.801 0.275 3.314 0 6-2.686 6-6v-4h-6zM6 13.625c-1.999 0-3.625-1.626-3.625-3.625v-2h3.625v2c0 1.256 0.232 2.457 0.655 3.565-0.213 0.039-0.431 0.060-0.655 0.060zM29.625 10c0 1.999-1.626 3.625-3.625 3.625-0.224 0-0.442-0.021-0.655-0.060 0.423-1.107 0.655-2.309 0.655-3.565v-2h3.625v2z"></path>
                          </svg>
                        ) : null}
                      </td>
                    </tr>
                  ) : null;
                })
              : null}
          </tbody>
        </table>
        <button type="button" className="close-modal" onClick={() => closeFn("record")}>
          <svg id="icon-clear" viewBox="0 0 24 24">
            <path d="M18.984 6.422l-5.578 5.578 5.578 5.578-1.406 1.406-5.578-5.578-5.578 5.578-1.406-1.406 5.578-5.578-5.578-5.578 1.406-1.406 5.578 5.578 5.578-5.578z"></path>
          </svg>
        </button>
      </div>
    </Modal>
  );
}
