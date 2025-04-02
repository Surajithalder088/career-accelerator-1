import { useEffect, useState } from "react"
import { Footer } from "../../components/Footer/page"
import Navbar from "../../components/Navbar/page"
import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "../_gettingAuth/getAuth";
import { login } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { RootState } from "../../store/store";

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


const JobPosting = () => {
  const [title,setTitle]=useState("")
  const [salary,setSalary]=useState("")
  const [experience,setExperience]=useState("")
  const [description,setDescription]=useState("")
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
             navigate('/login')
           }
         
         }else{
           navigate('/login')
         }
      
    } catch (error) {
      navigate('/login') 
    }
       
     }

 useEffect(() => {

   authFetching()

  
 }, [])

  const handleSubmit=async(e:React.FormEvent)=>{
    e.preventDefault()
    console.log(title,salary,experience,description);
   const address=user.address
   const company=user.company
   const userId=user.id

   const res=await axios.post(`${apiUrl}/api/jobs/new-post`,{
    title,salary,address,company,experience,description,userId
   },{withCredentials:true})

   console.log(res);
   if(res.status!==201){
    alert("failed")
    return
   }
   alert(res.data.message)
   navigate('/dashboard')
   
    

}


  return (
   <>
   <div className="flex flex-col justify-center text-white [@media(max-width:400px)]:max-w-screen  bg-gradient-to-tr from-black via-[rgb(104,52,164)] via-65% to-[rgb(31,30,30)] shadow-white min-h-screen w-full overflow-x-hidden">
    <Navbar/>
    <div className="mx-40 mt-30 [@media(max-width:400px)]:mx-2 [@media(max-width:400px)]:px-2 ">
      <div className=" text-[27px] mt-6 font-bold">Post new job or internship</div>
      <form className="flex flex-col mx-20 gap-5" 
      onSubmit={handleSubmit}
      >
        <p className="text-[30px] font-bold mt-10">{user.company}</p>
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
        <textarea placeholder="description"
        className=" p-2 max-w-[100%] text-[20px] border h-50 rounded-lg" 
      //  type="string" 
        value={description}
        onChange={(e:React.ChangeEvent<HTMLTextAreaElement>)=>setDescription(e.target.value)}
        ></textarea>
        <button className=" !bg-blue-400 hover:text-black">Submit</button>
      </form>
    </div>
    <Footer/>
   </div>
   </>
  )
}

export default JobPosting