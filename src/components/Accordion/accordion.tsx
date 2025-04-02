import  { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '../../../lib/utils';

const AccordionItem = ({ number, title, content }: { number: string; title: string; content: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <div className="text-white rounded-t-2xl overflow-hidden border-b border-gray-700">
      <div className={cn('flex items-center justify-between p-4 sm:p-6 md:p-8 lg:p-10', isOpen && 'bg-[rgb(104,52,164)]')}>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-100/30 leading-none">{number}</span>
          <h3 className="text-sm sm:text-base md:text-lg lg:text-xl text-white">{title}</h3>
        </div>
        <button 
          onClick={toggleAccordion}
          className="!bg-white/10 rounded-full p-1 sm:p-2 shadow-[inset_0px_0px_30px_-3px_rgba(_255,_255,_255,.5)] transition-colors"
          aria-label={isOpen ? "Close section" : "Open section"}
        >
          {isOpen ? (
              <Eye size={20} className="text-white" />
          ) : (
              <EyeOff size={20} className='text-white'/>
          )}
        </button>
      </div>
      
      {!isOpen && (
        <div className="px-4 pb-4">
          <div className="w-full"></div>
        </div>
      )}
      
      {isOpen && (
        <div className="px-4 py-4 text-sm sm:text-base text-gray-300 bg-[rgb(104,52,164)]">
          {content}
        </div>
      )}
    </div>
  );
};

const Accordion = () => {
  return (
    <div className="mx-4 sm:mx-6 md:mx-8 lg:mx-10 p-3 sm:p-5 rounded-lg">
      <AccordionItem 
        number="01" 
        title="I am a junior/mid-level/senior developer. Is this program for me?" 
        content="Yes, this program is for everyone. Whether you are a junior developer looking for to get your first job, or a senior developer looking to get a better job, this program is for you. We have helped developers of all levels get the job they want." 
      />
      
      <AccordionItem 
        number="02" 
        title="You apply to jobs for me?" 
        content="Yes! We have a state of the art AI that applies to hundreds of jobs a day, basically guaranteeing you a job!" 
      />
      
      <AccordionItem 
        number="03" 
        title="How long does it take to get a job with this program?" 
        content="We have seen candidates get a job in less than 2 weeks after being accepted. On average it takes around a month!" 
      />
      
      <AccordionItem 
        number="04" 
        title="What does Persist Ventures get?" 
        content="We get 15% of your salary from your new job, for 2 years, only once you find a job. If you don't find a job, you owe nothing. Compare this to a university, where you have to pay thousands upfront just to get a piece of paper that MIGHT get you a job. It's a no brainer!" 
      />
    </div>
  );
};

export default Accordion;