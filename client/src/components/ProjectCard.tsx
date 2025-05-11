import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Project } from "../types/project";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Animation when card comes into view
  useEffect(() => {
    if (!cardRef.current) return;

    const element = cardRef.current;
    
    // Configure Intersection Observer for scroll animations
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -100px 0px', // Similar to "top bottom-=100"
      threshold: 0.1
    };
    
    const handleIntersection = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Set initial state
          entry.target.classList.add('animate-card');
          
          // Only observe once
          observer.unobserve(entry.target);
        }
      });
    };
    
    // Initially set the card to be invisible
    element.style.opacity = '0';
    element.style.transform = 'translateY(50px)';
    
    // Add CSS class for animation
    const style = document.createElement('style');
    style.textContent = `
      .animate-card {
        animation: cardFadeIn 0.8s ease forwards;
      }
      
      @keyframes cardFadeIn {
        from {
          opacity: 0;
          transform: translateY(50px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;
    document.head.appendChild(style);
    
    // Create and use the observer
    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    observer.observe(element);
    
    return () => {
      observer.disconnect();
      document.head.removeChild(style);
    };
  }, []);

  const handleClick = () => {
    navigate(`/project/${project.id}`);
  };

  return (
    <div 
      ref={cardRef}
      className="project-card group relative cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative overflow-hidden rounded-lg border border-[#AAAAAA] border-opacity-10 aspect-video">
        {/* Project Image */}
        <div className="absolute inset-0 bg-[#0A0A0A]">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-80"></div>
        </div>
        
        {/* Project Details */}
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {project.tags.map((tag, index) => (
              <span 
                key={index}
                className={`inline-block px-2 py-1 ${
                  index % 2 === 0 
                    ? "bg-[#39FF14] bg-opacity-20 text-[#39FF14]" 
                    : "bg-[#8A2BE2] bg-opacity-20 text-[#8A2BE2]"
                } text-xs font-mono rounded`}
              >
                {tag}
              </span>
            ))}
            <span className="inline-block px-2 py-1 bg-[#0A0A0A] bg-opacity-80 text-[#FAFAFA] text-xs font-mono rounded">
              {project.year}
            </span>
          </div>
          
          <h3 className="font-['Press_Start_2P'] text-lg text-white mb-2">{project.title}</h3>
          <p className="text-[#AAAAAA] text-sm font-mono">{project.description}</p>
        </div>
        
        {/* Hover Effect */}
        <div className="absolute top-0 left-0 w-full h-full bg-[#39FF14] bg-opacity-0 group-hover:bg-opacity-5 transition-all duration-300"></div>
      </div>
    </div>
  );
};

export default ProjectCard;
