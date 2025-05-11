import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "../sections/Hero";
import About from "../sections/About";
import Tools from "../sections/Tools";
import Projects from "../sections/Projects";
import Contact from "../sections/Contact";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  useEffect(() => {
    // Initialize smooth scrolling
    const sections = document.querySelectorAll("section");
    
    sections.forEach((section) => {
      const heading = section.querySelector("h2");
      
      if (heading) {
        gsap.fromTo(
          heading,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            scrollTrigger: {
              trigger: heading,
              start: "top bottom-=100",
              toggleActions: "play none none none",
            },
          }
        );
      }
    });
    
    // Clean up ScrollTrigger instances when component unmounts
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Handle smooth scrolling for navigation
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const href = target.getAttribute('href');
      
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(href);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.getBoundingClientRect().top + window.scrollY - 80,
            behavior: 'smooth'
          });
        }
      }
    };
    
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(anchor => {
      anchor.addEventListener('click', handleAnchorClick as EventListener);
    });
    
    return () => {
      anchors.forEach(anchor => {
        anchor.removeEventListener('click', handleAnchorClick as EventListener);
      });
    };
  }, []);

  return (
    <>
      <Hero />
      <About />
      <Tools />
      <Projects />
      <Contact />
    </>
  );
};

export default Home;
