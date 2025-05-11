import { useRef, useEffect } from "react";

interface ModelProps {
  path?: string;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  color?: string;
}

const Model = ({ 
  path,
  scale = 1, 
  position = [0, 0, 0], 
  rotation = [0, 0, 0],
  color = "#39FF14"
}: ModelProps) => {
  const modelRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const element = modelRef.current;
    if (!element) return;
    
    // Add floating animation using CSS
    element.style.animation = 'float 6s ease-in-out infinite';
    
    // Add simple rotation
    let rotationDegree = 0;
    const rotationInterval = setInterval(() => {
      rotationDegree = (rotationDegree + 0.5) % 360;
      element.style.transform = `rotateY(${rotationDegree}deg) scale(${scale})`;
    }, 50);
    
    return () => {
      clearInterval(rotationInterval);
    };
  }, [scale]);
  
  return (
    <div 
      ref={modelRef}
      className="w-full h-full flex items-center justify-center"
      style={{
        position: 'relative',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Placeholder geometric shape instead of 3D model */}
      <div 
        className="relative"
        style={{
          width: '100px',
          height: '100px',
          transform: 'rotateX(45deg) rotateZ(45deg)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Octahedron-like shape made with CSS */}
        <div className="absolute w-full h-full" style={{
          background: color,
          opacity: 0.8,
          clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
        }}></div>
        
        {/* Outer wireframe */}
        <div className="absolute w-full h-full border-2" style={{
          borderColor: color,
          clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
          transform: 'scale(1.2)',
          opacity: 0.4
        }}></div>
        
        {/* Inner glow */}
        <div className="absolute w-full h-full" style={{
          background: color,
          opacity: 0.2,
          clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
          filter: 'blur(10px)',
          transform: 'scale(0.8)'
        }}></div>
      </div>
    </div>
  );
};

export default Model;
