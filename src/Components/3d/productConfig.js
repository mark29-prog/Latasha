import * as THREE from "three";

export const PRODUCT_CONFIG = {
  jordan: {
    id: "jordan",
    image: "/jordan-product.jpg",
    // Set to a local /models/jordan.glb path or a CORS-enabled .glb URL when supplied.
    model: null,
    width: 8.68,
    depth: 0.48,
    position: [-0.35, -0.12, 0],
    rotation: [THREE.MathUtils.degToRad(20), THREE.MathUtils.degToRad(-49), THREE.MathUtils.degToRad(-7)],
    entrance: [-3.6, 0.18, -0.8],
    direction: 1,
    travel: 0.82,
    delay: 0,
  },
};
