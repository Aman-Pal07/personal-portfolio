import { useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import Scene from "../components/three/Scene";
import "../components/three/Scene.css"; // Import the CSS file

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  // CSS Animations
  useEffect(() => {
    // Set initial styles
    if (headingRef.current) {
      headingRef.current.style.opacity = "0";
      headingRef.current.style.transform = "translateY(20px)";
    }

    if (textRef.current) {
      textRef.current.style.opacity = "0";
      textRef.current.style.transform = "translateY(20px)";
    }

    if (buttonsRef.current) {
      buttonsRef.current.style.opacity = "0";
      buttonsRef.current.style.transform = "translateY(20px)";
    }

    if (scrollIndicatorRef.current) {
      scrollIndicatorRef.current.style.opacity = "0";
      scrollIndicatorRef.current.style.transform = "translateY(20px)";
    }

    // Animate elements with setTimeout for sequence
    setTimeout(() => {
      if (headingRef.current) {
        headingRef.current.style.transition =
          "opacity 1.2s ease, transform 1.2s ease";
        headingRef.current.style.opacity = "1";
        headingRef.current.style.transform = "translateY(0)";
      }
    }, 100);

    setTimeout(() => {
      if (textRef.current) {
        textRef.current.style.transition = "opacity 1s ease, transform 1s ease";
        textRef.current.style.opacity = "1";
        textRef.current.style.transform = "translateY(0)";
      }
    }, 500);

    setTimeout(() => {
      if (buttonsRef.current) {
        buttonsRef.current.style.transition =
          "opacity 1s ease, transform 1s ease";
        buttonsRef.current.style.opacity = "1";
        buttonsRef.current.style.transform = "translateY(0)";
      }
    }, 800);

    setTimeout(() => {
      if (scrollIndicatorRef.current) {
        scrollIndicatorRef.current.style.transition =
          "opacity 1s ease, transform 1s ease";
        scrollIndicatorRef.current.style.opacity = "1";
        scrollIndicatorRef.current.style.transform = "translateY(0)";
      }
    }, 1000);
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center relative pt-16 grid-background"
    >
      <div
        id="canvas-container"
        className="absolute inset-0 overflow-hidden z-0"
      >
        <Scene className="w-full h-full" />
        {/* Add scanline effect */}
        <div className="scanline"></div>
      </div>

      <div className="container mx-auto px-4 z-10 text-center">
        <h1
          ref={headingRef}
          className="font-['Press_Start_2P'] text-3xl md:text-5xl lg:text-6xl mb-6"
        >
          <span className="block transform transition-transform hover:scale-105 duration-300 glitch-text">
            FULL STACK
          </span>
          <span className="block text-[#39FF14] transform transition-transform hover:scale-105 duration-300 mt-2 glitch-text">
            MERN DEVELOPER
          </span>
        </h1>

        <p
          ref={textRef}
          className="text-[#AAAAAA] max-w-2xl mx-auto text-lg mb-10 font-mono"
        >
          Crafting immersive digital experiences with React, Node.js, Three.js,
          and CSS animations.
        </p>

        <div
          ref={buttonsRef}
          className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6"
        >
          <a
            href="#projects"
            className="retro-button px-8 py-3 bg-[#39FF14] text-[#0A0A0A] font-['Press_Start_2P'] text-sm tracking-wider transform hover:scale-105 transition-all duration-300"
          >
            VIEW PROJECTS
          </a>
          <a
            href="#contact"
            className="retro-button px-8 py-3 border border-[#39FF14] text-[#39FF14] font-['Press_Start_2P'] text-sm tracking-wider transform hover:scale-105 transition-all duration-300"
          >
            LET'S TALK
          </a>
        </div>

        <div ref={scrollIndicatorRef} className="mt-20 animate-bounce">
          <ChevronDown className="w-6 h-6 mx-auto text-[#AAAAAA]" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
