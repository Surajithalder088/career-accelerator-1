import { Footer } from "../../components/Footer/page"
import Navbar from "../../components/Navbar/page"
//import {jobpost} from "../../../lib/job"
import { ArrowLeft } from "lucide-react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAuth } from "../_gettingAuth/getAuth"
import { login } from "../../store/userSlice"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { RootState } from "../../store/store"
import { addApplication } from "../../store/applicatioSlice"
import { toast } from "sonner"

const apiUrl =import.meta.env.VITE_API_URL
//const jobDeatil=jobpost.find(job=>job.id===1)

interface UserState{
  name:string;
  email:string;
  address:string;
  company:string;
  experience:string;
  id:string;
  isHR:boolean;
  
}
type UserType={
  name:string;
  email:string;
  address:string;
  company:string;
  experience:string;
  id:string;
  isHR:boolean;
  resumeUrl:string
}

interface JobPost{
  
  address:string
  company:string
  description:string
  experience:string
  id:number
  salary:string
  title:string
  userId:string,
  flags:string
  updatedAt:string
  
  }

  interface Application{
    id:number 
    jobId:number 
    status:string 
    userId:string
  }
  interface Applied{
    id:number
    userId:string
    jobId:number
    status:string
    user:UserType
    updatedAt:string
  }

