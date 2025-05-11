import { useRef, useEffect } from "react";

interface FloatingPixelsProps {
  count?: number;
  size?: number;
  speed?: number;
}

const FloatingPixels = ({ count = 100, size = 5, speed = 2 }: FloatingPixelsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    // Create particle elements
    for (let i = 0; i < count; i++) {
      createParticle(container, size, speed);
    }
    
    return () => {
      // Clean up
      if (container) {
        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }
      }
    };
  }, [count, size, speed]);
  
  const createParticle = (container: HTMLDivElement, size: number, speed: number) => {
    // Create particle element
    const particle = document.createElement('div');
    
    // Random size variation
    const particleSize = (Math.random() * size) + (size * 0.5);
    
    // Set basic styles
    particle.style.position = 'absolute';
    particle.style.width = `${particleSize}px`;
    particle.style.height = `${particleSize}px`;
    particle.style.borderRadius = '2px'; // Square with rounded corners
    
    // Initial position
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    
    // Random z-index for depth effect
    particle.style.zIndex = `${Math.floor(Math.random() * 10)}`;
    
    // Choose color
    const colors = ["#39FF14", "#8A2BE2", "#FFFFFF"];
    const colorIndex = Math.floor(Math.random() * colors.length);
    particle.style.backgroundColor = colors[colorIndex];
    
    // Opacity based on color
    const opacity = colorIndex === 2 ? 0.3 : 0.6; // White is more transparent
    particle.style.opacity = `${opacity * Math.random() + 0.2}`;
    
    // Animation properties
    const duration = (Math.random() * 20) + 10; // Animation duration (slower)
    const delay = Math.random() * -20; // Random start time
    
    // Create keyframe animation
    const animName = `float-${Math.random().toString(36).substring(2, 9)}`;
    const keyframes = `
      @keyframes ${animName} {
        0% {
          transform: translate3d(0, 0, 0);
          opacity: ${opacity * Math.random() + 0.2};
        }
        50% {
          transform: translate3d(${(Math.random() - 0.5) * 50}px, ${(Math.random() - 0.5) * 50}px, 0);
          opacity: ${opacity};
        }
        100% {
          transform: translate3d(0, 0, 0);
          opacity: ${opacity * Math.random() + 0.2};
        }
      }
    `;
    
    // Add keyframes to document
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerHTML = keyframes;
    document.head.appendChild(styleSheet);
    
    // Apply animation
    particle.style.animation = `${animName} ${duration}s ease-in-out infinite`;
    particle.style.animationDelay = `${delay}s`;
    
    // Add to container
    container.appendChild(particle);
  };
  
  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ perspective: '1000px' }}
    />
  );
};

export default FloatingPixels;
