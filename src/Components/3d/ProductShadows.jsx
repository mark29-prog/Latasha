import { useMemo } from "react";
import * as THREE from "three";
import { PRODUCT_CONFIG } from "./productConfig";

const shadowVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const shadowFragmentShader = `
  uniform float opacity;
  varying vec2 vUv;
  void main() {
    float radius = length((vUv - 0.5) * 2.0);
    float alpha = (1.0 - smoothstep(0.12, 1.0, radius)) * opacity;
    gl_FragColor = vec4(vec3(0.015, 0.012, 0.01), alpha);
  }
`;

function SoftShadow({ product, scale, opacity, yOffset }) {
  const material = useMemo(() => new THREE.ShaderMaterial({
    uniforms: { opacity: { value: opacity } },
    vertexShader: shadowVertexShader,
    fragmentShader: shadowFragmentShader,
    transparent: true,
    depthWrite: false,
  }), [opacity]);

  return (
    <mesh
      position={[product.position[0], product.position[1] - yOffset, product.position[2] - 0.5]}
      rotation={[-Math.PI / 2, 0, 0]}
      scale={scale}
    >
      <circleGeometry args={[1.4, 48]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}

export default function ProductShadows() {
  return Object.values(PRODUCT_CONFIG).map((product) => {
    const jordan = product.id === "jordan";
    const scale = jordan ? [2.8, 1.1, 1] : [1.1, 0.45, 1];

    return (
      <group key={`${product.id}-shadow`}>
        <SoftShadow product={product} scale={scale} opacity={0.12} yOffset={1.2} />
        <SoftShadow product={product} scale={scale.map((size) => size * 0.68)} opacity={0.1} yOffset={1.22} />
      </group>
    );
  });
}
