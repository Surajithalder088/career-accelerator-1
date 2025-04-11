import { useEffect, useState } from "react"
import { Footer } from "../../components/Footer/page"
import Navbar from "../../components/Navbar/page"
import JobPost from "../../components/JobPost"
import ScrollAnimation from "../../components/ScrollAnimation/page"
//import {jobpost} from "../../../lib/job"
import { useDispatch } from "react-redux"
import { getAuth } from "../_gettingAuth/getAuth"
import { login } from "../../store/userSlice"
//import { RootState } from "../../store/store"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from "sonner"

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


 
const JobSearching = () => {
  const [searchItem,setSearchItem]=useState("")
  const [jobArray,setJobArray]=useState<JobPost[]>([])
  const [filters,setFilters]=useState<JobPost[]>([])
  const [searched,setsearched]=useState(false)
  const [valid,setValid]=useState(true)
 
  const navigate=useNavigate()

   //const user=useSelector((state:RootState)=>state.user)
  const dispatch=useDispatch()

   const authFetching=async()=>{
       try {
        const authUser:UserState=await getAuth()
        if(authUser.name===""){
          toast.error("You are a HR,not job seeker")
          navigate('/login')
          return
         }
            if(authUser.name!==""){
            dispatch(login(authUser))
            if(authUser.isHR===true){
              toast.error("You are a HR,not job seeker")
              setValid(false)
            }
          
          }else{
            navigate('/login')
          }
       } catch (error) {
        navigate('/login')
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

  useEffect(() => {

    authFetching()
    jobFetching()
 
   
  }, [])



  const handleSearch=()=>{

   const list=searchItem===""?jobArray:jobArray.filter(job=>job.title.toLowerCase().includes(searchItem.toLowerCase()))
 setFilters(list)
 
   setsearched(true)
  }

  return (
    <>
    <div className="flex flex-col  justify-center text-white [@media(max-width:400px)]:max-w-screen  bg-gradient-to-tr from-black via-[rgb(104,52,164)] via-65% to-[rgb(31,30,30)] shadow-white min-h-screen w-full overflow-x-hidden">

    <Navbar/>
    
    <div className=" w-full flex gap-2 mx-30 mt-40   [@media(max-width:400px)]:flex-col [@media(max-width:400px)]:mx-10 [@media(max-width:400px)]:my-40">
      

      
      <input className="p-7 w-[70%] text-[20px] rounded-4xl shadow-[inset_0px_2px_20px_-3px_rgba(_255,_255,_255,1)]"
      placeholder="Seach by job title"
      value={searchItem}
      onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setSearchItem(e.target.value)}
      />
      <button className="!py-[10px] rounded-4xl !bg-gray-400 hover:text-black [@media(max-width:400px)]:w-[50%] !text-xl !font-bold"
      onClick={handleSearch}
      >Search</button>
    </div>
    {
        valid===false?
        <div className=" mx-30 flex flex-col items-center justify-center p-2 rounded-2xl  ">
          <div className=" max-w-fit bg-white text-red-400 p-2 rounded-xl">
          <p className="flex items-center gap-1"><p className="w-2 h-2 bg-red-400 rounded-full"></p>
          You are accessing this page from a recruiter account,</p>
          <p>Sign in as Job seeker</p>
          </div>
        </div>
        :""
       }
    <div className="mx-20 font-bold text-[25px]">Our top recruiters</div>
    <ScrollAnimation/>
    <div className="mx-20 font-bold text-[25px]">Jobs which suits your profile</div>

    <div className="flex flex-wrap p-3 ">
    {
      searched===false?
      jobArray.map((job,index)=>(<div key={index}>
        <JobPost title={job.title} company={job.company} id={job.id} applied={false}
         address={job.address} salary={job.salary} experience={job.experience} date="3 days ago"/>
      </div>)):
       filters.map((job,index)=>(<div key={index}>
        <JobPost title={job.title} company={job.company} id={job.id} applied={false}
         address={job.address} salary={job.salary} experience={job.experience} date="3 days ago"/>
      </div>))
    }
    </div>

    <Footer/>

    </div>
    </>
  )
}

export default JobSearching