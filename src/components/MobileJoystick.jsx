import { Joystick } from "react-joystick-component";

export default function MobileJoystick() {
  const keysOnMobile = {
    FORWARD: "KeyW",
    BACKWARD: "KeyS",
    LEFT: "KeyA",
    RIGHT: "KeyD",
  };

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
    // <div className="joystick">
    //   <Joystick
    //     size={100}
    //     baseColor="#ffffff5b"
    //     stickColor="white"
    //     style={{ bottom: "100px", left: "90px" }}
    //     move={(e) => setKeyOnMobile(e.direction)}
    //     stop={() => releaseKeyOnMobile()}
    //     throttle={200}
    //   ></Joystick>
    //   <button className="jump active" onClick={releaseKeyOnMobile}>Jump</button>
    // </div>
    <></>
  );
}
