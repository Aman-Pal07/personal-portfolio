import { useRef, useEffect } from "react";
import Model from "../components/three/Model";

interface Skill {
  name: string;
}

const skills: Skill[] = [
  { name: "React.js" },
  { name: "Node.js" },
  { name: "Express" },
  { name: "MongoDB" },
  { name: "Three.js" },
  { name: "CSS Animations" },
  { name: "Tailwind CSS" },
  { name: "JavaScript/TypeScript" },
];

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set up intersection observer for scroll-based animations
    const observerOptions = {
      root: null, // use viewport
      rootMargin: '0px',
      threshold: 0.2, // 20% of element must be visible
    };

    const handleIntersection = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          
          // Animate based on data attributes
          if (target.dataset.animation === 'fade-up') {
            target.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            target.style.opacity = '1';
            target.style.transform = 'translateY(0)';
          } else if (target.dataset.animation === 'fade-left') {
            target.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            target.style.opacity = '1';
            target.style.transform = 'translateX(0)';
          } else if (target.dataset.animation === 'scale') {
            target.style.transition = 'opacity 1s ease, transform 1s ease';
            target.style.opacity = '1';
            target.style.transform = 'scale(1)';
          }
          
          // Unobserve after animating
          observer.unobserve(target);
        }
      });
    };
    
    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    
    // Set initial states and observe text blocks
    if (textRef.current) {
      const textBlocks = textRef.current.querySelectorAll("p");
      textBlocks.forEach((block, index) => {
        const element = block as HTMLElement;
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.dataset.animation = 'fade-up';
        element.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(element);
      });
    }
    
    // Set initial states and observe skill items
    if (skillsRef.current) {
      const skillItems = skillsRef.current.querySelectorAll(".skill-item");
      skillItems.forEach((item, index) => {
        const element = item as HTMLElement;
        element.style.opacity = '0';
        element.style.transform = 'translateX(-20px)';
        element.dataset.animation = 'fade-left';
        element.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(element);
      });
    }
    
    // Set initial states and observe 3D model container
    if (modelRef.current) {
      modelRef.current.style.opacity = '0';
      modelRef.current.style.transform = 'scale(0.8)';
      modelRef.current.dataset.animation = 'scale';
      observer.observe(modelRef.current);
    }
    
    // Clean up
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start gap-12">
          <div className="w-full md:w-1/2">
            <h2 className="font-['Press_Start_2P'] text-2xl md:text-3xl mb-8">
              <span className="text-white">ABOUT</span>
              <span className="text-[#39FF14]"> ME</span>
            </h2>
            
            <div ref={textRef} className="space-y-4 text-[#AAAAAA]">
              <p>I'm a passionate full-stack developer specialized in the MERN stack with extensive experience in creating immersive web experiences using Three.js and CSS animations.</p>
              
              <p>My journey in web development started with a fascination for creating interactive UIs that not only look great but also provide exceptional user experiences.</p>
              
              <p>I combine technical expertise with creative problem-solving to build applications that stand out from the crowd.</p>
            </div>
            
            <div className="mt-8">
              <h3 className="font-['Press_Start_2P'] text-xl mb-4 text-white">CORE SKILLS</h3>
              
              <div ref={skillsRef} className="grid grid-cols-2 gap-4">
                {skills.map((skill, index) => (
                  <div key={index} className="skill-item flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#39FF14]"></div>
                    <span className="font-mono">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div ref={modelRef} className="w-full md:w-1/2 relative">
            <div className="relative w-full aspect-square bg-[#121212] rounded-lg overflow-hidden border border-[#39FF14] border-opacity-20">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#8A2BE2] opacity-30"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 aspect-square border-2 border-[#39FF14] border-opacity-30 rounded-full flex items-center justify-center">
                <div className="w-3/4 h-3/4 border-2 border-[#39FF14] border-opacity-50 rounded-full flex items-center justify-center">
                  <div className="w-1/2 h-1/2 bg-[#39FF14] bg-opacity-10 rounded-full pulse-animation"></div>
                </div>
              </div>
              
              {/* Canvas for 3D model */}
              <div className="absolute inset-0 z-10">
                <div className="relative w-full h-full">
                  <div className="w-full h-full absolute top-0 left-0 z-10">
                    <Model
                      path=""
                      scale={1.5}
                      color="#39FF14"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
