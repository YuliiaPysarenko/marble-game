import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";

export default function BallCursor({ cursorPosition }) {
  const ballRef = useRef();
  const [ timeOffset ] = useState(() => Math.random() * Math.PI * 2);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const y = (time + timeOffset) * 3.5;
    if (ballRef.current) {
      ballRef.current.rotation.x = -y;
      ballRef.current.position.x = cursorPosition.x;
      ballRef.current.position.y = cursorPosition.y;
    }
  });

  return (
    <mesh castShadow ref={ballRef}>
      <icosahedronGeometry args={[0.3, 1]} />
      <meshStandardMaterial flatShading color="mediumpurple" />
    </mesh>
  );
}
