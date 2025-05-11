// CSS-based animations without GSAP dependencies

// Helper to inject keyframes once
const injectKeyframes = () => {
  // Check if already injected
  if (document.getElementById('animation-keyframes')) return;
  
  const style = document.createElement('style');
  style.id = 'animation-keyframes';
  style.textContent = `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(50px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes fadeInDown {
      from {
        opacity: 0;
        transform: translateY(-50px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes fadeInLeft {
      from {
        opacity: 0;
        transform: translateX(-50px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    @keyframes fadeInRight {
      from {
        opacity: 0;
        transform: translateX(50px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    @keyframes scaleIn {
      from {
        opacity: 0;
        transform: scale(0.5);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }
    
    @keyframes floating {
      0% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(15px);
      }
      100% {
        transform: translateY(0);
      }
    }
    
    @keyframes rotating {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  `;
  
  document.head.appendChild(style);
};

// Ensure keyframes are injected on first import
injectKeyframes();

// Animate elements when they enter the viewport
export const fadeInUp = (element: HTMLElement, delay = 0, duration = 0.6) => {
  // Set initial state
  element.style.opacity = '0';
  element.style.transform = 'translateY(50px)';
  
  // Apply animation
  setTimeout(() => {
    element.style.animation = `fadeInUp ${duration}s cubic-bezier(0.215, 0.61, 0.355, 1) forwards`;
    element.style.animationDelay = `${delay}s`;
  }, 10);
};

export const fadeInDown = (element: HTMLElement, delay = 0, duration = 0.6) => {
  // Set initial state
  element.style.opacity = '0';
  element.style.transform = 'translateY(-50px)';
  
  // Apply animation
  setTimeout(() => {
    element.style.animation = `fadeInDown ${duration}s cubic-bezier(0.215, 0.61, 0.355, 1) forwards`;
    element.style.animationDelay = `${delay}s`;
  }, 10);
};

export const fadeInLeft = (element: HTMLElement, delay = 0, duration = 0.6) => {
  // Set initial state
  element.style.opacity = '0';
  element.style.transform = 'translateX(-50px)';
  
  // Apply animation
  setTimeout(() => {
    element.style.animation = `fadeInLeft ${duration}s cubic-bezier(0.215, 0.61, 0.355, 1) forwards`;
    element.style.animationDelay = `${delay}s`;
  }, 10);
};

export const fadeInRight = (element: HTMLElement, delay = 0, duration = 0.6) => {
  // Set initial state
  element.style.opacity = '0';
  element.style.transform = 'translateX(50px)';
  
  // Apply animation
  setTimeout(() => {
    element.style.animation = `fadeInRight ${duration}s cubic-bezier(0.215, 0.61, 0.355, 1) forwards`;
    element.style.animationDelay = `${delay}s`;
  }, 10);
};

// Animate elements with stagger effect (for lists, grids, etc)
export const staggerFadeInUp = (elements: HTMLElement[], delay = 0, duration = 0.6, staggerTime = 0.1) => {
  elements.forEach((element, index) => {
    // Set initial state
    element.style.opacity = '0';
    element.style.transform = 'translateY(50px)';
    
    // Apply animation with staggered delay
    const elementDelay = delay + (index * staggerTime);
    setTimeout(() => {
      element.style.animation = `fadeInUp ${duration}s cubic-bezier(0.215, 0.61, 0.355, 1) forwards`;
      element.style.animationDelay = `${elementDelay}s`;
    }, 10);
  });
};

// Scale animation
export const scaleIn = (element: HTMLElement, delay = 0, duration = 0.6) => {
  // Set initial state
  element.style.opacity = '0';
  element.style.transform = 'scale(0.5)';
  
  // Apply animation
  setTimeout(() => {
    element.style.animation = `scaleIn ${duration}s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards`;
    element.style.animationDelay = `${delay}s`;
  }, 10);
};

// Typewriter effect
export const typewriter = (element: HTMLElement, text: string, delay = 0, speed = 30) => {
  const originalText = text;
  element.textContent = "";
  
  setTimeout(() => {
    let i = 0;
    const interval = setInterval(() => {
      element.textContent = originalText.substring(0, i + 1);
      i++;
      
      if (i >= originalText.length) {
        clearInterval(interval);
      }
    }, speed);
  }, delay * 1000);
};

// Continuous floating animation
export const floatingAnimation = (element: HTMLElement, amplitude = 15, duration = 2) => {
  element.style.animation = `floating ${duration}s ease-in-out infinite`;
};

// Rotating animation
export const rotatingAnimation = (element: HTMLElement, duration = 10) => {
  element.style.animation = `rotating ${duration}s linear infinite`;
};
