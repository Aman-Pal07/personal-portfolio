import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Tool {
  name: string;
  angle?: number;
}

const tools: Tool[] = [
  { name: "GOOGLE MAPS", angle: -15 },
  { name: "MAKE.COM", angle: 0 },
  { name: "SWIPER", angle: 10 },
  { name: "BASIN", angle: -8 },
  { name: "ZAPIER", angle: 15 },
  { name: "MEMBERSTACK", angle: -12 },
  { name: "MAILCHIMP", angle: 5 },
  { name: "CALENDLY", angle: -5 },
  { name: "RECAPTCHA", angle: 8 },
  { name: "GTM", angle: -10 },
  { name: "GA4", angle: 12 },
  { name: "MAPBOX", angle: -7 },
];

const Tools = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);

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
    
    // Animate tools
    if (toolsRef.current) {
      const toolItems = toolsRef.current.querySelectorAll(".tool-item");
      
      const trigger = ScrollTrigger.create({
        trigger: toolsRef.current,
        start: "top 70%",
        once: true,
        onEnter: () => {
          gsap.fromTo(
            toolItems,
            { opacity: 0, y: 50, scale: 0.8 },
            { 
              opacity: 1, 
              y: 0, 
              scale: 1,
              duration: 0.5, 
              stagger: 0.05,
              ease: "back.out(1.7)"
            }
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
      id="tools" 
      ref={sectionRef}
      className="py-24 bg-[#121212] relative"
    >
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#39FF14] to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#39FF14] to-transparent"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 ref={headingRef} className="font-['Press_Start_2P'] text-2xl md:text-3xl mb-4">
            <span className="text-white">STUFF I USE</span>
            <span className="block text-[#39FF14] mt-2">IN WEBFLOW</span>
          </h2>
          <p ref={descriptionRef} className="text-[#AAAAAA] max-w-2xl mx-auto">
            A refined toolkit of JS Libraries, third parties services and integrations part of my skillset and used in my daily workflow in Webflow conversions.
          </p>
        </div>
        
        <div ref={toolsRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {tools.map((tool, index) => (
            <div 
              key={index} 
              className="tool-item relative transform transition-all duration-300 hover:scale-105 overflow-hidden"
              style={{ transform: `rotate(${tool.angle || 0}deg)` }}
            >
              <div className="bg-[#0A0A0A] p-4 rounded-lg border border-[#AAAAAA] border-opacity-10 h-full flex items-center justify-center">
                <span className="font-['Press_Start_2P'] text-sm md:text-base text-[#FAFAFA]">
                  {tool.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tools;
