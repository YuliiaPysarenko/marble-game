import { Physics } from "@react-three/rapier";
import {
  Interface,
  Level,
  Lights,
  Player,
  Social,
  MobileJoystick,
  HeaderMenu,
  ModalManager,
} from "../components";
import useGame from "../stores/useGame.js";
import { KeyboardControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import useSoundPlayer from "../hooks/useSoundPlayer.js";

export default function Main() {
  const [textNotification, setTextNotification] = useState(null);
  const [modalOpen, setModal] = useState(false);
  
  const blocksCount = useGame((state) => state.blocksCount);
  const blocksSeed = useGame((state) => state.blocksSeed);
  const { play, stop } = useSoundPlayer();

  const openModal = (id, notification, sound) => {
    if (id) setModal(id);
    if (notification) setTextNotification(notification);
    if (sound) play(sound);
  };

  const closeModal = (sound) => {
    setModal(false);
    if (sound) stop(sound);
  };

  const getKeys = () => {
    return [
      { name: "forward", keys: ["ArrowUp", "KeyW"] },
      { name: "backward", keys: ["ArrowDown", "KeyS"] },
      { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
      { name: "rightward", keys: ["ArrowRight", "KeyD"] },
      { name: "jump", keys: ["Space"] },
    ];
  };
  return (
    <>
      <HeaderMenu openModal={openModal} />
      <Social />
      <KeyboardControls map={getKeys()}>
        <Canvas
          shadows
          camera={{
            fov: 45,
            near: 0.1,
            far: 200,
            position: [2.5, 4, 6],
          }}
        >
          <color args={["#bdedfc"]} attach={"background"} />
          <Lights />
          <Physics>
            <Level count={blocksCount} seed={blocksSeed} />
            <Player modalOpen={modalOpen} />
          </Physics>
        </Canvas>
        <Interface openModal={openModal} modalOpen={modalOpen} />

        <MobileJoystick />
      </KeyboardControls>
      <ModalManager
        closeFn={closeModal}
        modal={modalOpen}
        textNotification={textNotification}
      />
    </>
  );
}
