
export const FeatureSection = () => {
    return (
        <>
            <div className="w-full max-w-full px-4 sm:px-6 mx-auto py-8 md:py-12 flex justify-center overflow-hidden">
        <div className="flex flex-col md:flex-row gap-8 w-4xl">
          <div className="w-full md:w-1/2 p-6 sm:p-8 bg-transparent text-white shadow-[inset_0px_0px_20px_-3px_rgba(_255,_255,_255,.5)] h-80 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="50 10 150 150" className="w-4/5 h-4/5">
              <circle cx="148" cy="35" r="20" fill="none" stroke="#888" strokeWidth="2" />
              <text x="148" y="47" fontSize="34" fill="#888" textAnchor="middle">?</text>
              <circle cx="110" cy="65" r="20" fill="#888" />
              <path d="M100 150 A45 45 0 0 1 200 150" fill="#9370DB" />
              <circle cx="150" cy="80" r="15" fill="#9370DB" />
              <path d="M50 150 A60 60 0 0 1 170 150" fill="#888" />
            </svg>
        </div>
          <div className="w-full md:w-1/2">
            <h1 className="text-2xl md:text-3xl font-semibold text-center md:text-left mt-6 md:mt-8">
              Hundreds apply for the same
            </h1>
            <div className="text-2xl md:text-3xl font-semibold text-center md:text-left p-2 pb-4">
              job - so what sets you apart?
            </div>
            <p className="text-xs md:text-sm text-gray-300 font-semibold">
              Truth is, everyone&apos;s grinding LeetCode, attending bootcamps, and following the same playbook. But landing the job isn&apos;t just about coding skills-it&apos;s about knowing how to get hired.
            </p>
            <p className="text-xs md:text-sm mt-2 text-gray-300 font-semibold">
              That&apos;s why you see less-skilled candidates securing top roles while others struggle. The real advantage? Mastering the jon hunt, not just the code.
            </p>
            <a href={'#hero'}>
              <button className="p-4 text-xs mt-6 rounded-full !bg-[rgb(149,126,234)] text-white hover:text-black shadow-[inset_0px_2px_20px_-3px_rgba(_255,_255,_255,1)]">
                Get Started
              </button>
            </a>
          </div>
        </div>
      </div>
      <div className="px-4 sm:px-6 py-6 md:py-8 overflow-hidden flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl">
        <div className="p-4 sm:p-6 md:p-8 bg-transparent shadow-[inset_0px_2px_20px_-3px_rgba(_255,_255,_255,1)] hover:bg-purple-950 transition duration-600 ease-in-out h-62">
          <div>
            <div className="w-12 h-12 bg-purple-700 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <path d="M14 2v6h6" />
                <path d="M16 13H8" />
                <path d="M16 17H8" />
                <path d="M10 9H8" />
              </svg>
            </div>
            <h2 className="text-xl md:text-2xl font-semibold text-white">Craft a Standout Resume</h2>
            <p className="text-xs md:text-sm text-gray-300 mt-2">Stand out with a professionally designed, tailor-made resume.</p>
          </div>
        </div>
        
        <div className="p-4 sm:p-6 md:p-8 bg-transparent shadow-[inset_0px_2px_20px_-3px_rgba(_255,_255,_255,1)] hover:bg-purple-950 transition duration-600 ease-in-out">
          <div>
            <div className="w-12 h-12 bg-purple-700 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </div>
            <h2 className="text-xl md:text-2xl font-semibold text-white">LinkedIn Profile Enhancement</h2>
            <p className="text-xs md:text-sm text-gray-300 mt-2">Optimize your LinkedIn to attract top recruiters.</p>
          </div>
        </div>
        
        <div className="p-4 sm:p-6 md:p-8 bg-transparent shadow-[inset_0px_2px_20px_-3px_rgba(_255,_255,_255,1)] hover:bg-purple-950 transition duration-600 ease-in-out">
          <div>
            <div className="w-12 h-12 bg-purple-700 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
                <path d="M6 8h.01" />
                <path d="M9 8h.01" />
              </svg>
            </div>
            <h2 className="text-xl md:text-2xl font-semibold text-white">Automated Job Applications</h2>
            <p className="text-xs md:text-sm text-gray-300 mt-2">Let automation work for you, apply to jobs without lifting a finger</p>
          </div>
        </div>
        
        <div className="p-4 sm:p-6 md:p-10 md:py-8 bg-transparent shadow-[inset_0px_2px_20px_-3px_rgba(_255,_255,_255,1)] hover:bg-purple-950 transition duration-600 ease-in-out h-62">
          <div>
            <div className="w-12 h-12 bg-purple-700 rounded-lg flex items-center justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <h2 className="text-xl md:text-2xl font-semibold text-white">Personalized Career Advice</h2>
            <p className="text-xs md:text-sm text-gray-300 mt-2">Receive guidance tailored to your goals, plus interview prep and insider tips.</p>
          </div>
        </div>
        
        <div className="col-span-1 md:col-span-2 p-4 sm:p-6 md:p-8 bg-purple-950 shadow-[inset_0px_2px_20px_-3px_rgba(_255,_255,_255,1)] h-62">
          <div>
            <h2 className="text-2xl md:text-4xl font-semibold text-white">Take the Stress Out of Job Hunting</h2>
            <p className="text-sm text-gray-300 mt-2">Join our accelerator program and focus on your future while we handle the hard work.</p>
            <button className="bg-white text-black rounded-full mt-4 text-xs hover:bg-black hover:text-white"><a href="#hero">Get Started Now</a></button>
          </div>
        </div>
      </div>
    </div>
        </>
    )
}