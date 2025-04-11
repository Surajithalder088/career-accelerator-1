
import { useEffect, useState } from "react";


import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
//import { jobpost } from "../../../lib/job";
import JobPost from "../../components/JobPost";
import { RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "../_gettingAuth/getAuth";
import { login } from "../../store/userSlice";
import axios from "axios";
import { addApplication } from "../../store/applicatioSlice";

const apiUrl =import.meta.env.VITE_API_URL

interface UserState{
  name:string;
  email:string;
  address:string;
  company:string;
  experience:string;
  id:string;
  isHR:boolean
}

interface JobPost{
  
address:string
company:string
description:string
experience:string
id:number
salary:string
title:string
userId:string

}

interface Application{
  id:number 
  jobId:number 
  status:string 
  userId:string
}



export default function DashboardPage() {
  const [updating,setUpadating]=useState(false)
  const [status,setStatus]=useState("")
  const[isHR,setIsHR]=useState(false)
  const[jobPost,setJobPost]=useState<JobPost[]>([])
  const [jobArray,setJobArray]=useState<JobPost[]>([])
  const [filters,setFilters]=useState<JobPost[]>([])
 
  const router = useNavigate();
    const user=useSelector((state:RootState)=>state.user)
    const dispatch=useDispatch()

    const [name,setName]=useState(user.name)
   
    const [address,setAddress]=useState(user.address)
    const [company,setCompany]=useState(user.company)
    const [experience,setExperience]=useState(user.experience)
    const [resumeUrl,setResumeUrl]=useState("")
  
    const authFetching=async()=>{
      setStatus("loading")
      try {
        const authUser:UserState=await getAuth()
          if(authUser.name!==""){
          dispatch(login(authUser))
          setIsHR(authUser.isHR)
        setStatus("")
        }else{
          router('/login')
        }
      } catch (error) {
        router('/login')
      }
      
    }

    useEffect(() => {

      authFetching()
   
    }, [])

    const fetchingHRjob=async()=>{
      let id:string=user.id
      try {
        const res=await axios.post(`${apiUrl}/api/jobs/posted`,{userid:id},{withCredentials:true})
         console.log(res.data);
         setJobPost(res.data.jobs)
      
      } catch (error) {
        console.log(error);
        
      }
    }


    const jobFetching=async()=>{
      try {
        const res=await axios.get(`${apiUrl}/api/jobs/all`)
        console.log(res.data);

        if(res.status===200){
          setJobArray(res.data.jobs)
        }
        
      } catch (error) {
        console.log(error);
        
      }
    }

    const fetchingApplidJobs=async()=>{
      try {
        const res=await axios.post(`${apiUrl}/api/jobs/applied`,{userid:user.id},{withCredentials:true})
        console.log(res.data.jobs);
       if(res.status!==200){
        return
        
       }

       const appArray :Application[]= res.data.jobs

        
        
       const arrr= appArray.map((item)=>item.jobId)
       console.log("arr",arrr);
       
 arrr.forEach(ele => {
  dispatch(addApplication(ele))  // setting all the job ids this auth user applied to global state
 });
       
       
       
       if(jobArray.length!==0){let list=jobArray.filter(job=>arrr.includes(job.id))
       setFilters(list)
       
       
   }
      } catch (error) {
        console.log(error);
        
      }
    }

    
  useEffect(() => {
    if(user.id!==""){
      fetchingHRjob()
      jobFetching()
      fetchingApplidJobs()

      // for handling update profile
      
    }
    
  }, [user,jobArray])

  
  
  
  
  useEffect(() => {
    if (status === "unauthenticated") {
      router("/login");
    }
  }, [status, router]);
  
  if (status === "loading") {
    return (
      <div className="flex items-center w-[100vw] justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const handleUpdate=async()=>{
    try {
      const res= await axios.post(`${apiUrl}/api/user/update`,{
        name,
        email:user.email,
        address,
        isHR:user.isHR,
        company,
        experience,
        resumeUrl
      },{withCredentials:true})

      console.log(res.data);
      

      if(res.status!==200){
        console.log("user not updated as status not success",res);
        alert("Failed to update")
        return
        
      }
      


      const authUser={
        name:res.data.user.name,
        email:res.data.user.email,
        address:res.data.user.address,
        company:res.data.user.company,
        experience:res.data.user.experience,
        id:res.data.user.id,
        isHR:res.data.user.isHR,
            }
           dispatch(login(authUser)) 
            setUpadating(false)

      
    } catch (error) {
      console.log("failed to update user",error);
      alert("Some error occured")
      
    }
  }
  
  const logout=async()=>{
    try{
      const res=await axios.post(`${apiUrl}/api/user/logout`,{},{withCredentials:true})
    console.log("logout",res);
    if(res.status!==200){
       return
    }
   router('/login')
    }catch(error){
      console.log(error);
      
    }
    
    
  }
  
  return (
    <div className=" [@media(max-width:400px)]:max-w-screen overflow-x-hidden text-white bg-gradient-to-tr w-[100vw] from-black via-[rgb(104,52,164)] via-65% to-[rgb(31,30,30)] h-screen">
      <div className="container mx-auto py-12 px-4 ">
        <div className="max-w-4xl mx-auto bg-transparent text-white">
          <div>
            <div className="text-2xl">
              <div className="flex items-center gap-x-2">
                <button 
                className="gap-2 !bg-transparent mt-0.5 cursor-pointer hover:text-purple-500"
                onClick={() => router("/")}
                >
                  <ArrowLeft className="size-8"/>
                </button>
                Welcome to Your Dashboard
              </div>
            </div>
          </div>
          <div>
            <div className="space-y-6">
              <div >
                <h2 className="text-xl font-semibold flex gap-4 items-center">
                { updating===true?"Update Profile":"Account Information"
                 }
                <img
                className="w-8 h-8 cursor-pointer hover:bg-amber-50 p-1 rounded-full"
                onClick={()=>setUpadating(!updating)}
                src={updating===true?"/x-mark.png":"/pencil-fill.svg"}
                />
                </h2>
          { updating===true?
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <p className="text-sm text-gray-300">Name</p>
                    <input className="font-medium outline-1 p-1 rounded-2xl" value={name}
                    onChange={(e)=>setName(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-300">Address</p>
                    <input className="font-medium outline-1 p-1 rounded-2xl" value={address}
                     onChange={(e)=>setAddress(e.target.value)}/>
                  </div>

                  { user.isHR===true?
                    <div>
                    <p className="text-sm text-gray-300">Company</p>
                    <input className="font-medium outline-1 p-1 rounded-2xl" value={company}
                     onChange={(e)=>setCompany(e.target.value)}/>
                  </div>:
                  <div>
                    <p className="text-sm text-gray-300">Experience</p>
                    <input className="font-medium outline-1 p-1 rounded-2xl" value={experience}
                     onChange={(e)=>setExperience(e.target.value)}/>
                  </div>}
                  {
                    user.isHR===false?<div>
                    <p className="text-sm text-gray-300">Resume</p>
                    <input className="font-medium outline-1 p-1 rounded-2xl" value={resumeUrl}
                     onChange={(e)=>setResumeUrl(e.target.value)}/>
                  </div>:""}

                  
                  
                  <div>
                    <p className="text-red-500">Enter all fields to keep user's data accurate</p>
                    <button className="!bg-blue-400"
                    onClick={handleUpdate}
                    >update</button>
                  </div>
                  
                </div>:
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <p className="text-sm text-gray-300">Name</p>
                    <p className="font-bold text-xl">{user.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-300">Email</p>
                    <p className="font-bold text-xl">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-300">Address</p>
                    <p className="font-bold">{user.address}</p>
                  </div>

                 {user.isHR===true ?
                  <div>
                    <p className="text-sm text-gray-300">Company</p>
                    <p className="font-bold">{user.company}</p>
                  </div>:
                  <div>
                    <p className="text-sm text-gray-300">Experience</p>
                    <p className="font-bold">{user.experience}</p>
                  </div>}
                  
                </div>
                }
              </div>
              
              <div className="border-t pt-6">
                <h2 className="text-xl font-semibold">Your Career Progress</h2>
                <p className="mt-2 text-gray-400">
                  Welcome to your personalized dashboard! Here you can track your career acceleration progress
                  and access resources to help you reach your goals.
                </p>
                <div className="mt-4 bg-transparent p-6 rounded-lg shadow-[inset_0px_0px_20px_-3px_rgba(_255,_255,_255,.5)]">
                  <p className="font-medium">Getting Started</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Complete your profile to unlock personalized recommendations</li>
                    <li>Explore job opportunities matched to your skills</li>
                    <li>Access premium resources to accelerate your career growth</li>
                  </ul>
                </div>
              </div>
              
              <div className="flex justify-end text-black ">
                <button 

                  className="hover:!bg-black hover:text-white"
                  onClick={logout}
                >
                  Sign Out
                </button>
              </div>
            </div>
            
    
          </div>
        </div>
      
      </div>
      <p className=" text-[25px] font-bold mx-20">
        {
          isHR?"All your job posting":" All your applied job"
        }
      </p>
        <div className="flex flex-wrap p-3 ">
    {isHR?

     (jobPost.length!==0?
      
      jobPost.map((job,index)=>(<div key={index}>
        <JobPost title={job.title} company={job.company} id={job.id} applied={true}
         address={job.address} salary={job.salary} experience={job.experience} date="3 days ago"/>
      </div>)):(

        

          <div className=" mx-30 p-20">
          <div className="w-[900px] bg-amber-50 h-2 my-4"></div>
        <div className="flex flex-col gap-10">
          <p className="text-5xl">  No job Posting</p>
          <p className="text-3xl">hey user, go and start new job post ,hire top talents from our plat form </p>
        </div>
      </div>


            
      )
      
    )
      
      :

      ( filters.length!==0?
        
        filters.map((job,index)=>(<div key={index}>
        <JobPost title={job.title} company={job.company} id={job.id} applied={true}
         address={job.address} salary={job.salary} experience={job.experience} date="3 days ago"/>
      </div>)):(
        <div className=" mx-30 p-20">
          <div className="w-[900px] bg-amber-50 h-2 my-4"></div>
        <div className="flex flex-col gap-10">
          <p className="text-5xl"> No jobs Applied still now !</p>
          <p className="text-3xl"> hey user, go and start applying for jobs ,get hired top organigations from our platform</p>
        </div>
      </div>
      )
      
    )
    }
    </div>
    </div>
  );
}