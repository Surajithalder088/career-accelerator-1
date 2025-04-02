
import { motion, useInView } from "framer-motion";


import { WobbleCard } from "../WobbleCard/wooble-cart";
import { RightArrow } from "../RightArrow/page";
import { LeftArrow } from "../LeftArrow/page";
import StaggeredJobCards from "../StaggeredJobCard/page";
import { UserProfileCard } from "../ProfileCard/page";
import { useRef } from "react";

const JobCardsSection = () => {
  // References for scroll detection
  const topSectionRef = useRef<HTMLDivElement>(null);
  const bottomSectionRef = useRef<HTMLDivElement>(null);
  
  // Check if the sections are in view
  const topSectionInView = useInView(topSectionRef, { 
    once: false, 
    amount: 0.3
  });
  
  const bottomSectionInView = useInView(bottomSectionRef, { 
    once: false, 
    amount: 0.3 
  });

  return (
    <div className="flex flex-col items-center gap-8 mt-12 md:mt-16">
      <div 
        ref={topSectionRef}
        className="flex flex-col items-center gap-8 mt-12 md:ml-28 md:mt-16"
      >
        <div className="flex flex-col md:flex-row items-center mb-20 sm:mb-0 gap-8 relative">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={topSectionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-transparent md:w-75 p-4 sm:p-6 mb-4 shadow-[8px_10px_15px_1px_rgba(0,0,0,1)]">
              <div className="mx-2 md:mx-4">
                <motion.h2 
                  className="text-white text-xl md:text-2xl font-semibold"
                  initial={{ opacity: 0 }}
                  animate={topSectionInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  Land Your Dream Job!
                </motion.h2>
                <motion.div 
                  className="text-gray-300 text-xs md:text-sm mt-2"
                  initial={{ opacity: 0 }}
                  animate={topSectionInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  Explore 10,000+ high-paying tech jobs and get hired faster with our Career Accelerator.
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={topSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a href={'/search-for-jobs'}>
                    <button className="rounded-xl text-white border text-xs !bg-transparent mt-4 hover:text-black hover:border-black hover:border-2">
                      Explore Now
                    </button>
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>
          <RightArrow inView={topSectionInView} />
          <motion.div 
            className="w-md"
            initial={{ opacity: 0, x: 50 }}
            animate={topSectionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <StaggeredJobCards />
          </motion.div>
        </div>
      </div>
      <div 
        ref={bottomSectionRef}
        className="flex flex-col items-center gap-4 relative"
      >
        <LeftArrow inView={bottomSectionInView} />
        <div className="flex flex-col-reverse md:flex-row items-center gap-y-8 sm:gap-y-0 gap-4 md:gap-10 md:mr-14">
          <motion.div 
            className="w-sm"
            initial={{ opacity: 0, x: -50 }}
            animate={bottomSectionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <WobbleCard className="bg-transparent border-none w-full h-[300px]">
                <UserProfileCard className="ml-10" />
              <img src={'/logo/signup.jpg'} alt="Signup image" width={300} height={300} className="blur-[0.7px] -ml-10"/>
            </WobbleCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={bottomSectionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="bg-transparent md:w-75 p-4 sm:p-6 mt-16 sm:mt-0 shadow-[8px_10px_15px_1px_rgba(0,0,0,1)]">
              <div className="mx-2 md:mx-4">
                <motion.h2 
                  className="text-white text-xl md:text-2xl font-semibold"
                  initial={{ opacity: 0 }}
                  animate={bottomSectionInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 }}
                >
                  Hire Top Developers Fast!
                </motion.h2>
                <motion.div 
                  className="text-gray-300 text-xs md:text-sm mt-2"
                  initial={{ opacity: 0 }}
                  animate={bottomSectionInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.8 }}
                >
                  Access job-ready tech talent and fill roles effortlessly.
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={bottomSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.4, delay: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a href={'/start-hiring'}>
                    <button className="ml-30 rounded-xl text-white border text-xs !bg-transparent mt-4 hover:text-black hover:border-black hover:border-2">
                      Start Posting
                    </button>
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default JobCardsSection;