import JobCard from "./Jobcard/jobCard";
import { WobbleCard } from "../WobbleCard/wooble-cart";

const StaggeredJobCards = () => {
    return (
      <WobbleCard className="bg-transparent border-none w-full">
        <div className="relative flex flex-col md:items-end h-[180px]">
          {/* First card */}
          <div className="absolute z-30 transform translate-y-32 -translate-x-32 md:translate-x-11 md:translate-y-12">
            <JobCard
              jobTitle="Flutter Developer"
              companyName="Persist Ventures"
              salary="$100,000"
              location="Worldwide"
              jobType="Job"
              employmentType="Full time"
              logoSrc="/logo/persist.jpg"
            />
          </div>
          
          {/* Second card */}
          <div className="absolute z-20 transform translate-y-16 md:translate-x-28 md:-translate-y-19">
            <JobCard
              jobTitle="Flutter Developer"
              companyName="Persist Ventures"
              salary="$100,000"
              location="Worldwide"
              jobType="Job"
              employmentType="Full time"
              logoSrc="/logo/persist.jpg"
            />
          </div>
          
          {/* Third card  */}
          <div className="z-10 blur-[1.5px] transform translate-y-0 md:-translate-x-25 md:translate-y-30">
            <JobCard
              jobTitle="Flutter Developer"
              companyName="Persist Ventures"
              salary="$100,000"
              location="Worldwide"
              jobType="Job"
              employmentType="Full time"
              logoSrc="/logo/persist.jpg"
            />
          </div>
          {/* Fourth Card */}
          <div className="z-0 blur-[1.5px] transform translate-y-0 md:-translate-x-10 md:-translate-y-65">
            <JobCard
              jobTitle="Flutter Developer"
              companyName="Persist Ventures"
              salary="$100,000"
              location="Worldwide"
              jobType="Job"
              employmentType="Full time"
              logoSrc="/logo/persist.jpg"
            />
          </div>
        </div>
      </WobbleCard>
    );
  };
  
  export default StaggeredJobCards;