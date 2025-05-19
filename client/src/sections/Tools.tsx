import { useRef, useEffect, useState } from "react";
import {
  Map,
  Mail,
  Calendar,
  Database,
  BarChart,
  Globe,
  Search,
  Settings,
  Zap,
  Star,
  Box,
  Navigation,
  Activity,
  Cpu,
  User,
  ExternalLink,
} from "lucide-react";
import gsap from "gsap";
import {
  SiMongodb,
  SiCanva,
  SiBlender,
  SiNestjs,
  SiFirebase,
  SiReplit,
  SiShadcnui,
} from "react-icons/si";
import { TbBrandRedux, TbBrandThreejs } from "react-icons/tb";

interface Tool {
  name: string;
  icon: React.ReactNode;
  angle?: number;
  delay?: number;
  position?: {
    top?: string;
    left?: string;
    right?: string;
  };
  bgColor?: string;
}

// Define starting positions for all icons
const tools: Tool[] = [
  {
    name: "MONOGO DB",
    icon: <SiMongodb size={24} color="#FAFAFA" />,
    angle: 9,
    delay: 220,
    position: { top: "100%", right: "20%" },
  },
  {
    name: "Canvas",
    icon: <SiCanva size={24} color="#FAFAFA" />,
    angle: 0,
    delay: 200,
    position: { top: "30%", left: "45%" },
  },
  {
    name: "SWIPER",
    icon: <ExternalLink size={24} color="#FAFAFA" />,
    angle: 10,
    delay: 300,
    position: { top: "70%", left: "30%" },
  },
  {
    name: "REDUX",
    icon: <TbBrandRedux size={24} color="#FAFAFA" />,
    angle: -8,
    delay: 400,
    position: { top: "60%", right: "10%" },
  },
  {
    name: "BLENDER",
    icon: <SiBlender size={24} color="#FAFAFA" />,
    angle: 15,
    delay: 150,
    position: { top: "65%", left: "20%" },
  },
  {
    name: "THREE.JS",
    icon: <TbBrandThreejs size={24} color="#FAFAFA" />,
    angle: -12,
    delay: 250,
    position: { top: "75%", left: "8%" },
  },
  {
    name: "NEST.JS",
    icon: <SiNestjs size={24} color="#FAFAFA" />,
    angle: 5,
    delay: 350,
    position: { top: "10%", left: "10%" },
  },
  {
    name: "FIREBASE",
    icon: <SiFirebase size={24} color="#FAFAFA" />,
    angle: -5,
    delay: 450,
    position: { top: "25%", right: "15%" },
  },
  {
    name: "RECAPTCHA",
    icon: <Search size={24} color="#FAFAFA" />,
    angle: 8,
    delay: 180,
    position: { top: "50%", right: "25%" },
  },
  {
    name: "REPLIT",
    icon: <SiReplit size={24} color="#FAFAFA" />,
    angle: -10,
    delay: 280,
    position: { top: "35%", right: "8%" },
  },
  {
    name: "SHADCNUI",
    icon: <SiShadcnui size={24} color="#FAFAFA" />,
    angle: 12,
    delay: 380,
    position: { top: "20%", left: "35%" },
  },
  {
    name: "MAPBOX",
    icon: <Navigation size={24} color="#FAFAFA" />,
    angle: -7,
    delay: 480,
    position: { top: "45%", left: "20%" },
  },
  {
    name: "GSAP",
    icon: <Activity size={24} color="#FAFAFA" />,
    angle: 9,
    delay: 220,
    position: { top: "55%", right: "20%" },
  },
  {
    name: "FS ATTRIBUTES",
    icon: <Cpu size={24} color="#FAFAFA" />,
    angle: 0,
    delay: 320,
    position: { top: "40%", left: "40%" },
  },
  {
    name: "WEGLOT",
    icon: <Globe size={24} color="#FAFAFA" />,
    angle: -11,
    delay: 420,
    position: { top: "15%", right: "25%" },
  },
  {
    name: "CONVERTKIT",
    icon: <Star size={24} color="#FAFAFA" />,
    angle: 7,
    delay: 170,
    position: { top: "70%", right: "15%" },
  },
];

