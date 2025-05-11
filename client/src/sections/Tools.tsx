import { useRef, useEffect } from "react";

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

    // Set up Intersection Observer
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          const animationType = target.dataset.animationType || 'fade';
          const delay = parseInt(target.dataset.delay || '0');
          
          // Animate based on data attributes
          setTimeout(() => {
            if (animationType === 'fade') {
              target.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
              target.style.opacity = '1';
              target.style.transform = target.dataset.transform || 'translateY(0)';
            } else if (animationType === 'stagger') {
              // Handle staggered children
              const children = Array.from(target.children) as HTMLElement[];
              children.forEach((child, index) => {
                setTimeout(() => {
                  child.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                  child.style.opacity = '1';
                  child.style.transform = 'translateY(0) scale(1)';
                }, index * 50); // 50ms stagger
              });
            }
          }, delay);
          
          // Unobserve once animation starts
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    // Set up heading animation
    if (headingRef.current) {
      headingRef.current.style.opacity = '0';
      headingRef.current.style.transform = 'translateY(30px)';
      headingRef.current.dataset.animationType = 'fade';
      headingRef.current.dataset.transform = 'translateY(0)';
      headingRef.current.dataset.delay = '0';
      observer.observe(headingRef.current);
    }

    // Set up description animation
    if (descriptionRef.current) {
      descriptionRef.current.style.opacity = '0';
      descriptionRef.current.style.transform = 'translateY(20px)';
      descriptionRef.current.dataset.animationType = 'fade';
      descriptionRef.current.dataset.transform = 'translateY(0)';
      descriptionRef.current.dataset.delay = '200';
      observer.observe(descriptionRef.current);
    }

    // Set up tools grid animation
    if (toolsRef.current) {
      toolsRef.current.dataset.animationType = 'stagger';
      observer.observe(toolsRef.current);
      
      // Set initial state for all tool items
      const toolItems = Array.from(toolsRef.current.querySelectorAll('.tool-item')) as HTMLElement[];
      toolItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px) scale(0.8)';
      });
    }

    return () => {
      observer.disconnect();
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
