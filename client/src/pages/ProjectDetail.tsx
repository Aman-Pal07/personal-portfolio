import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import Model from "../components/three/Model";
import { getProjectById } from "../utils/constants";
import type { Project } from "../types/project";

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const contentRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!id) {
      navigate("/");
      return;
    }

    // Simulate fetching project data
    const projectData = getProjectById(parseInt(id));
    
    if (!projectData) {
      navigate("/");
      return;
    }
    
    setProject(projectData);
    setLoading(false);
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [id, navigate]);

  // Simple animations when component mounts
  useEffect(() => {
    if (loading || !headerRef.current || !contentRef.current) return;
    
    // Header animation with CSS
    const headerElement = headerRef.current;
    headerElement.style.transform = 'translateY(-50px)';
    headerElement.style.opacity = '0';
    
    setTimeout(() => {
      headerElement.style.transition = 'all 0.8s ease-out';
      headerElement.style.transform = 'translateY(0)';
      headerElement.style.opacity = '1';
    }, 100);
    
    // Content animation 
    const contentElements = Array.from(contentRef.current.children) as HTMLElement[];
    
    contentElements.forEach((element, index) => {
      element.style.transform = 'translateY(50px)';
      element.style.opacity = '0';
      
      setTimeout(() => {
        element.style.transition = 'all 0.8s ease-out';
        element.style.transform = 'translateY(0)';
        element.style.opacity = '1';
      }, 300 + (index * 150)); // Staggered timing
    });
    
  }, [loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#39FF14] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!project) return null;

  return (
    <div className="pt-20 px-4 min-h-screen">
      <div className="container mx-auto">
        {/* Back Button */}
        <Button
          variant="outline"
          onClick={() => navigate("/")}
          className="mb-8 mt-4 text-[#AAAAAA] hover:text-[#39FF14] border-[#AAAAAA] border-opacity-20 hover:border-[#39FF14]"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Button>
        
        {/* Project Header */}
        <div ref={headerRef} className="mb-12">
          <div className="flex flex-wrap items-center gap-2 mb-4">
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
            <span className="inline-block px-2 py-1 bg-[#0A0A0A] text-[#FAFAFA] text-xs font-mono rounded border border-[#AAAAAA] border-opacity-20">
              {project.year}
            </span>
          </div>
          
          <h1 className="font-['Press_Start_2P'] text-2xl md:text-4xl text-white mb-4">
            {project.title}
          </h1>
          
          <p className="text-[#AAAAAA] text-lg font-mono max-w-3xl">
            {project.description}
          </p>
        </div>
        
        {/* Project Image */}
        <div className="w-full h-[50vh] md:h-[60vh] mb-12 rounded-lg overflow-hidden">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Project Content */}
        <div ref={contentRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="md:col-span-2 space-y-6">
            <h2 className="font-['Press_Start_2P'] text-xl text-white mb-4">
              PROJECT OVERVIEW
            </h2>
            
            <p className="text-[#AAAAAA] font-mono">
              {project.longDescription || "This project aimed to create an interactive web experience that balances aesthetics with functionality. Using the latest web technologies including React, Three.js, and GSAP, I developed a solution that delivers smooth animations, interactive 3D elements, and an engaging user interface."}
            </p>
            
            <h3 className="font-['Press_Start_2P'] text-lg text-white mt-8 mb-4">
              CHALLENGES & SOLUTIONS
            </h3>
            
            <p className="text-[#AAAAAA] font-mono">
              {project.challenges || "One of the main challenges was optimizing 3D performance across devices while maintaining visual quality. I implemented level-of-detail rendering and efficient asset loading strategies to ensure smooth performance even on mobile devices. Another challenge was creating a seamless integration between 2D interface elements and 3D objects, which I solved using carefully coordinated animations and interactive triggers."}
            </p>
            
            <h3 className="font-['Press_Start_2P'] text-lg text-white mt-8 mb-4">
              TECHNOLOGIES USED
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {project.technologies?.map((tech, index) => (
                <div key={index} className="skill-item flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#39FF14]"></div>
                  <span className="font-mono">{tech}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-8">
            <div>
              <h3 className="font-['Press_Start_2P'] text-lg text-white mb-4">
                PROJECT DETAILS
              </h3>
              
              <ul className="space-y-4">
                <li className="flex flex-col">
                  <span className="text-[#AAAAAA] text-sm font-mono">Client:</span>
                  <span className="text-white font-mono">{project.client || "Self-initiated"}</span>
                </li>
                <li className="flex flex-col">
                  <span className="text-[#AAAAAA] text-sm font-mono">Year:</span>
                  <span className="text-white font-mono">{project.year}</span>
                </li>
                <li className="flex flex-col">
                  <span className="text-[#AAAAAA] text-sm font-mono">Role:</span>
                  <span className="text-white font-mono">{project.role || "Full-stack Developer"}</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              {project.liveUrl && (
                <a 
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="retro-button w-full px-4 py-3 border border-[#39FF14] text-[#39FF14] font-['Press_Start_2P'] text-sm tracking-wider flex items-center justify-center hover:scale-105 transition-all duration-300"
                >
                  VISIT LIVE SITE
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </a>
              )}
              
              {project.githubUrl && (
                <a 
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="retro-button w-full px-4 py-3 border border-[#AAAAAA] border-opacity-30 text-white font-['Press_Start_2P'] text-sm tracking-wider flex items-center justify-center hover:scale-105 transition-all duration-300"
                >
                  VIEW CODE
                  <Github className="ml-2 h-4 w-4" />
                </a>
              )}
            </div>
            
            {/* Model Display */}
            <div className="h-80 rounded-lg overflow-hidden border border-[#AAAAAA] border-opacity-10 bg-[#121212] flex items-center justify-center">
              <div className="w-full h-full">
                <Model 
                  path="" 
                  scale={1.5}
                  color={project.id % 2 === 0 ? "#39FF14" : "#8A2BE2"}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Projects Section */}
        <div className="mb-20">
          <h2 className="font-['Press_Start_2P'] text-xl text-white mb-8 text-center">
            MORE PROJECTS
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Display 3 related projects (excluding current one) */}
            {/* This would be populated with actual related projects */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
