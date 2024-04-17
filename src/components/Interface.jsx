import { useKeyboardControls } from "@react-three/drei";
import useGame from "../stores/useGame";
import { useContext, useEffect, useRef, useState } from "react";
import { addEffect } from "@react-three/fiber";
import { Joystick } from "react-joystick-component";
import { onValue, ref, set } from "firebase/database";
import { DBContext, UserContext, RECORDS_PATH, allRecordsRef } from "../utils/firebase/const";
import { getAllRecords } from "../utils/firebase/helpers";

export default function Interface({ openModal, modalOpen }) {
  const time = useRef();
  const [recordsList, setRecordsList] = useState([]);

  const user = useContext(UserContext);
  const db = useContext(DBContext);
  const restart = useGame((state) => state.restart);
  const phase = useGame((state) => state.phase);

  const forward = useKeyboardControls((state) => state.forward);
  const backward = useKeyboardControls((state) => state.backward);
  const leftward = useKeyboardControls((state) => state.leftward);
  const rightward = useKeyboardControls((state) => state.rightward);
  const jump = useKeyboardControls((state) => state.jump);

  let state = useGame.getState();

  const keysOnMobile = {
    FORWARD: "KeyW",
    BACKWARD: "KeyS",
    LEFT: "KeyA",
    RIGHT: "KeyD",
    JUMP: "Space",
  };

  useEffect(() => {
    const unsunscribeEffect = addEffect(() => {
      state = useGame.getState();

      let elapsedTime = 0;

      if (state.phase === "playing") {
        elapsedTime = Date.now() - state.startTime;
      } else if (state.phase === "ended") {
        elapsedTime = state.endTime - state.startTime;
      }

      elapsedTime /= 1000;
      elapsedTime = elapsedTime.toFixed(2);

      if (time.current) {
        time.current.textContent = elapsedTime;
      }
    });

    return () => {
      unsunscribeEffect();
    };
  }, []);

  useEffect(() => {
    if (recordsList.length === 0) {
      getAllRecords(setRecordsList);
    }
    if (state.phase === "ended") {
      const value = ((state.endTime - state.startTime) / 1000).toFixed(2);
      sendRecordValue(value);
    }
  }, [state.phase]);

  function checkUsersWinners(uid) {
    const userIndex = recordsList.findIndex((user) => user.uid === uid);
    if (userIndex === 0) {
      openModal("recordTable", "Wow! You're the winner!", uid);
    } else if (userIndex < 10) {
      openModal("recordTable", "Wow! You're on TOP-10 list!", uid);
    } else {
      openModal("notification", `Congrats! You have a new own record!`);
    }
  }

  function sendRecordValue(value) {
    getAllRecords(setRecordsList);
    
    const recordsRef = ref(db, RECORDS_PATH + user.uid);

    onValue(recordsRef, (responce) => {
      const data = responce.val();
      if (
        (data && Number(data.record) > Number(value)) ||
        !data && user.uid ||
        (data && !data.record)
      ) {
        set(recordsRef, {
          ...user,
          record: value,
        });
        checkUsersWinners(user.uid, value)
      }
    });
  }

  const setKeyOnMobile = (key = "") => {
    if (keysOnMobile[key]) {
      window.dispatchEvent(
        new KeyboardEvent("keydown", { key: keysOnMobile[key] })
      );
    }
  };

  const releaseKeyOnMobile = () => {
    Object.keys(keysOnMobile).forEach((key) => {
      window.dispatchEvent(
        new KeyboardEvent("keyup", { key: keysOnMobile[key] })
      );
    });
  };

  return (
    <>
      <div className="interface">
        <div ref={time} className="time">
          0.00
        </div>
        {phase === "ended" && (
          <div className="restart" onClick={modalOpen ? null : restart}>
            restart
          </div>
        )}

        <div className="controls">
          <div className="raw">
            <div className={`key ${forward ? "active" : ""}`}></div>
          </div>
          <div className="raw">
            <div className={`key ${leftward ? "active" : ""}`}></div>
            <div className={`key ${backward ? "active" : ""}`}></div>
            <div className={`key ${rightward ? "active" : ""}`}></div>
          </div>
          <div className="raw">
            <div className={`key large ${jump ? "active" : ""}`}></div>
          </div>
        </div>
      </div>

      <div className="joystick">
        <Joystick
          size={100}
          baseColor="#ffffff5b"
          stickColor="white"
          style={{ bottom: "100px", left: "90px" }}
          move={(e) => setKeyOnMobile(e.direction)}
          stop={() => releaseKeyOnMobile()}
          throttle={200}
        ></Joystick>
        <button
          className="jump active"
          onClick={() => setKeyOnMobile("JUMP")}
          onKeyUp={(e) => releaseKeyOnMobile()}
        >
          Jump
        </button>
      </div>
    </>
  );
}
