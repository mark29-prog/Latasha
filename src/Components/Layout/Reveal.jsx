import { useLayoutEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { gsap } from "gsap";

export default function Reveal({
  as: Component = "div",
  children,
  className,
  delay = 0,
  distance = 24,
  animateText = false,
  ...props
}) {
  const reduceMotion = useReducedMotion();
  const MotionComponent = motion[Component] || motion.div;
  const revealRef = useRef(null);

  useLayoutEffect(() => {
    const root = revealRef.current;
    if (!animateText || !root || reduceMotion) return undefined;

    const targets = root.querySelectorAll("h1, h2, h3, p");
    if (!targets.length) return undefined;

    let observer;
    const context = gsap.context(() => {
      gsap.set(targets, { autoAlpha: 0, y: 16 });
      observer = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        gsap.to(targets, {
          autoAlpha: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.07,
          delay,
          ease: "power3.out",
          overwrite: true,
        });
        observer.disconnect();
      }, { threshold: 0.15 });

      observer.observe(root);
    }, root);

    return () => {
      observer?.disconnect();
      context.revert();
    };
  }, [animateText, delay, reduceMotion]);

  return (
    <MotionComponent
      ref={revealRef}
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}
