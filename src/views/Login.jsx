import { initLoginBtns } from "../utils/firebase/helpers";
import { useEffect, useRef, useState } from "react";
import { BallCursor, CanvasScene, Social } from "../components";
import "firebaseui/dist/firebaseui.css";

export default function Login({ setUser }) {
  const cursorRef = useRef();
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });

  const editCursor = (e) => {
    const { clientX: x, clientY: y } = e;
    if (cursorRef.current) {
      cursorRef.current.style.left = x + "px";
      cursorRef.current.style.top = y + "px";
    }
  };

  useEffect(() => {
    initLoginBtns(setUser);

    const updateMousePosition = (e) => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Нормалізація координат курсора в діапазоні [-1, 1]
      const mouseX = (e.clientX / viewportWidth) * 4 - 2;
      const mouseY = -(e.clientY / viewportHeight) * 2 + 1;

      // Встановлюємо нові координати курсора
      setMousePosition({ x: mouseX, y: mouseY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  const transformCursor = (e) => {
    if (cursorRef.current) {
      cursorRef.current.style.transform = "translate(-50%, -50%) scale(8)";
    }
  };

  const leaveMouse = (e) => {
    if (cursorRef.current) {
      cursorRef.current.style.transform = "";
    }
  };

  return (
    <>
      <CanvasScene
        cameraOptions={{
          fov: 25,
          near: 0.1,
          far: 100,
          position: [0, 0, 5],
        }}
      >
        <BallCursor cursorPosition={mousePosition} />
      </CanvasScene>
      <Social />
      <div className="login" onMouseMove={editCursor}>
        <div className="login_container">
          <h1>Speed Race</h1>
          <h2>Please, sign in for joining the game:</h2>
          <div
            id="firebaseui-auth-container"
            onMouseEnter={transformCursor}
            onMouseLeave={leaveMouse}
          ></div>
          <div className="credits">
            <p>Developed by <a href="https://www.linkedin.com/in/yuliia-pysarenko/" target="_blank">Yuliia Demianchuk</a>, music by <a href="https://www.linkedin.com/in/demt/" target="_blank">Taras Demianchuk</a></p>
            <p>Inspired by <a href="https://www.linkedin.com/company/three-js-journey" target="_blank">Three.js Journey</a> ♥</p>
            <p>Have fun! :)</p>
          </div>
        </div>
        <div id="cursor" className="cursor" ref={cursorRef}></div>
      </div>
    </>
  );
}
