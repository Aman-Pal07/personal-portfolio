import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../utils/constants";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const triggers: ScrollTrigger[] = [];
    
    // Animate heading
    if (headingRef.current) {
      const trigger = ScrollTrigger.create({
        trigger: headingRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.fromTo(
            headingRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8 }
          );
        },
      });
      
      triggers.push(trigger);
    }
    
    // Animate description
    if (descriptionRef.current) {
      const trigger = ScrollTrigger.create({
        trigger: descriptionRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.fromTo(
            descriptionRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, delay: 0.2 }
          );
        },
      });
      
      triggers.push(trigger);
    }
    
    // Animate button
    if (buttonRef.current) {
      const trigger = ScrollTrigger.create({
        trigger: buttonRef.current,
        start: "top 90%",
        once: true,
        onEnter: () => {
          gsap.fromTo(
            buttonRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8 }
          );
        },
      });
      
      triggers.push(trigger);
    }
    
    return () => {
      triggers.forEach(trigger => trigger.kill());
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
