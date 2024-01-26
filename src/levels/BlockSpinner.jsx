import { useRef, useState } from "react";
import * as THREE from "three"
import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { floor2Material, obstacleMaterial } from "../utils/materials";
import { boxGeometry } from "../utils/geometries";

export function BlockSpinner({ position = [0, 0, 0] }) {
    const obstacle = useRef();
    const [speed] = useState(
      () => (Math.random() + 0.2) * (Math.random() < 0.5 ? -1 : 1)
    );
  
    useFrame((state) => {
      const time = state.clock.getElapsedTime();
      const rotation = new THREE.Quaternion();
      rotation.setFromEuler(new THREE.Euler(0, time * speed, 0));
      if (obstacle.current) {
        obstacle.current.setNextKinematicRotation(rotation);
      }
    });
    return (
      <group position={position}>
        <mesh
          material={floor2Material}
          geometry={boxGeometry}
          position={[0, -0.1, 0]}
          scale={[4, 0.2, 4]}
          receiveShadow
        />
  
        <RigidBody
          ref={obstacle}
          type="kinematicPosition"
          position={[0, 0.3, 0]}
          restitution={0.2}
          friction={0}
        >
          <mesh
            material={obstacleMaterial}
            geometry={boxGeometry}
            scale={[3.5, 0.3, 0.3]}
            castShadow
            receiveShadow
          />
        </RigidBody>
      </group>
    );
  }