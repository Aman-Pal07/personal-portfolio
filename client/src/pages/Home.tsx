import { useEffect } from "react";
import Hero from "../sections/Hero";
import About from "../sections/About";
import Tools from "../sections/Tools";
import Projects from "../sections/Projects";
import Contact from "../sections/Contact";

const Home = () => {
  useEffect(() => {
    // Set up intersection observer for headings
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -100px 0px', // Similar to "top bottom-=100"
      threshold: 0.1
    };
    
    const headingObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const heading = entry.target as HTMLElement;
          
          // Initial state
          heading.style.opacity = '0';
          heading.style.transform = 'translateY(50px)';
          
          // Animate in
          setTimeout(() => {
            heading.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            heading.style.opacity = '1';
            heading.style.transform = 'translateY(0)';
          }, 50);
          
          // Unobserve after animation
          headingObserver.unobserve(heading);
        }
      });
    }, observerOptions);
    
    // Observe all section headings
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      const heading = section.querySelector("h2");
      if (heading) {
        headingObserver.observe(heading);
      }
    });
    
    return () => {
      headingObserver.disconnect();
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
