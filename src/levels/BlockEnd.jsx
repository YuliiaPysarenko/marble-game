import { Text, useGLTF } from "@react-three/drei";
import { floor1Material } from "../utils/materials";
import { boxGeometry } from "../utils/geometries";
import { RigidBody } from "@react-three/rapier";

export function BlockEnd({ position = [0, 0, 0] }) {
    const hamburger = useGLTF("./hamburger.glb");
    hamburger.scene.children.forEach((mesh) => {
      mesh.castShadow = true;
    });
    return (
      <group position={position}>
        <Text
          scale={1}
          font="./bebas-neue-regular.ttf"
          position={[0, 2.25, 2]}
        >
          Finish
          <meshBasicMaterial toneMapped={false} />
        </Text>
        <mesh
          material={floor1Material}
          geometry={boxGeometry}
          position={[0, 0, 0]}
          scale={[4, 0.2, 4]}
          receiveShadow
        />
        <RigidBody
          type="fixed"
          colliders="hull"
          position={[0, 0.25, 0]}
          restitution={0.2}
          friction={0}
        >
          <primitive object={hamburger.scene} scale={0.2} />
        </RigidBody>
      </group>
    );
  }