import { useEffect, useRef, RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface UseScrollAnimationOptions {
  type?: "fadeInUp" | "fadeInDown" | "fadeInLeft" | "fadeInRight" | "scale" | "custom";
  threshold?: number; // 0-1, percentage of element visible to trigger animation
  duration?: number;
  delay?: number;
  staggerChildren?: boolean;
  staggerDelay?: number;
  ease?: string;
  once?: boolean;
  customAnimation?: (element: HTMLElement) => gsap.core.Tween;
}

export const useScrollAnimation = <T extends HTMLElement>(
  options: UseScrollAnimationOptions = {}
): RefObject<T> => {
  const {
    type = "fadeInUp",
    threshold = 0.2,
    duration = 0.8,
    delay = 0,
    staggerChildren = false,
    staggerDelay = 0.1,
    ease = "power2.out",
    once = true,
    customAnimation,
  } = options;

  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let trigger: ScrollTrigger;
    let animation: gsap.core.Tween | gsap.core.Timeline | null = null;

    const createAnimation = () => {
      if (customAnimation && typeof customAnimation === "function") {
        return customAnimation(element);
      }

      // Default animations
      switch (type) {
        case "fadeInUp":
          return gsap.fromTo(
            element,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration, ease }
          );
        case "fadeInDown":
          return gsap.fromTo(
            element,
            { y: -50, opacity: 0 },
            { y: 0, opacity: 1, duration, ease }
          );
        case "fadeInLeft":
          return gsap.fromTo(
            element,
            { x: -50, opacity: 0 },
            { x: 0, opacity: 1, duration, ease }
          );
        case "fadeInRight":
          return gsap.fromTo(
            element,
            { x: 50, opacity: 0 },
            { x: 0, opacity: 1, duration, ease }
          );
        case "scale":
          return gsap.fromTo(
            element,
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration, ease }
          );
        default:
          return gsap.fromTo(
            element,
            { opacity: 0 },
            { opacity: 1, duration, ease }
          );
      }
    };

    // If staggering children, create a timeline
    if (staggerChildren) {
      const children = element.children;
      animation = gsap.timeline({ delay });

      // Set initial state
      gsap.set(children, { opacity: 0, y: type.includes("Up") ? 20 : type.includes("Down") ? -20 : 0, x: type.includes("Left") ? 20 : type.includes("Right") ? -20 : 0 });

      // Create animation
      animation.to(children, {
        opacity: 1,
        y: 0,
        x: 0,
        duration,
        stagger: staggerDelay,
        ease,
      });
    } else {
      // Single element animation
      animation = createAnimation();
      if (animation && delay) {
        animation.delay(delay);
      }
    }

    // Pause the animation initially
    if (animation) {
      animation.pause();
    }

    // Create ScrollTrigger
    trigger = ScrollTrigger.create({
      trigger: element,
      start: `top ${(1 - threshold) * 100}%`,
      onEnter: () => animation?.play(),
      onEnterBack: once ? undefined : () => animation?.play(),
      onLeave: once ? undefined : () => animation?.reverse(),
      onLeaveBack: once ? undefined : () => animation?.reverse(),
    });

    return () => {
      // Clean up
      if (trigger) trigger.kill();
      if (animation) animation.kill();
    };
  }, [
    type,
    threshold,
    duration,
    delay,
    staggerChildren,
    staggerDelay,
    ease,
    once,
    customAnimation,
  ]);

  return ref;
};

export default useScrollAnimation;
