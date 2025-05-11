import { ChangeEvent } from 'react';

interface ServiceOptionProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ServiceOption = ({ id, label, checked, onChange }: ServiceOptionProps) => {
  return (
    <div className="service-option">
      <input 
        type="checkbox" 
        id={id} 
        checked={checked}
        onChange={onChange}
        className="hidden peer" 
      />
      <label 
        htmlFor={id} 
        className={`block text-center py-1.5 px-2 text-xs font-mono border border-[#AAAAAA] border-opacity-10 rounded cursor-pointer transition-colors duration-300 ${
          checked 
            ? "bg-[#39FF14] text-[#0A0A0A]" 
            : "bg-[#121212] text-[#FAFAFA]"
        }`}
      >
        {label}
      </label>
    </div>
  );
};

export default ServiceOption;
