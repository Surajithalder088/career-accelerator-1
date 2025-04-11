import { useEffect, useState } from "react"
import { Footer } from "../../components/Footer/page"
import Navbar from "../../components/Navbar/page"
import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "../_gettingAuth/getAuth";
import { login } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { RootState } from "../../store/store";
import { toast } from "sonner";

const apiUrl =import.meta.env.VITE_API_URL

const flagsData=[
  {
    id:1,
    name:"javascript"
  },
  {
    id:2,
    name:"java"
  },
  {
    id:3,
    name:"python"
  },
  {
    id:4,
    name:"react.js"
  },
  {
    id:5,
    name:"node.js"
  },
  {
    id:6,
    name:"next.js"
  },
  {
    id:7,
    name:"mongodb"
  },
  {
    id:8,
    name:"postgresql"
  },
  {
    id:9,
    name:"django"
  },
  {
    id:10,
    name:"springboot"
  },
  {
    id:11,
    name:'typescript'
  },
  {
    id:12,
    name:"mysql"
  },
  {
    id:13,
    name:"tailwindcss"
  },
  {
    id:14,
    name:"docker"
  },
  {
    id:15,
    name:"AWS Cloud"
  },
  {
    id:16,
    name:"React Native"
  },
  {
    id:17,
    name:"Angular"
  },
  {
    id:18,
    name:"PHP"
  },
  {
    id:19,
    name:".Net"
  },
  {
    id:20,
    name:"Express.js"
  }
]

