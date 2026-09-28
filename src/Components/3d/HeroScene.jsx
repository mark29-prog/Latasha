import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useReducedMotion } from "motion/react";
import MagneticProduct from "./MagneticProduct";
import ProductControls from "./ProductControls";
import ProductLighting from "./ProductLighting";
import { PRODUCT_CONFIG } from "./productConfig";

function ProductScene({ reduceMotion }) {
  return (
    <>
      <ProductControls reduceMotion={reduceMotion} />
      <ProductLighting />
      <Suspense fallback={null}>
        {Object.values(PRODUCT_CONFIG).map((product) => (
          <MagneticProduct key={product.id} config={product} reduceMotion={reduceMotion} />
        ))}
      </Suspense>
    </>
  );
}

export default function HeroScene() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-auto absolute bottom-0 right-[-8%] z-[1] h-[52%] w-[85%] sm:right-[-2%] sm:h-[58%] sm:w-[70%] md:inset-y-0 md:right-[-2%] md:h-auto md:w-[58%] lg:right-[2%] lg:w-[50%] xl:right-[4%] xl:w-[46%]"
    >
      <Canvas dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }}>
        <ProductScene reduceMotion={reduceMotion} />
      </Canvas>
    </div>
  );
}
