import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { gsap } from "gsap";
import ProductModel from "./ProductModel";

export default function MagneticProduct({ config, reduceMotion }) {
  const groupRef = useRef(null);
  const floatRef = useRef(null);
  const elapsed = useRef(0);

  useEffect(() => {
    const group = groupRef.current;
    if (!group) return undefined;

    if (reduceMotion) {
      group.position.set(...config.position);
      group.rotation.set(...config.rotation);
      group.scale.setScalar(1);
      return undefined;
    }

    const timeline = gsap.timeline({ delay: config.delay });
    timeline
      .fromTo(group.position,
        { x: config.entrance[0], y: config.entrance[1], z: config.entrance[2] },
        { x: config.position[0], y: config.position[1], z: config.position[2], duration: 1.35, ease: "power3.out" },
      )
      .fromTo(group.rotation,
        { x: config.rotation[0] + 0.45, y: config.rotation[1] - config.direction * 0.75, z: config.rotation[2] + 0.2 },
        { x: config.rotation[0], y: config.rotation[1], z: config.rotation[2], duration: 1.35, ease: "power3.out" },
        "<",
      )
      .fromTo(group.scale,
        { x: 0.62, y: 0.62, z: 0.62 },
        { x: 1, y: 1, z: 1, duration: 1.25, ease: "back.out(1.25)" },
        "<",
      );

    return () => timeline.kill();
  }, [config, reduceMotion]);

  useFrame((_, delta) => {
    const floatGroup = floatRef.current;
    if (!floatGroup || reduceMotion) return;

    elapsed.current += delta;
    const travel = Math.max(0, elapsed.current - 1.35);
    floatGroup.position.x = Math.sin(travel * 0.58) * config.travel * config.direction;
    floatGroup.position.y = Math.sin(elapsed.current * 1.05 + config.delay) * 0.1;
    floatGroup.position.z = Math.cos(elapsed.current * 0.7) * 0.12;
    floatGroup.rotation.x = Math.sin(elapsed.current * 0.62) * 0.12;
    floatGroup.rotation.y = Math.sin(travel * 0.58) * 0.34;
    floatGroup.rotation.z = Math.sin(elapsed.current * 0.66 + config.delay) * 0.045;
  });

  return (
    <group ref={groupRef} position={reduceMotion ? config.position : config.entrance} rotation={config.rotation}>
      <group ref={floatRef}>
        <ProductModel config={config} />
      </group>
    </group>
  );
}