const Tools = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const toolsContainerRef = useRef<HTMLDivElement>(null);
  const toolRefs = useRef<(HTMLDivElement | null)[]>([]);

  // State for drag-and-drop
  const [dragging, setDragging] = useState<number | null>(null);

  useEffect(() => {
    if (!toolsContainerRef.current) return;

    // Floating animation with GSAP, applied after drop
    const startFloating = () => {
      toolRefs.current.forEach((tool, index) => {
        if (tool) {
          gsap.to(tool, {
            y: `+=${Math.random() * 20 - 10}`,
            x: `+=${Math.random() * 20 - 10}`,
            rotation: tools[index].angle || 0,
            duration: 3 + Math.random() * 2,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: index * 0.2,
          });
        }
      });
    };

    // Intersection Observer for entry animations
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const handleIntersection = (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;

          if (
            target === headingRef.current ||
            target === descriptionRef.current
          ) {
            const delay = parseInt(target.dataset.delay || "0");
            setTimeout(() => {
              target.style.opacity = "1";
              target.style.transform = "translateY(0)";
            }, delay);
          } else if (target === toolsContainerRef.current) {
            toolRefs.current.forEach((item, idx) => {
              if (item) {
                const delay = tools[idx].delay || idx * 80 + 400;
                item.classList.add("drop-bounce");
                item.style.animationDelay = `${delay}ms`;
                // Remove animation after it completes and start floating
                setTimeout(() => {
                  item.classList.remove("drop-bounce");
                  item.style.opacity = "1";
                  item.style.transform = `rotate(${tools[idx].angle || 0}deg)`;
                }, delay + 1000); // Animation duration is 1s
              }
            });
            // Start floating after all drops complete
            setTimeout(
              startFloating,
              Math.max(...tools.map((t) => t.delay || 0)) + 1000
            );
          }
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(
      handleIntersection,
      observerOptions
    );

    if (headingRef.current) {
      headingRef.current.style.opacity = "0";
      headingRef.current.style.transform = "translateY(-30px)";
      headingRef.current.style.transition =
        "opacity 0.8s ease, transform 0.8s ease";
      headingRef.current.dataset.delay = "0";
      observer.observe(headingRef.current);
    }

    if (descriptionRef.current) {
      descriptionRef.current.style.opacity = "0";
      descriptionRef.current.style.transform = "translateY(-20px)";
      descriptionRef.current.style.transition =
        "opacity 0.8s ease, transform 0.8s ease";
      descriptionRef.current.dataset.delay = "200";
      observer.observe(descriptionRef.current);
    }

    if (toolsContainerRef.current) {
      observer.observe(toolsContainerRef.current);
      // Set initial state for all tool items
      const toolItems = Array.from(
        toolsContainerRef.current.children
      ) as HTMLElement[];
      toolItems.forEach((item, index) => {
        item.style.opacity = "0";
        item.style.transform = `translateY(-100vh) rotate(${
          tools[index].angle || 0
        }deg)`;
      });
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Drag-and-drop handlers
  const handleMouseDown = (index: number, e: React.MouseEvent) => {
    setDragging(index);
    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (dragging !== null && toolRefs.current[dragging]) {
      const tool = toolRefs.current[dragging]!;
      const rect = toolsContainerRef.current!.getBoundingClientRect();
      const x = e.clientX - rect.left - tool.offsetWidth / 2;
      const y = e.clientY - rect.top - tool.offsetHeight / 2;
      tool.style.left = `${x}px`;
      tool.style.top = `${y}px`;
      tool.style.right = "auto";
    }
  };

  const handleMouseUp = () => {
    setDragging(null);
  };

  useEffect(() => {
    if (dragging !== null) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

  return (
    <section
      id="tools"
      ref={sectionRef}
      className="py-24 bg-[#121212] relative min-h-screen overflow-hidden"
    >
      {/* Enhanced cyberpunk grid with glow */}
      <div className="absolute inset-0 grid grid-cols-12 gap-0 pointer-events-none opacity-30">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={`col-${i}`}
            className="h-full border-r border-[#39FF14]/10"
          ></div>
        ))}
      </div>
      <div className="absolute inset-0 grid grid-rows-12 gap-0 pointer-events-none opacity-30">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={`row-${i}`}
            className="w-full border-b border-[#39FF14]/10"
          ></div>
        ))}
      </div>

      {/* Glowing border lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#39FF14] to-transparent animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#39FF14] to-transparent animate-pulse"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Heading area with neon glow */}
        <div className="text-center mb-16 pt-6">
          <div className="inline-block mb-4 relative">
            <p className="font-['Press_Start_2P'] text-sm text-white mb-4 relative z-10">
              THIRD PARTY TOOLS
            </p>
            <div className="absolute inset-0 bg-[#39FF14] opacity-20 blur-md"></div>
          </div>

          <h2
            ref={headingRef}
            className="font-['Press_Start_2P'] mb-4 relative"
          >
            <span className="text-white text-4xl md:text-5xl block mb-2 drop-shadow-[0_0_10px_rgba(57,255,20,0.5)]">
              STUFF I USE
            </span>
            <span className="block text-[#39FF14] text-4xl md:text-5xl drop-shadow-[0_0_10px_rgba(57,255,20,0.8)]">
              IN WEBFLOW
            </span>
          </h2>

          <p
            ref={descriptionRef}
            className="text-[#AAAAAA] max-w-2xl mx-auto text-lg leading-relaxed"
          >
            A refined toolkit of JS Libraries, third-party services, and
            integrations part of my skillset and used in my daily workflow in
            Webflow conversions.
          </p>
        </div>

        {/* Tools container */}
        <div
          ref={toolsContainerRef}
          className="relative h-[600px] md:h-[700px]"
        >
          {tools.map((tool, index) => (
            <div
              key={index}
              ref={(el) => (toolRefs.current[index] = el)}
              className="tool-item absolute transform transition-all duration-300 hover:scale-110 cursor-move select-none"
              style={{
                top: tool.position?.top || `${10 + Math.random() * 80}%`,
                left: tool.position?.left,
                right: tool.position?.right,
                perspective: "1000px",
              }}
              onMouseDown={(e) => handleMouseDown(index, e)}
            >
              <div className="relative group">
                {/* 3D Button with neon glow */}
                <div className="bg-[#0A0A0A] py-3 px-6 rounded-full border border-[#39FF14]/30 flex items-center justify-center whitespace-nowrap transform transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_8px_16px_rgba(57,255,20,0.3)] group-hover:rotate-x-10 group-hover:rotate-y-10">
                  <span className="mr-2">{tool.icon}</span>
                  <span className="font-['Press_Start_2P'] text-sm md:text-base text-[#FAFAFA]">
                    {tool.name}
                  </span>
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 bg-[#39FF14] opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subtle background particles for cyberpunk vibe */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute bg-[#39FF14] rounded-full opacity-20 animate-float"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 10 + 5}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>
    </section>
  );
};

export default Tools;
