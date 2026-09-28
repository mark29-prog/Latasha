import { Component, useEffect, useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { TextureLoader } from "three";
import * as THREE from "three";

function createProductCutout(image) {
  const canvas = document.createElement("canvas");
  canvas.width = image.naturalWidth || image.width;
  canvas.height = image.naturalHeight || image.height;

  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) throw new Error("Could not create the sneaker cutout canvas.");

  context.drawImage(image, 0, 0, canvas.width, canvas.height);
  const pixels = context.getImageData(0, 0, canvas.width, canvas.height);
  const { data, width, height } = pixels;
  const pixelCount = width * height;
  const background = new Uint8Array(pixelCount);
  const queue = new Int32Array(pixelCount);
  let head = 0;
  let tail = 0;

  const isBackground = (index) => {
    const offset = index * 4;
    const red = data[offset];
    const green = data[offset + 1];
    const blue = data[offset + 2];
    const brightest = Math.max(red, green, blue);
    const darkest = Math.min(red, green, blue);
    return darkest > 218 && brightest - darkest < 38;
  };

  const enqueue = (index) => {
    if (background[index] || !isBackground(index)) return;
    background[index] = 1;
    queue[tail++] = index;
  };

  for (let x = 0; x < width; x += 1) {
    enqueue(x);
    enqueue((height - 1) * width + x);
  }
  for (let y = 1; y < height - 1; y += 1) {
    enqueue(y * width);
    enqueue(y * width + width - 1);
  }

  while (head < tail) {
    const index = queue[head++];
    const x = index % width;
    if (x > 0) enqueue(index - 1);
    if (x < width - 1) enqueue(index + 1);
    if (index >= width) enqueue(index - width);
    if (index < pixelCount - width) enqueue(index + width);
  }

  for (let index = 0; index < pixelCount; index += 1) {
    if (background[index]) data[index * 4 + 3] = 0;
  }
  context.putImageData(pixels, 0, 0);

  const cutout = new THREE.CanvasTexture(canvas);
  cutout.colorSpace = THREE.SRGBColorSpace;
  cutout.anisotropy = 8;
  cutout.needsUpdate = true;
  return cutout;
}

function PhotoRelief({ config }) {
  const texture = useLoader(TextureLoader, config.image);
  const cutoutTexture = useMemo(() => createProductCutout(texture.image), [texture]);

  useEffect(() => () => cutoutTexture.dispose(), [cutoutTexture]);

  const material = useMemo(() => {
    const productMaterial = new THREE.MeshStandardMaterial({
      map: cutoutTexture,
      bumpMap: cutoutTexture,
      // Keep the photo's leather grain subtle so the whole image doesn't look embossed.
      bumpScale: 0.012,
      transparent: true,
      alphaTest: 0.015,
      roughness: 0.72,
      metalness: 0,
      side: THREE.DoubleSide,
    });

    productMaterial.onBeforeCompile = (shader) => {
      // Three.js declares `map` in the fragment shader by default. Declare it
      // in the vertex shader too so the image can drive the subtle silhouette relief.
      shader.vertexShader = shader.vertexShader.replace(
        "#include <common>",
        "#include <common>\nuniform sampler2D map;",
      );
      shader.vertexShader = shader.vertexShader.replace(
        "#include <begin_vertex>",
        `#include <begin_vertex>
        vec4 productPixel = texture2D(map, uv);
        float productLuma = dot(productPixel.rgb, vec3(0.299, 0.587, 0.114));
        transformed.z += productPixel.a * ${config.depth.toFixed(3)} * (0.35 + productLuma * 0.65);`,
      );
    };
    productMaterial.customProgramCacheKey = () => config.id;

    return productMaterial;
  }, [config.depth, config.id, cutoutTexture]);
  const height = config.width / (texture.image.width / texture.image.height);

  return (
    <mesh>
      <planeGeometry args={[config.width, height, 192, 192]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}

function LoadedGlb({ config }) {
  const { scene } = useGLTF(config.model);
  const model = useMemo(() => {
    const instance = scene.clone(true);
    const bounds = new THREE.Box3().setFromObject(instance);
    const size = bounds.getSize(new THREE.Vector3());
    const center = bounds.getCenter(new THREE.Vector3());
    const modelWidth = Math.max(size.x, size.z, size.y);
    const scale = modelWidth > 0 ? config.width / modelWidth : 1;

    instance.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
    instance.scale.setScalar(scale);

    return instance;
  }, [config.width, scene]);

  return <primitive object={model} dispose={null} />;
}

class ModelErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

export default function ProductModel({ config }) {
  if (!config.model) return <PhotoRelief config={config} />;

  return (
    <ModelErrorBoundary fallback={<PhotoRelief config={config} />}>
      <LoadedGlb config={config} />
    </ModelErrorBoundary>
  );
}
