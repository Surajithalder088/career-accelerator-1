import React from 'react';


interface JobCardProps {
    jobTitle: string;
    companyName: string;
    salary: string;
    location: string;
    jobType: string;
    employmentType: string;
    logoSrc: string;
  }
  
  const JobCard: React.FC<JobCardProps> = ({
    jobTitle,
    companyName,
    salary,
    location,
    jobType,
    employmentType,
    logoSrc,
  }) => {
    return (
      <div className="bg-black text-white w-full max-w-xs rounded-lg overflow-hidden shadow-lg border-white border">
        <div className="flex gap-2 p-4">
          <span className="bg-zinc-800 text-white px-3 py-1 rounded-full text-sm">
            {jobType}
          </span>
          <span className="bg-zinc-800 text-white px-3 py-1 rounded-full text-sm">
            {employmentType}
          </span>
        </div>
        
        <div className="px-4 pb-4 flex items-center gap-3">
          <div className="h-10 w-10 relative">
            <img
              src={logoSrc}
              alt={`${companyName} logo`}
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
          
          <div>
            <h2 className="text-xl font-semibold">{jobTitle}</h2>
            <p className="text-gray-400 text-sm">{companyName}</p>
          </div>
        </div>
        
        <div className="border-t border-zinc-800"></div>
        
        <div className="px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-yellow-500 mr-1">💰</span>
            <span className="text-sm">{salary}</span>
          </div>
          <div className="flex items-center">
            <span className="text-blue-400 mr-1">🌐</span>
            <span className="text-sm">{location}</span>
          </div>
        </div>
        
        <div className="px-4 pb-4">
          <button className="!bg-violet-600 text-white w-32 py-2 rounded-lg text-sm">
            View Details
          </button>
        </div>
      </div>
    );
  };
  

export default JobCard;