import { useRef, useState, useEffect, FormEvent, ChangeEvent } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useToast } from "@/hooks/use-toast";
import ServiceOption from "../components/ServiceOption";
import Model from "../components/three/Model";

gsap.registerPlugin(ScrollTrigger);

interface Service {
  id: string;
  label: string;
}

const services: Service[] = [
  { id: "service-1", label: "Website Development" },
  { id: "service-2", label: "Webflow tutoring" },
  { id: "service-3", label: "Animations" },
  { id: "service-4", label: "Bug fix" },
  { id: "service-5", label: "Website Maintenance" },
  { id: "service-6", label: "Figma/XD to Webflow" },
  { id: "service-7", label: "UI/UX" },
  { id: "service-8", label: "Integrations" },
];

const Contact = () => {
  const { toast } = useToast();
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const modelRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [selectedServices, setSelectedServices] = useState<Record<string, boolean>>({});
  
  // Initialize selected services
  useEffect(() => {
    const initialSelectedServices: Record<string, boolean> = {};
    services.forEach(service => {
      initialSelectedServices[service.id] = false;
    });
    setSelectedServices(initialSelectedServices);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    const triggers: ScrollTrigger[] = [];
    
    // Animate heading
    if (headingRef.current) {
      const headingLines = headingRef.current.querySelectorAll("span");
      
      const trigger = ScrollTrigger.create({
        trigger: headingRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.fromTo(
            headingLines,
            { opacity: 0, x: -30 },
            { 
              opacity: 1, 
              x: 0, 
              duration: 0.5, 
              stagger: 0.1
            }
          );
        },
      });
      
      triggers.push(trigger);
    }
    
    // Animate 3D model container
    if (modelRef.current) {
      const trigger = ScrollTrigger.create({
        trigger: modelRef.current,
        start: "top 70%",
        once: true,
        onEnter: () => {
          gsap.fromTo(
            modelRef.current,
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)" }
          );
        },
      });
      
      triggers.push(trigger);
    }
    
    // Animate form
    if (formRef.current) {
      const formElements = formRef.current.querySelectorAll("input, textarea, label, button, .service-option");
      
      const trigger = ScrollTrigger.create({
        trigger: formRef.current,
        start: "top 70%",
        once: true,
        onEnter: () => {
          gsap.fromTo(
            formElements,
            { opacity: 0, y: 20 },
            { 
              opacity: 1, 
              y: 0, 
              duration: 0.5, 
              stagger: 0.03
            }
          );
        },
      });
      
      triggers.push(trigger);
    }
    
    return () => {
      triggers.forEach(trigger => trigger.kill());
    };
  }, []);

  const handleServiceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    setSelectedServices(prev => ({
      ...prev,
      [id]: checked
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!name.trim()) {
      toast({
        title: "Name is required",
        description: "Please enter your name",
        variant: "destructive"
      });
      return;
    }
    
    if (!email.trim() || !email.includes('@')) {
      toast({
        title: "Valid email is required",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }
    
    if (!message.trim()) {
      toast({
        title: "Message is required",
        description: "Please tell us about your project",
        variant: "destructive"
      });
      return;
    }
    
    // Get selected services
    const services = Object.entries(selectedServices)
      .filter(([_, isSelected]) => isSelected)
      .map(([id]) => {
        const service = services.find(s => s.id === id);
        return service ? service.label : "";
      })
      .filter(Boolean);
    
    // Here you would normally submit the data to your backend
    // For now, we'll just show a success toast
    toast({
      title: "Message sent!",
      description: "Thank you for reaching out. I'll get back to you soon.",
    });
    
    // Reset form
    setName("");
    setEmail("");
    setMessage("");
    setSelectedServices(prev => {
      const reset: Record<string, boolean> = {};
      Object.keys(prev).forEach(key => {
        reset[key] = false;
      });
      return reset;
    });
  };

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="py-24 bg-[#121212] relative"
    >
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#39FF14] to-transparent"></div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start gap-12">
          <div className="w-full md:w-1/2">
            <h2 ref={headingRef} className="font-['Press_Start_2P'] text-2xl md:text-3xl mb-4">
              <span className="block text-white">LET'S WORK</span>
              <span className="block text-outline mt-2">TOGETHER...</span>
              <span className="block text-outline mt-2">TOGETHER...</span>
              <span className="block text-outline mt-2">TOGETHER...</span>
              <span className="block text-outline mt-2">TOGETHER...</span>
              <span className="block text-[#39FF14] mt-2">TOGETHER...</span>
            </h2>
            
            <div ref={modelRef} className="mt-8 md:mt-16 relative">
              <div className="relative aspect-square md:aspect-auto md:h-80 overflow-hidden rounded-lg border border-[#8A2BE2] border-opacity-20">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#8A2BE2] opacity-30"></div>
                <div className="h-full w-full">
                  <div className="relative w-full h-full">
                    {/* Canvas for 3D model */}
                    <div className="w-full h-full absolute top-0 left-0 z-10">
                      <Model
                        path=""
                        scale={2}
                        color="#8A2BE2"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/2">
            <div className="bg-[#0A0A0A] p-6 rounded-lg border border-[#AAAAAA] border-opacity-10">
              <form ref={formRef} onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="form-group">
                    <label htmlFor="name" className="block text-[#AAAAAA] text-sm mb-1 font-mono">Name*</label>
                    <input 
                      type="text" 
                      id="name" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#121212] border border-[#AAAAAA] border-opacity-10 rounded px-3 py-2 text-[#FAFAFA] focus:border-[#39FF14] focus:outline-none transition-colors duration-300"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email" className="block text-[#AAAAAA] text-sm mb-1 font-mono">Email*</label>
                    <input 
                      type="email" 
                      id="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#121212] border border-[#AAAAAA] border-opacity-10 rounded px-3 py-2 text-[#FAFAFA] focus:border-[#39FF14] focus:outline-none transition-colors duration-300"
                      required
                    />
                  </div>
                </div>
                
                <div className="form-group mb-4">
                  <label className="block text-[#AAAAAA] text-sm mb-1 font-mono">What do you need?</label>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-2">
                    {services.slice(0, 4).map((service) => (
                      <ServiceOption
                        key={service.id}
                        id={service.id}
                        label={service.label}
                        checked={selectedServices[service.id] || false}
                        onChange={handleServiceChange}
                      />
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {services.slice(4).map((service) => (
                      <ServiceOption
                        key={service.id}
                        id={service.id}
                        label={service.label}
                        checked={selectedServices[service.id] || false}
                        onChange={handleServiceChange}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="form-group mb-6">
                  <label htmlFor="message" className="block text-[#AAAAAA] text-sm mb-1 font-mono">Tell me about your project*</label>
                  <textarea 
                    id="message" 
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-[#121212] border border-[#AAAAAA] border-opacity-10 rounded px-3 py-2 text-[#FAFAFA] focus:border-[#39FF14] focus:outline-none transition-colors duration-300"
                    required
                  ></textarea>
                </div>
                
                <div className="form-group mb-6 flex items-center">
                  <div className="recaptcha-placeholder border border-[#AAAAAA] border-opacity-10 rounded p-2 flex items-center justify-center w-full md:w-auto">
                    <div className="text-xs text-[#AAAAAA] font-mono">I'm not a robot</div>
                    <div className="w-6 h-6 ml-2 border border-[#AAAAAA] border-opacity-30 rounded"></div>
                  </div>
                  <div className="text-xs text-[#AAAAAA] ml-2 hidden md:block">By submitting this form, you agree to our Privacy Policy.</div>
                </div>
                
                <button 
                  type="submit" 
                  className="retro-button w-full px-8 py-3 bg-[#39FF14] text-[#0A0A0A] font-['Press_Start_2P'] text-sm tracking-wider transform hover:scale-[1.02] transition-all duration-300"
                >
                  SEND
                </button>
                
                <div className="text-xs text-[#AAAAAA] mt-2 text-center md:hidden">By submitting this form, you agree to our Privacy Policy.</div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
