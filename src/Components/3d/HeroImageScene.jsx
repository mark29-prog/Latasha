import { Suspense, useLayoutEffect, useRef } from "react";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { TextureLoader } from "three";
import { gsap } from "gsap";
import { useReducedMotion } from "motion/react";

const images = [
  { src: "/j1.png", position: [-1.8, 0, 0], rotation: -0.12, scale: 0.92, duration: 8 },
  { src: "/j2.png", position: [-0.6, 0, 0], rotation: 0.08, scale: 0.92, duration: 10 },
  { src: "/j3.png", position: [0.6, 0, 0], rotation: 0.18, scale: 0.92, duration: 9 },
  { src: "/g2.png", position: [1.8, 0, 0], rotation: -0.08, scale: 0.92, duration: 11 },
];

function FloatingImage({ image, reduceMotion }) {
  const group = useRef(null);
  const texture = useLoader(TextureLoader, image.src);

  useLayoutEffect(() => {
    if (!group.current || reduceMotion) return undefined;
    const tween = gsap.to(group.current.rotation, {
      z: `+=${Math.PI * 2}`,
      duration: image.duration,
      ease: "none",
      repeat: -1,
    });
    return () => tween.kill();
  }, [image.duration, reduceMotion]);

  return (
    <group ref={group} position={image.position} rotation={[0, image.rotation, 0]} scale={image.scale}>
      <mesh>
        <planeGeometry args={[1.45, 2.3]} />
        <meshBasicMaterial map={texture} transparent depthWrite={false} />
      </mesh>
    </group>
  );
}

function SceneImages() {
  const reduceMotion = useReducedMotion();
  const { viewport } = useThree();
  const scale = Math.min(0.92, viewport.width / 8);

  return images.map((image, index) => {
    const position = [viewport.width * ((index - 1.5) / 4), 0, 0];
    return (
      <FloatingImage
        key={image.src}
        image={{ ...image, position, scale }}
        reduceMotion={reduceMotion}
      />
    );
  });
}

export default function HeroImageScene() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1]">
      <Canvas camera={{ position: [0, 0, 5.5], fov: 42 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }}>
        <Suspense fallback={null}>
          <SceneImages />
        </Suspense>
      </Canvas>
    </div>
  );
}
