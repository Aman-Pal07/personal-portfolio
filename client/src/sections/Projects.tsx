import { useRef, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../utils/constants";

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Configure Intersection Observer
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const handleIntersection = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          const animationType = target.dataset.animation || 'fade-up';
          const delay = Number(target.dataset.delay || 0);
          
          // Apply animations based on data attributes
          setTimeout(() => {
            if (animationType === 'fade-up') {
              target.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
              target.style.opacity = '1';
              target.style.transform = 'translateY(0)';
            }
          }, delay);
          
          // Unobserve after animation starts
          observer.unobserve(target);
        }
      });
    };
    
    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    
    // Setup heading animation
    if (headingRef.current) {
      headingRef.current.style.opacity = '0';
      headingRef.current.style.transform = 'translateY(30px)';
      headingRef.current.dataset.animation = 'fade-up';
      headingRef.current.dataset.delay = '0';
      observer.observe(headingRef.current);
    }
    
    // Setup description animation
    if (descriptionRef.current) {
      descriptionRef.current.style.opacity = '0';
      descriptionRef.current.style.transform = 'translateY(20px)';
      descriptionRef.current.dataset.animation = 'fade-up';
      descriptionRef.current.dataset.delay = '200';
      observer.observe(descriptionRef.current);
    }
    
    // Setup button animation
    if (buttonRef.current) {
      buttonRef.current.style.opacity = '0';
      buttonRef.current.style.transform = 'translateY(20px)';
      buttonRef.current.dataset.animation = 'fade-up';
      buttonRef.current.dataset.delay = '300';
      observer.observe(buttonRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="py-24 relative"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 ref={headingRef} className="font-['Press_Start_2P'] text-2xl md:text-3xl mb-4">
            <span className="text-white">HERE ARE</span>
            <span className="block text-[#39FF14] mt-2">MY PROJECTS</span>
          </h2>
          <p ref={descriptionRef} className="text-[#AAAAAA] max-w-2xl mx-auto">
            A collection of my recent work showcasing interactive experiences, animations, and creative solutions.
          </p>
        </div>
        
        <div ref={projectsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        
        <div ref={buttonRef} className="text-center mt-12">
          <a 
            href="#" 
            className="retro-button inline-block px-8 py-3 border border-[#39FF14] text-[#39FF14] font-['Press_Start_2P'] text-sm tracking-wider transform hover:scale-105 transition-all duration-300"
          >
            VIEW ALL PROJECTS
            <ArrowUpRight className="inline-block ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
