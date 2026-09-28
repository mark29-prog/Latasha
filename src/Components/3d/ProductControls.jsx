import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

export default function ProductControls({ reduceMotion }) {
  const cameraRef = useRef(null);

  useFrame(({ pointer }) => {
    const camera = cameraRef.current;
    if (!camera) return;

    const targetX = reduceMotion ? 0 : pointer.x * 0.28;
    const targetY = reduceMotion ? 0 : pointer.y * 0.16;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.035);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.035);
    camera.lookAt(0, 0, 0);
  });

  return <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 10]} fov={54} />;
}
