import { useEffect } from "react";
import { X } from "lucide-react";
import { useLocation } from "react-router-dom";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const location = useLocation();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    // Close mobile menu when location changes
    onClose();
  }, [location, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex flex-col">
      <div className="flex justify-end p-4">
        <button onClick={onClose} className="text-white hover:text-[#39FF14] transition-colors">
          <X className="w-8 h-8" />
        </button>
      </div>
      <nav className="flex-1 flex flex-col items-center justify-center">
        <ul className="space-y-8 text-center">
          <li>
            <a
              href="#home"
              className="text-white hover:text-[#39FF14] transition-colors text-2xl font-['Press_Start_2P']"
              onClick={onClose}
            >
              HOME
            </a>
          </li>
          <li>
            <a
              href="#about"
              className="text-white hover:text-[#39FF14] transition-colors text-2xl font-['Press_Start_2P']"
              onClick={onClose}
            >
              ABOUT
            </a>
          </li>
          <li>
            <a
              href="#tools"
              className="text-white hover:text-[#39FF14] transition-colors text-2xl font-['Press_Start_2P']"
              onClick={onClose}
            >
              TOOLS
            </a>
          </li>
          <li>
            <a
              href="#projects"
              className="text-white hover:text-[#39FF14] transition-colors text-2xl font-['Press_Start_2P']"
              onClick={onClose}
            >
              PROJECTS
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="text-white hover:text-[#39FF14] transition-colors text-2xl font-['Press_Start_2P']"
              onClick={onClose}
            >
              CONTACT
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MobileMenu;
