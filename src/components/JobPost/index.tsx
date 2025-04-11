
import axios from "axios"
import { motion } from "motion/react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { RootState } from "../../store/store"
import { addApplication } from "../../store/applicatioSlice"
import { useEffect, useState } from "react"
import { toast } from "sonner"


const apiUrl =import.meta.env.VITE_API_URL

type PostDetails={
    id:number
    title:string,
    company:string,
    address:string,
    salary:string,
    experience:string,
    date:string,
    applied:boolean
}

interface Application{
  id:number 
  jobId:number 
  status:string 
  userId:string
}

const JobPost = ({id,applied,title,company,address,salary,experience,date}:PostDetails) => {
  const [applying,setApplying]=useState(false)

const applicatons:Number[]=useSelector((state:RootState)=>state.applications)
  const user=useSelector((state:RootState)=>state.user)
  const dispatch=useDispatch()
    const navigate=useNavigate()

    const jobApply=async()=>{

      if(user.isHR){
        toast.error('You cannot apply from a recruiter account')
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
 
         
         
        const arrr= appArray.map((item)=>item.jobId)
        console.log("arr",arrr);
        
  arrr.forEach(ele => {
   dispatch(addApplication(ele))  // setting all the job ids this auth user applied to global state
  });
        
 } catch (error) {
         console.log(error);
         
       }
     }

     useEffect(() => {
      fetchingApplidJobs()
     }, [user])
     
 

  return (
    <>
    <div className=" m-10 p-5 rounded-lg w-[360px] h-[280px] bg-gradient-to-l from-gray-800 to-gray-600  shadow-[inset_0px_2px_20px_-3px_rgba(_255,_255,_255,1)]">
        <div className="flex items-center gap-10 justify-between">
            <div>
            <p className="font-bold text-[25px]">{title}</p>
            <p className="text-[20px]">{company}</p>
            </div>
           <img src="/vite.svg"/>
        </div>
        <div className="address"><p>🏢{address}</p></div>
        <div>💵{salary}</div>
        <div>💻{experience}</div>
        <div>🕒{date}</div>
        <div className=" my-2 flex gap-5 justify-between">
            <motion.button
            initial={{x:-50,opacity:0}}
            animate={{x:1,opacity:1,transition:{duration:1}}}
            className="!bg-transparent"
            onClick={()=>navigate(`/job-detail/${id}`)}
            >View details</motion.button>
            {
               !applied&& (
               applicatons.includes(id)?  // if this job id is already in apllied list the it shows applied
               <motion.button 
            initial={{x:30,opacity:0}}
            animate={{x:1,opacity:1,transition:{duration:1}}}
            className="!bg-blue-200 text-gray-400 cursor-zoom-in"
           
            >Already applied</motion.button>:

               <motion.button 
            initial={{x:30,opacity:0}}
            animate={{x:1,opacity:1,transition:{duration:1}}}
            className="!bg-blue-400 hover:text-black"
            onClick={jobApply}
            >
              {applying?"applying..":"Apply now"}
            </motion.button>
          
          )
            }
           
            
        </div>

    </div>
    </>
  )
}


export default JobPost