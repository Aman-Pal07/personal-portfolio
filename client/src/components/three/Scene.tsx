import { useRef, useEffect } from "react";

interface SceneProps {
  className?: string;
}

function Scene({ className = "" }: SceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create animated background with CSS
    const container = containerRef.current;
    if (!container) return;

    // Create floating particles with divs
    const particleCount = 100;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      const size = Math.random() * 4 + 2; // Random size between 2-6px
      
      // Style particles
      particle.style.position = 'absolute';
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.borderRadius = '50%';
      
      // Random position
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      
      // Random color - mostly green or purple 
      const colorRand = Math.random();
      if (colorRand < 0.6) {
        particle.style.backgroundColor = '#39FF14'; // Green
        particle.style.opacity = `${Math.random() * 0.5 + 0.3}`;
      } else if (colorRand < 0.9) {
        particle.style.backgroundColor = '#8A2BE2'; // Purple
        particle.style.opacity = `${Math.random() * 0.4 + 0.2}`;
      } else {
        particle.style.backgroundColor = '#FFFFFF'; // White
        particle.style.opacity = `${Math.random() * 0.3 + 0.1}`;
      }
      
      // Animation
      particle.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
      particle.style.animationDelay = `-${Math.random() * 10}s`;
      
      container.appendChild(particle);
    }

    return () => {
      // Clean up particles on unmount
      if (container) {
        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={`${className} relative overflow-hidden bg-[#0A0A0A]`}
      style={{
        background: 'radial-gradient(circle at center, #121212 0%, #0A0A0A 70%)',
      }}
    >
      {/* Glow effects */}
      <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-[#39FF14] opacity-5 blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 rounded-full bg-[#8A2BE2] opacity-5 blur-3xl"></div>
    </div>
  );
}

export default Scene;