const JobDetails = () => {

  const jobid=useParams<{jobid:string}>()
  const applicatons:Number[]=useSelector((state:RootState)=>state.applications)
  const [applying,setApplying]=useState(false)
  const [postApplication,setPostApplication]=useState<Applied[]>([])
  const [myApplication,setMyApplication]=useState<Application>()
  
  const id=Number(jobid.jobid)
  console.log("job id",id);

  

  
  const[isHR,setIsHR]=useState(false)

  const [jobDeatil,setJobsDetails]=useState<JobPost>({

  address:" ",
  company:" ",
  description:" ",
  experience:" ",
  id:0,
  salary:" ",
  title:" ",
  userId:" ",
  flags:" ",
  updatedAt:" "
  })

  const user:UserState=useSelector((state:RootState)=>state.user)
const navigate=useNavigate()
  const dispatch=useDispatch()
  
  const authFetching=async()=>{
    
   try {const authUser:UserState=await getAuth()
        if(authUser.name!==""){
        dispatch(login(authUser))
        setIsHR(authUser.isHR)
      
      }else{
        navigate('/login')
      }}catch(error){
        navigate('/login')
      }
  }

  const fetchJobDetails =async()=>{
   
    try {
       const res=await axios.post(`${apiUrl}/api/jobs/detail`,{id})
    console.log(res);
    setJobsDetails(res.data.jobs)


    } catch (error) {
      console.log(error);
      
    }
   
    
  }

  const jobApply=async()=>{
    if(user.isHR){
      toast.error('You cannot apply from a job seeker account')
      return
    }
    try {
      setApplying(true)
      const res=await axios.post(`${apiUrl}/api/application/apply`,{userId:user.id,jobId:id},{
        withCredentials:true
      })
      console.log(res);
      if(res.status===201){
        navigate('/dashboard')
      }
      
    } catch (error) {
      console.log(error);
      setApplying(false)
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

    setMyApplication ( appArray.find(app=>app.jobId===id))
      
     const arrr= appArray.map((item)=>item.jobId)
     console.log("arr",arrr);
     
arrr.forEach(ele => {
dispatch(addApplication(ele))  // setting all the job ids this auth user applied to global state
});
     
} catch (error) {
      console.log(error);
      
    }
  }

  const fetchApplications=async()=>{
    try {
      const res=await axios.post(`${apiUrl}/api/application/applicaion-by-jobid`,{jobid:id},{withCredentials:true})
      console.log("applications:",res);
      setPostApplication(res.data.applications)
      
    } catch (error) {
      console.log(error);
      
    }
  }
  const jobWithdraw=async()=>{
    try {
      setApplying(true)
      const res=await axios.post(`${apiUrl}/api/application/withdraw`,{userid:user.id,jobid:id},{
        withCredentials:true
      })
      console.log(res);
      if(res.status===200){
        navigate('/dashboard')
      }
      
    } catch (error) {
      console.log(error);
      setApplying(false)
    }
  }
  const deleteJob=async()=>{
    

  try { const res=await axios.post(`${apiUrl}/api/jobs/delete-post`,{id},{withCredentials:true})
  console.log(res);
  if(res.status===201){
    alert('post deleted')
    navigate("/dashboard")
  }
  
  }catch(error){
    console.log(error);
    
  }
  }
 

  const accept=async(id:number)=>{
    console.log(isHR);
    
    const applicationId:number=id
    const status="accepted"
    try {
      const res=await axios.post(`${apiUrl}/api/application/application-status`,{applicationId,status},{withCredentials:true})
      console.log("applications:",res);
      
     navigate(`/job-detail/${id}`)
      
    } catch (error) {
      console.log(error);
      
    }
  }
  const reject=async(id:number)=>{
    const applicationId:number=id
    const status="rejected"
    try {
      const res=await axios.post(`${apiUrl}/api/application/application-status`,{applicationId,status},{withCredentials:true})
      console.log("applications:",res);
      navigate(`/job-detail/${id}`)
      
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(() => {
   fetchingApplidJobs()
  if(user.isHR===true){
    fetchApplications()
  }
  

  }, [user,postApplication])

useEffect(() => {

  authFetching()
  fetchJobDetails()
   

}, [])

  return (
    <>
    <div className="flex flex-col justify-center text-white [@media(max-width:400px)]:max-w-screen  bg-gradient-to-tr from-black via-[rgb(104,52,164)] via-65% to-[rgb(31,30,30)] shadow-white min-h-screen w-full overflow-x-hidden">
        <Navbar/>
        <div className="  mt-36 mx-30 [@media(max-width:400px)]:ml-1 [@media(max-width:400px)]:flex-col">
            <div className="flex items-center justify-between">

           {user.isHR?"" :<button className="w-22 h-18 !bg-transparent p-2 [@media(max-width:400px)]:ml-10"
            
            >
          <a href="/search-for-jobs">
            <ArrowLeft className="size-8"/></a>
            </button>}

              {user.isHR && jobDeatil.userId===user.id?(
                <button className="min-w-22 max-w-fit text-black h-18 cursor-cell !bg-blue-200 p-2 [@media(max-width:400px)]:ml-10"
                onClick={deleteJob}
                >
                  
                  remove job</button>
              ) :( applicatons.includes(id)?
                  <button className="min-w-22 max-w-fit h-18 text-black cursor-cell !bg-blue-200 p-2 [@media(max-width:400px)]:ml-10"
                  onClick={jobWithdraw}
                  >
                    
                    cancel application</button>:

                  <button className="min-w-22 max-w-fit h-18 !bg-blue-400 p-2 [@media(max-width:400px)]:ml-10"
                onClick={jobApply}
                >
                 {
                  applying?"applying...":"Apply now"
                 }</button>)
                }
            </div>
            
            <div className=" p-10 [@media(max-width:400px)]:px-4 border mt-4 rounded-lg [@media(max-width:400px)]:min-w-screen">
          
          {user.isHR===false?
           <div className="text-xl" >
                {myApplication?.status==="applied"?<div className="text-yellow-400">pending</div>
              :
              myApplication?.status==="accepted"?<div className="text-green-500">selected</div>
              :<div className="text-red-600">rejected</div>
              }
              </div>:''}

            <div className="[@media(max-width:400px)]:p-2">
              
            <div className="text-[27px] font-extrabold">{jobDeatil?.title}</div>
            <div className=" flex gap-10 py-2">
            <img src="/vite.svg"/>
            <div className="text-[22px] font-bold">{jobDeatil?.company}</div>
            </div>
            <div className="text-[22px] font-bold p-3">🏢{jobDeatil?.address}</div>
            <div className="text-[22px] font-bold p-3">💻{jobDeatil?.experience}</div>
            <div className="text-[22px] font-bold p-3">💵{jobDeatil?.salary}</div>
            <div className="text-[22px] font-bold p-3">🕒{new Date(jobDeatil?.updatedAt).toLocaleDateString()}</div>
        </div>
            <div className="text-[22px] pt-6 flex flex-col gap-4 [@media(max-width:400px)]:px-3">
              <div className="flex gap-1 flex-wrap max-w-[100%]">
                {jobDeatil?.flags.split(',').map(str=>(
                  <div className="bg-gray-600 p-2 rounded-xl">
                    {str}
                  </div>
                ))
                }
              </div>
              <div>
               {jobDeatil?.description}
                 </div>
            </div>
            </div>
            
        </div>

        {
          user.isHR &&(
            <div className="mx-30 mt-20 [@media(max-width:400px)]:m-10"> 
            
              <h4 className="text-2xl font-bold mb-4">All applications of this job</h4>
              <div className="w-[100%] h-1 bg-white"></div>
            <div className=" p-4 my-2 flex flex-wrap">
             
{
  postApplication.length>0?
  postApplication.map((item)=>(
    <div className=" border rounded-lg p-10 min-w-[80px] [@media(max-width:400px)]:w-fit [@media(max-width:400px)]:overflow-x-auto">
     
    
     
      <p className="text-2xl font-semibold flex gap-3 items-center">
        <img src="/user-3-fill.png" 
        className=" bg-white p-2 w-10 h-10 rounded-full"/>
      {item.user.name}</p>
      <p className="text-xl">{item.user.email}</p>
      <p>Ex :{item.user.experience}</p>
       <p>status :
        {item.status==="rejected"?<div className="text-red-600">rejected</div>:
        item.status==="accepted"?<div className="text-green-500">accepted</div>:<div className="text-yellow-400">applied</div>
        }
        </p>
      <p className="w-fit h-fit p-2 rounded-2xl cursor-pointer my-2 bg-gray-600"
      onClick={()=>window.open(item.user.resumeUrl,"_blank")}
      >view resume</p>
      
  <p>applied on: {
  new Date(item.updatedAt).toLocaleDateString()
    
    }</p>

      <div className="flex justify-between gap-2">
        <button className=" !bg-transparent text-red-500"
        onClick={()=>reject(item.id)}
        >reject</button>
        <button className=" !bg-transparent text-green-500"
        onClick={()=>accept(item.id)}
        >accept</button>
        </div>
    </div>
  ))
  :<div className="my-3 text-xl">
    <p>No candidate applied still now</p>
  </div>
}
            </div>
            </div>
          )
        }
        <Footer/>
    </div>
    </>
  )
}

export default JobDetails