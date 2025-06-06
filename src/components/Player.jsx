import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRapier, RigidBody } from "@react-three/rapier";
import { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import useGame from "../stores/useGame";
import useSoundPlayer from "../hooks/useSoundPlayer";

export default function Player({ modalOpen }) {
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const body = useRef();
  const { rapier, world } = useRapier();

  const [smoothedCameraPosition] = useState(
    () => new THREE.Vector3(10, 10, 10)
  );
  const [smoothedCameraTarget] = useState(() => new THREE.Vector3());
  const { play, playRandom } = useSoundPlayer();

  const start = useGame((state) => state.start);
  const restart = useGame((state) => state.restart);
  const end = useGame((state) => state.end);
  const blocksCount = useGame((state) => state.blocksCount);

  const jump = () => {
    const origin = body.current.translation();
    origin.y -= 0.31;
    const direction = { x: 0, y: -1, z: 0 };
    const ray = new rapier.Ray(origin, direction);
    const hit = world.castRay(ray, 10, true);

    if (hit.toi < 0.15) {
      body.current.applyImpulse({ x: 0, y: 0.5, z: 0 });
    }
  };

  const reset = () => {
    body.current.setTranslation({ x: 0, y: 1, z: 0 });
    body.current.setLinvel({ x: 0, y: 0, z: 0 });
    body.current.setAngvel({ x: 0, y: 0, z: 0 });
  };

  const collisionEnter = () =>{
    const velocity = body.current.linvel(); // швидкість об'єкта під час удару
    const impact = Math.sqrt(
      velocity.x ** 2 + velocity.y ** 2 + velocity.z ** 2
    );

    if (impact > 1) {
      playRandom("hit", 3);
    }
  }

  useEffect(() => {
    const unsubscribeReset = useGame.subscribe(
      (state) => state.phase,
      (value) => {
        if (value === "ready") {
          reset();
        }
      }
    );

    const unsubscribeJump = subscribeKeys(
      (state) => state.jump,
      (value) => {
        if (value) {
          jump();
        }
      }
    );

    const unsunsubscribeAny = subscribeKeys(() => {
      start(modalOpen);
    });

    return () => {
      unsubscribeReset();
      unsunsubscribeAny();
      unsubscribeJump();
    };
  }, [modalOpen]);

  useFrame((state, delta) => {
    if (body.current) {
      // Controls
      if (modalOpen) {
        return
      }
      const { forward, backward, leftward, rightward, jump } = getKeys();
      const impulse = { x: 0, y: 0, z: 0 };
      const torque = { x: 0, y: 0, z: 0 };

      const impulseStrength = 0.6 * delta;
      const torqueStrength = 0.2 * delta;

      if (forward) {
        impulse.z -= impulseStrength;
        torque.x -= torqueStrength;
      }

      if (backward) {
        impulse.z += impulseStrength;
        torque.x += torqueStrength;
      }

      if (leftward) {
        impulse.x -= impulseStrength;
        torque.z += torqueStrength;
      }

      if (rightward) {
        impulse.x += impulseStrength;
        torque.z -= torqueStrength;
      }

      body.current.applyImpulse(impulse);
      body.current.applyTorqueImpulse(torque);

      // Camera
      const bodyPosition = body.current.translation();
      const cameraPosition = new THREE.Vector3();
      cameraPosition.copy(bodyPosition);
      cameraPosition.z += 2.25;
      cameraPosition.y += 0.65;

      const cameraTarget = new THREE.Vector3();
      cameraTarget.copy(bodyPosition);
      cameraTarget.y += 0.25;

      smoothedCameraPosition.lerp(cameraPosition, 5 * delta);
      smoothedCameraTarget.lerp(cameraTarget, 5 * delta);

      state.camera.position.copy(smoothedCameraPosition);
      state.camera.lookAt(smoothedCameraTarget);

      if (bodyPosition.z < -(blocksCount * 4 + 2)) end();
      if (bodyPosition.y < -4) {
        play("restart");
        restart();
      }
    }
  });

  return (
    <RigidBody
      ref={body}
      canSleep={false}
      colliders="ball"
      onCollisionEnter={ collisionEnter }
      restitution={0.2}
      friction={1}
      position={[0, 1, 0]}
      linearDamping={0.5}
      angularDamping={0.5}
    >
      <mesh castShadow>
        <icosahedronGeometry args={[0.3, 1]} />
        <meshStandardMaterial flatShading color="mediumpurple" />
      </mesh>
    </RigidBody>
  );
}
