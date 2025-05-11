import { useEffect, useRef, RefObject } from "react";

interface UseScrollAnimationOptions {
  type?: "fadeInUp" | "fadeInDown" | "fadeInLeft" | "fadeInRight" | "scale" | "custom";
  threshold?: number; // 0-1, percentage of element visible to trigger animation
  duration?: number;
  delay?: number;
  staggerChildren?: boolean;
  staggerDelay?: number;
  ease?: string;
  once?: boolean;
  customAnimation?: (element: HTMLElement) => void;
}

// CSS animations for scrolling effects
const CSS_ANIMATIONS = {
  fadeInUp: (element: HTMLElement, duration: number, delay: number, ease: string) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(50px)';
    
    // Create animation
    setTimeout(() => {
      element.style.transition = `opacity ${duration}s ${ease}, transform ${duration}s ${ease}`;
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, delay * 1000);
  },
  
  fadeInDown: (element: HTMLElement, duration: number, delay: number, ease: string) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(-50px)';
    
    setTimeout(() => {
      element.style.transition = `opacity ${duration}s ${ease}, transform ${duration}s ${ease}`;
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, delay * 1000);
  },
  
  fadeInLeft: (element: HTMLElement, duration: number, delay: number, ease: string) => {
    element.style.opacity = '0';
    element.style.transform = 'translateX(-50px)';
    
    setTimeout(() => {
      element.style.transition = `opacity ${duration}s ${ease}, transform ${duration}s ${ease}`;
      element.style.opacity = '1';
      element.style.transform = 'translateX(0)';
    }, delay * 1000);
  },
  
  fadeInRight: (element: HTMLElement, duration: number, delay: number, ease: string) => {
    element.style.opacity = '0';
    element.style.transform = 'translateX(50px)';
    
    setTimeout(() => {
      element.style.transition = `opacity ${duration}s ${ease}, transform ${duration}s ${ease}`;
      element.style.opacity = '1';
      element.style.transform = 'translateX(0)';
    }, delay * 1000);
  },
  
  scale: (element: HTMLElement, duration: number, delay: number, ease: string) => {
    element.style.opacity = '0';
    element.style.transform = 'scale(0.8)';
    
    setTimeout(() => {
      element.style.transition = `opacity ${duration}s ${ease}, transform ${duration}s ${ease}`;
      element.style.opacity = '1';
      element.style.transform = 'scale(1)';
    }, delay * 1000);
  }
};

// Convert ease strings to CSS compatible easing
const convertEase = (ease: string): string => {
  // Map animation easing functions to CSS equivalents
  const easeMap: Record<string, string> = {
    'power0.in': 'linear',
    'power0.out': 'linear',
    'power0.inOut': 'linear',
    'power1.in': 'ease-in',
    'power1.out': 'ease-out',
    'power1.inOut': 'ease-in-out',
    'power2.in': 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
    'power2.out': 'cubic-bezier(0.215, 0.61, 0.355, 1)',
    'power2.inOut': 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    'power3.in': 'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
    'power3.out': 'cubic-bezier(0.23, 1, 0.32, 1)',
    'power3.inOut': 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    'back.in': 'cubic-bezier(0.6, -0.28, 0.735, 0.045)',
    'back.out': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    'back.inOut': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  };
  
  return easeMap[ease] || 'ease';
};

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
    ease = "ease-out",
    once = true,
    customAnimation,
  } = options;

  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    // Convert ease string 
    const cssEase = convertEase(ease);
    
    // Configure Intersection Observer
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: threshold,
    };
    
    // Handle intersection
    const handleIntersection = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          
          // If custom animation is provided, use it
          if (customAnimation && typeof customAnimation === 'function') {
            customAnimation(element);
          } 
          // If staggering children, animate each child with a delay
          else if (staggerChildren) {
            Array.from(element.children).forEach((child, index) => {
              const childElement = child as HTMLElement;
              
              // Set initial state based on animation type
              if (type.includes('Up')) {
                childElement.style.opacity = '0';
                childElement.style.transform = 'translateY(20px)';
              } else if (type.includes('Down')) {
                childElement.style.opacity = '0';
                childElement.style.transform = 'translateY(-20px)';
              } else if (type.includes('Left')) {
                childElement.style.opacity = '0';
                childElement.style.transform = 'translateX(-20px)';
              } else if (type.includes('Right')) {
                childElement.style.opacity = '0';
                childElement.style.transform = 'translateX(20px)';
              } else {
                childElement.style.opacity = '0';
              }
              
              // Animate with staggered delay
              setTimeout(() => {
                childElement.style.transition = `opacity ${duration}s ${cssEase}, transform ${duration}s ${cssEase}`;
                childElement.style.opacity = '1';
                childElement.style.transform = 'translate(0, 0)';
              }, (delay + index * staggerDelay) * 1000);
            });
          } 
          // Otherwise, animate the element itself
          else {
            // Use predefined animation based on type
            if (CSS_ANIMATIONS[type as keyof typeof CSS_ANIMATIONS]) {
              CSS_ANIMATIONS[type as keyof typeof CSS_ANIMATIONS](element, duration, delay, cssEase);
            } else {
              // Default fade animation
              element.style.opacity = '0';
              setTimeout(() => {
                element.style.transition = `opacity ${duration}s ${cssEase}`;
                element.style.opacity = '1';
              }, delay * 1000);
            }
          }
          
          // If once is true, stop observing after animation
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          // If element is not intersecting and animation is not once-only,
          // reset to initial state (for reversal effect)
          const element = entry.target as HTMLElement;
          
          if (customAnimation) {
            // For custom animations, we don't do anything automatically
          } else if (staggerChildren) {
            Array.from(element.children).forEach(child => {
              const childElement = child as HTMLElement;
              childElement.style.opacity = '0';
              
              if (type.includes('Up')) {
                childElement.style.transform = 'translateY(20px)';
              } else if (type.includes('Down')) {
                childElement.style.transform = 'translateY(-20px)';
              } else if (type.includes('Left')) {
                childElement.style.transform = 'translateX(-20px)';
              } else if (type.includes('Right')) {
                childElement.style.transform = 'translateX(20px)';
              }
            });
          } else {
            element.style.opacity = '0';
            
            if (type === 'fadeInUp') {
              element.style.transform = 'translateY(50px)';
            } else if (type === 'fadeInDown') {
              element.style.transform = 'translateY(-50px)';
            } else if (type === 'fadeInLeft') {
              element.style.transform = 'translateX(-50px)';
            } else if (type === 'fadeInRight') {
              element.style.transform = 'translateX(50px)';
            } else if (type === 'scale') {
              element.style.transform = 'scale(0.8)';
            }
          }
        }
      });
    };
    
    // Create and use observer
    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    observer.observe(element);
    
    // Clean up on unmount
    return () => {
      observer.disconnect();
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
    customAnimation
  ]);

  return ref;
};

export default useScrollAnimation;
