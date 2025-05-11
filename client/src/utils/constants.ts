import type { Project } from "../types/project";

// Project data
export const projects: Project[] = [
  {
    id: 1,
    title: "DXD EVENTS",
    description: "Dynamic Event Experiences That Make Selling And Brand-Building Effortless",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&h=900",
    tags: ["XD to Webflow", "CSS Animations"],
    year: "2023",
    technologies: ["React", "CSS Animations", "Webflow", "JavaScript", "Three.js"],
    client: "DXD Events Agency",
    role: "Front-end Developer",
    liveUrl: "https://example.com/dxd-events",
    githubUrl: "https://github.com/yourusername/dxd-events",
    longDescription: "DXD Events needed a dynamic website that would showcase their capabilities in creating immersive event experiences. The challenge was to translate their physical creativity into a digital experience that would impress potential clients. I developed a solution that uses CSS animations for smooth transitions and interactive elements that mimic the flow of their in-person events."
  },
  {
    id: 2,
    title: "DIFFERENT BY DESIGN",
    description: "Creative design agency website with interactive 3D elements and smooth animations",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&h=900",
    tags: ["Figma to Webflow", "Three.js"],
    year: "2023",
    technologies: ["React", "Three.js", "Webflow", "TypeScript", "CSS Animations"],
    client: "Different by Design Studio",
    role: "Full-stack Developer",
    liveUrl: "https://example.com/different-by-design",
    githubUrl: "https://github.com/yourusername/different-by-design",
    longDescription: "Different by Design is a creative studio that wanted their website to reflect their innovative approach to design. I created a website that features interactive 3D elements using Three.js, smooth transitions with CSS animations, and a unique visual language that sets them apart from competitors."
  },
  {
    id: 3,
    title: "TECH DASHBOARD",
    description: "A fully responsive admin dashboard with real-time data visualization",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&h=900",
    tags: ["React", "MongoDB"],
    year: "2022",
    technologies: ["React", "Node.js", "Express", "MongoDB", "D3.js", "Socket.io"],
    client: "Tech Solutions Inc.",
    role: "Full-stack Developer",
    liveUrl: "https://example.com/tech-dashboard",
    githubUrl: "https://github.com/yourusername/tech-dashboard",
    longDescription: "This dashboard was developed for a tech company that needed to visualize real-time data from their various systems. I built a full-stack solution with React for the frontend, Node.js and Express for the backend, and MongoDB for data storage. Real-time updates are handled via Socket.io, and complex data visualizations are created with D3.js."
  },
  {
    id: 4,
    title: "3D PORTFOLIO",
    description: "An interactive 3D portfolio showcasing creative works with immersive experiences",
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&h=900",
    tags: ["Three.js", "CSS Animations"],
    year: "2023",
    technologies: ["React", "Three.js", "React Three Fiber", "CSS Animations", "Framer Motion"],
    client: "Self-initiated",
    role: "Frontend Developer",
    liveUrl: "https://example.com/3d-portfolio",
    githubUrl: "https://github.com/yourusername/3d-portfolio",
    longDescription: "This personal project was created to explore the capabilities of Three.js and CSS animations for creating immersive web experiences. The portfolio features interactive 3D models, custom shaders, and animations that respond to user interaction. The goal was to push the boundaries of what's possible in web-based 3D visualization while maintaining good performance across devices."
  }
];

// Get a project by ID
export const getProjectById = (id: number): Project | undefined => {
  return projects.find(project => project.id === id);
};

// Skills data
export const skills = [
  { name: "React.js", category: "frontend" },
  { name: "Node.js", category: "backend" },
  { name: "Express", category: "backend" },
  { name: "MongoDB", category: "database" },
  { name: "Three.js", category: "frontend" },
  { name: "CSS Animations", category: "animation" },
  { name: "TypeScript", category: "language" },
  { name: "JavaScript", category: "language" },
  { name: "Tailwind CSS", category: "styling" },
  { name: "Webflow", category: "platform" },
  { name: "RESTful APIs", category: "backend" },
  { name: "Git", category: "tools" },
];

// Services offered
export const services = [
  { id: "website-dev", name: "Website Development" },
  { id: "webflow", name: "Webflow Development" },
  { id: "animations", name: "3D & Animation" },
  { id: "fullstack", name: "Full-stack Development" },
  { id: "ui-ux", name: "UI/UX Design" },
  { id: "maintenance", name: "Website Maintenance" },
];

// Navigation links
export const navLinks = [
  { path: "#home", label: "HOME" },
  { path: "#about", label: "ABOUT" },
  { path: "#tools", label: "TOOLS" },
  { path: "#projects", label: "PROJECTS" },
  { path: "#contact", label: "CONTACT" },
];

// Social media links
export const socialLinks = [
  { name: "GitHub", url: "https://github.com", icon: "Github" },
  { name: "LinkedIn", url: "https://linkedin.com", icon: "Linkedin" },
  { name: "Twitter", url: "https://twitter.com", icon: "Twitter" },
  { name: "Instagram", url: "https://instagram.com", icon: "Instagram" },
];