interface UserState{
  name:string;
  email:string;
  address:string;
  company:string;
  experience:string;
  id:string;
  isHR:boolean
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


const JobPosting = () => {

  const [postOpen,setPostOpen]=useState(true)
  const [valid,setValid]=useState(true)

const[flagsOpen,setFlagsOpen]=useState(false)
const [loading,setLoading]=useState(false)
const [allusers,setallUsers]=useState<UserType[]>([])

  const [title,setTitle]=useState("")
  const [salary,setSalary]=useState("")
  const [experience,setExperience]=useState("")
  const [description,setDescription]=useState("")
  const[flags,setFlagas]=useState("")
  const[flagArray,setFlagArray]=useState<number[]>([])
  const navigate=useNavigate()

  const user=useSelector((state:RootState)=>state.user)



  const dispatch=useDispatch()

  const authFetching=async()=>{
      
    try {const authUser:UserState=await getAuth()
       if(authUser.name===""){
        navigate('/login')
        return
       }
           if(authUser.name!==""){
           dispatch(login(authUser))
           if(authUser.isHR===false){
            toast.error("You are a job seeker,not HR")
             setValid(false)
           }
         
         }else{
           navigate('/login')
         }
      
    } catch (error) {
      navigate('/login') 
    }
       
     }

     const fetchingAllUsers=async()=>{
      try {
        const res=await axios.post(`${apiUrl}/api/user/all-users`)
        console.log(res.data.users);
        if(res.status!==200){
          console.log("failed to fetch data");
          return
        }
        setallUsers(res.data.users)
        
      } catch (error) {
        console.log(error);
        
      }
     }

 useEffect(() => {

   authFetching()
  fetchingAllUsers()
  
 }, [])

 const addSkills=(id:number)=>{
  if(flagArray.includes(id)){
    return
  }
  flagArray.push(id)
  console.log(flagArray);
  let skills=flagsData.filter(f=>flagArray.includes(f.id))
  setFlagas(`${skills.map(f=>f.name)}  `)

 }

  const handleSubmit=async(e:React.FormEvent)=>{
    e.preventDefault()
    setLoading(true)

    if(user.isHR===false){
      toast.error("You are not recruiter")
      navigate('/login')
      return
    }
try {
    console.log(title,salary,experience,description);
    if(title===""||salary===""||experience===""||flags===""){
      alert("these fiels are required")
      setLoading(false)
      return
    }
   const address=user.address
   const company=user.company
   const userId=user.id

   const res=await axios.post(`${apiUrl}/api/jobs/new-post`,{
    title,salary,address,company,experience,description,userId,flags
   },{withCredentials:true})

   console.log(res);
   if(res.status!==201){
    setLoading(false)
    alert("failed")
    return
   }
   alert(res.data.message)
   navigate('/dashboard')
   
    
   } catch (error) {
    console.log(error);
    setLoading(false)
   }
   
    

}


  return (
   <>
   <div className="flex flex-col justify-center text-white [@media(max-width:400px)]:max-w-screen  bg-gradient-to-tr from-black via-[rgb(104,52,164)] via-65% to-[rgb(31,30,30)] shadow-white min-h-screen w-full overflow-x-hidden">
    <Navbar/>
    
    <div className="mx-40 mt-30 [@media(max-width:400px)]:mx-2 [@media(max-width:400px)]:px-2 ">
      
      <div className=" text-[37px] mt-6 font-bold">Post new job  and Find top Developers </div>

      {
        valid===false?
        <div className=" mx-30 flex flex-col items-center justify-center p-2 rounded-2xl  ">
          <div className=" max-w-fit bg-white text-red-400 p-2 rounded-xl">
          <p className="flex items-center gap-1"><p className="w-2 h-2 bg-red-400 rounded-full"></p>
          You are accessing this page from a job seeker account,</p>
          <p>Sign in as recruiter</p>
          </div>
        </div>
        :""
       }
      <div className="flex justify-around">
      <div className={`p-2 rounded-2xl cursor-pointer m-3 border-1 ${!postOpen?"bg-gradient-to-l from-blue-400 to bg-pink-400":"bg-gray-800"}`}
      onClick={()=>setPostOpen(true)}
      >Create new Post</div>
      <div  className={`p-2 rounded-2xl cursor-pointer m-3 border-1 ${postOpen?"bg-gradient-to-l from-blue-400 to bg-pink-400":"bg-gray-800"}`}
      onClick={()=>setPostOpen(false)}
      >View Developrs profile</div>
      </div>
      <div className="w-[100%] h-1 bg-white"></div>

      {postOpen===true?
        
        <form className="flex flex-col mx-20 gap-5" 
      onSubmit={handleSubmit}
      >
        <p className="text-[30px] font-bold mt-10">🏢{user.company}</p>
        <p className="text-[25px] font-bold">{user.address}</p>
        <input placeholder="job title"
         className=" p-2 max-w-[100%] text-[20px] border rounded-lg" 
         type="string" 
         value={title}
         onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setTitle(e.target.value)}
         />
        
        <input placeholder="Salary"
        className=" p-2 max-w-[100%] text-[20px] border rounded-lg" 
        type="string" 
        value={salary}
        onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setSalary(e.target.value)}
        />
        <input placeholder="experience" 
        className=" p-2 max-w-[100%] text-[20px] border rounded-lg" 
        type="string" 
        value={experience}
        onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setExperience(e.target.value)}
        />
        <div className=" text-black cursor-pointer bg-white p-3 w-fit rounded-2xl"
        onClick={()=>setFlagsOpen(true)}
        >Add skills</div>
       { flagsOpen ?
       <div className="min-w-[100%]">
        <input placeholder="add flags" 
        className=" p-2 min-w-[100%] max-w-[100%] h-fit text-[20px] border rounded-lg" 
        type="string" 
        value={flags}
        
        />
        <div className="p-2 my-1 max-w-[100%] flex flex-wrap text-[20px] border cursor-pointer rounded-lg">

           {flagsData.map((flag)=>(
            <div className=" p-1 bg-gray-500 px-3 m-2 rounded-xl"
            onClick={()=>addSkills(flag.id)}
            >
          {flag.name}
          {
            flagArray.includes(flag.id)===true?
            <span className="mx-2 bg-white px-2 font-extrabold rounded-full text-black"
            onClick={()=>{
             let list =flagArray.filter(f=>f!==flag.id)
             setFlagArray(list)
             let skills=flagsData.filter(f=>list?.includes(f.id))
              setFlagas(`${skills.map(f=>f.name)}  `)
            }}
            >-
          </span>:
            <span className="mx-2 bg-white px-2 font-extrabold rounded-full text-black" >+
          </span>
          }
          
            </div>
           )) }
        </div>
        </div>
        :""
      
      }

        <textarea placeholder="description"
        className=" p-2 max-w-[100%] text-[20px] border h-50 rounded-lg" 
      //  type="string" 
        value={description}
        onChange={(e:React.ChangeEvent<HTMLTextAreaElement>)=>setDescription(e.target.value)}
        ></textarea>
        <button className={ ` ${loading?"!bg-blue-200":"!bg-blue-400"} hover:text-black`}>{
          loading===true?"Processing..":"Submit"
          }</button>
      </form>:

      <div className="flex mx-20 flex-wrap my-10">
      {
        allusers.map((user)=>(
          <div className="flex flex-col gap-3 border-1 p-8 rounded-2xl w-[30%] mx-5 h-[400px]">
            <div className=" m-3 h-[40%] w-[90%] ">
          <img className="w-[100%] h-[100%] rounded-3xl" src="/profetional-profile.jpeg"/>
            </div>
            <p className="text-3xl font-bold">{user.name}</p>
            <p className="text-2xl font-semibold">{user.email}</p>
            <p className="text-2xl font-medium">Experience :{user.experience}</p>
            <p className="w-fit h-fit bg-gray-600 p-3 text-xl rounded-xl cursor-pointer"
            onClick={()=>window.open(user.resumeUrl)}
            > View Resume
             </p>
            
          </div>
        ))
      }

      </div>
      }

    </div>
    <Footer/>
   </div>
   </>
  )
}

export default JobPosting