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

const apiUrl =import.meta.env.VITE_API_URL
//const jobDeatil=jobpost.find(job=>job.id===1)

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
  interface Applied{
    userId:string
    jobId:number
    status:string
  }

const JobDetails = () => {

  const jobid=useParams<{jobid:string}>()
  const applicatons:Number[]=useSelector((state:RootState)=>state.applications)
  const [applying,setApplying]=useState(false)
  const [postApplication,setPostApplication]=useState<Applied[]>([])
  
  const id=Number(jobid.jobid)
  console.log("job id",id);

  
  const[isHR,setIsHR]=useState(false)
  const [jobDeatil,setJobsDetails]=useState<JobPost|null>(null)

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
  if(res.status===200){
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
      const res=await axios.put(`${apiUrl}/api/application/application-status`,{applicationId,status},{withCredentials:true})
      console.log("applications:",res);
     
      
    } catch (error) {
      console.log(error);
      
    }
  }
  const reject=async(id:number)=>{
    const applicationId:number=id
    const status="rejected"
    try {
      const res=await axios.put(`${apiUrl}/api/application/application-status`,{applicationId,status},{withCredentials:true})
      console.log("applications:",res);
     
      
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(() => {
   fetchingApplidJobs()
  if(user.isHR===true){
    fetchApplications()
  }

  }, [user])

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

              {user.isHR?(
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
            <div className="[@media(max-width:400px)]:p-2">
            <div className="text-[27px] font-bold">{jobDeatil?.title}</div>
            <div className=" flex gap-20 py-2">
            <img src="/vite.svg"/>
            <div className="text-[22px]">{jobDeatil?.company}</div>
            </div>
            <div className="text-[22px] p-3">🏢{jobDeatil?.address}</div>
            <div className="text-[22px] p-3">💻{jobDeatil?.experience}</div>
            <div className="text-[22px] p-3">💵{jobDeatil?.salary}</div>
            <div className="text-[22px] p-3">🕒{"3 days ago"}</div>
        </div>
            <div className="text-[22px] pt-6 [@media(max-width:400px)]:px-3">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus aliquid natus rem accusantium quas vel blanditiis, dolores ea, pariatur commodi architecto et molestias debitis culpa molestiae consequatur similique hic mollitia tenetur! Reprehenderit nulla iure rem,
                 officiis magnam, recusandae quidem dolorum autem ullam dignissimos officia. Magni soluta sequi ratione illum sapiente fugit minus temporibus voluptatibus? Provident, illo molestias quas ipsum ab repellat. Accusamus labore natus error reprehenderit necessitatibus earum 
                 et ab repellendus dolorum rerum, mollitia aliquid porro animi molestiae doloribus odit alias, tempora laboriosam asperiores voluptas harum obcaecati quod. Odit suscipit debitis optio illo minus corrupti, aut in laboriosam placeat quos non similique saepe aspernatur animi 
                 illum blanditiis cupiditate error architecto corporis, eum amet perspiciatis, ipsa expedita modi!
                 Laboriosam laudantium beatae molestiae odio neque aliquid ad voluptate ab ea? Est, illo!
            </div>
            </div>
            
        </div>

        {
          user.isHR &&(
            <div className="ml-30 mt-20 flex flex-wrap">
{
  postApplication.map((item)=>(
    <div className=" border rounded-lg p-10">
      <p>job id:{item.jobId}</p>
      <p>user id:{item.userId}</p>
      <p>status :{item.status}</p>
      <div className="flex justify-between">
        <button className=" !bg-transparent text-red-500"
        onClick={()=>reject(id)}
        >reject</button>
        <button className=" !bg-transparent text-green-500"
        onClick={()=>accept(id)}
        >accept</button>
        </div>
    </div>
  ))
}
            </div>
          )
        }
        <Footer/>
    </div>
    </>
  )
}

export default JobDetails