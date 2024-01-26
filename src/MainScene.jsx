import { Physics } from "@react-three/rapier";
import Lights from "./components/Lights.jsx";
import { Level } from "./components/Level.jsx";
import Player from "./components/Player.jsx";
import useGame from "./stores/useGame.js";

export default function MainScene() {
  const blocksCount = useGame((state) => state.blocksCount);
  const blocksSeed = useGame((state) => state.blocksSeed);
  return (
    <>
      <color args={["#bdedfc"]} attach={"background"} />
      <Lights />
      <Physics>
        <Level count={blocksCount} seed={blocksSeed} />
        <Player />
      </Physics>
    </>
  );
}
