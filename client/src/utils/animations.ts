import { gsap } from "gsap";

// Animate elements when they enter the viewport
export const fadeInUp = (element: HTMLElement, delay = 0, duration = 0.6) => {
  gsap.fromTo(
    element,
    { y: 50, opacity: 0 },
    { 
      y: 0, 
      opacity: 1, 
      duration, 
      delay,
      ease: "power2.out" 
    }
  );
};

export const fadeInDown = (element: HTMLElement, delay = 0, duration = 0.6) => {
  gsap.fromTo(
    element,
    { y: -50, opacity: 0 },
    { 
      y: 0, 
      opacity: 1, 
      duration, 
      delay,
      ease: "power2.out" 
    }
  );
};

export const fadeInLeft = (element: HTMLElement, delay = 0, duration = 0.6) => {
  gsap.fromTo(
    element,
    { x: -50, opacity: 0 },
    { 
      x: 0, 
      opacity: 1, 
      duration, 
      delay,
      ease: "power2.out" 
    }
  );
};

export const fadeInRight = (element: HTMLElement, delay = 0, duration = 0.6) => {
  gsap.fromTo(
    element,
    { x: 50, opacity: 0 },
    { 
      x: 0, 
      opacity: 1, 
      duration, 
      delay,
      ease: "power2.out" 
    }
  );
};

// Animate elements with stagger effect (for lists, grids, etc)
export const staggerFadeInUp = (elements: HTMLElement[], delay = 0, duration = 0.6, staggerTime = 0.1) => {
  gsap.fromTo(
    elements,
    { y: 50, opacity: 0 },
    { 
      y: 0, 
      opacity: 1, 
      duration, 
      delay,
      stagger: staggerTime,
      ease: "power2.out" 
    }
  );
};

// Scale animation
export const scaleIn = (element: HTMLElement, delay = 0, duration = 0.6) => {
  gsap.fromTo(
    element,
    { scale: 0.5, opacity: 0 },
    { 
      scale: 1, 
      opacity: 1, 
      duration, 
      delay,
      ease: "back.out(1.7)" 
    }
  );
};

// Typewriter effect
export const typewriter = (element: HTMLElement, text: string, delay = 0, speed = 30) => {
  const originalText = text;
  element.textContent = "";
  
  gsap.delayedCall(delay, () => {
    let i = 0;
    const interval = setInterval(() => {
      element.textContent = originalText.substring(0, i + 1);
      i++;
      
      if (i >= originalText.length) {
        clearInterval(interval);
      }
    }, speed);
  });
};

// Continuous floating animation
export const floatingAnimation = (element: HTMLElement, amplitude = 15, duration = 2) => {
  gsap.to(element, {
    y: `+=${amplitude}`,
    duration,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
};

// Rotating animation
export const rotatingAnimation = (element: HTMLElement, duration = 10) => {
  gsap.to(element, {
    rotation: 360,
    duration,
    repeat: -1,
    ease: "none"
  });
};
