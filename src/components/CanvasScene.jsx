import { Canvas } from "@react-three/fiber";
import Lights from "./Lights";

export default function CanvasScene({
  children,
  cameraOptions = {
    fov: 45,
    near: 0.1,
    far: 200,
    position: [2.5, 4, 6],
  },
}) {
  return (
    <Canvas shadows camera={cameraOptions}>
      <color args={["#bdedfc"]} attach={"background"} />
      <Lights />
      {children}
    </Canvas>
  );
}
