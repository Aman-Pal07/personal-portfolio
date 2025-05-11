import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => {
    return location.hash === path ? "text-[#39FF14]" : "text-[#FAFAFA]";
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full bg-[#0A0A0A] z-50 transition-all duration-300 ${
          isScrolled ? "bg-opacity-90 backdrop-blur-md border-b border-[#39FF14] border-opacity-20" : "bg-opacity-60"
        }`}
      >
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="text-[#FAFAFA] font-['Press_Start_2P'] text-xl">
            DEV_<span className="text-[#39FF14]">PORTFOLIO</span>
          </Link>

          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li>
                <a
                  href="#home"
                  className={`${isActive("#home")} hover:text-[#39FF14] transition-colors duration-300 font-mono tracking-wider`}
                >
                  HOME
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className={`${isActive("#about")} hover:text-[#39FF14] transition-colors duration-300 font-mono tracking-wider`}
                >
                  ABOUT
                </a>
              </li>
              <li>
                <a
                  href="#tools"
                  className={`${isActive("#tools")} hover:text-[#39FF14] transition-colors duration-300 font-mono tracking-wider`}
                >
                  TOOLS
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className={`${isActive("#projects")} hover:text-[#39FF14] transition-colors duration-300 font-mono tracking-wider`}
                >
                  PROJECTS
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className={`${isActive("#contact")} hover:text-[#39FF14] transition-colors duration-300 font-mono tracking-wider`}
                >
                  CONTACT
                </a>
              </li>
            </ul>
          </nav>

          <button
            className="md:hidden text-[#FAFAFA]"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
};

export default Navbar;
