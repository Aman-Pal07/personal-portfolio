import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 bg-[#0A0A0A]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <Link to="/" className="text-[#FAFAFA] font-['Press_Start_2P'] text-xl">
              DEV_<span className="text-[#39FF14]">PORTFOLIO</span>
            </Link>
            <p className="text-[#AAAAAA] text-sm mt-2 font-mono">
              © {new Date().getFullYear()} • Built with React, Three.js & CSS Animations
            </p>
          </div>

          <div className="flex space-x-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#AAAAAA] hover:text-[#39FF14] transition-colors duration-300"
              aria-label="GitHub"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#AAAAAA] hover:text-[#39FF14] transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#AAAAAA] hover:text-[#39FF14] transition-colors duration-300"
              aria-label="Twitter"
            >
              <Twitter className="w-6 h-6" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#AAAAAA] hover:text-[#39FF14] transition-colors duration-300"
              aria-label="Instagram"
            >
              <Instagram className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
