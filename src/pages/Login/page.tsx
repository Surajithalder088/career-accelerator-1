import { useState } from "react"
import { Footer } from "../../components/Footer/page"

import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useDispatch } from "react-redux"
import { login } from "../../store/userSlice"
const apiUrl =import.meta.env.VITE_API_URL


const LoginPage = () => {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const[rPassword,setRPassword]=useState("")
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const [load,setLoad]=useState(false)

const handleSubmit=async(e:React.FormEvent)=>{
    e.preventDefault()
    console.log(email,password,rPassword);
    if(password !==rPassword){
        alert("password and confirm password not same")
        return
    }
    setLoad(true)
    const res=await axios.post(`${apiUrl}/api/user/login`,{
        
        email,password,
       },{withCredentials:true})
   console.log(res);
   
       if(res.status!==200){
        console.log("some error",res);

        if(res.status=== 403){
        console.log("otp is not verified",res);
        alert("otp is not verified")
        navigate("/signup")
       }
       return
       }

        
       
       
        const user=await axios.get(`${apiUrl}/api/user/credentials`,{withCredentials:true})
        if(user.status!==200){
          console.log("unauthorized");
          return
        }
        console.log(user);
        const authUser={
    name:user.data.user.name,
    email:user.data.user.email,
    address:user.data.user.address,
    company:user.data.user.company,
    experience:user.data.user.experience,
    id:user.data.user.id,
    isHR:user.data.user.isHR,
        }
        dispatch(login(authUser))
        navigate("/dashboard")
    

}


  return (
    <div  className="flex flex-col justify-center text-white [@media(max-width:400px)]:max-w-screen  bg-gradient-to-tr from-black via-[rgb(104,52,164)] via-65% to-[rgb(31,30,30)] shadow-white min-h-screen w-full overflow-x-hidden">
        <div className="flex flex-col justify-center items-center">
            <form className="flex w-fit center px-40 py-20 rounded-lg  flex-col items-center gap-4 justify-center shadow-[inset_0px_2px_20px_-3px_rgba(_255,_255,_255,1)]"
            onSubmit={handleSubmit}
            >
                <p className="font-bold text-lg">Login</p>
                <input className=" p-2 max-w-[100%] border rounded-lg" 
                type="email" placeholder="email"
                value={email}
                onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setEmail(e.target.value)}
                />
                <input className=" p-2 max-w-[100%] border rounded-lg"
                 type="password" placeholder="password"
                 value={password}
                onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setPassword(e.target.value)}/>
                <input className=" p-2 max-w-[100%] border rounded-lg"
                 type="password" placeholder="confirm password"
                 value={rPassword}
                onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setRPassword(e.target.value)}/>
                <button className="!bg-blue-400">
                   { load?"running..":
                   "login"}
                    </button>
                <p>New user ? <a href="/signup">Register</a></p>
            </form>
            <p className=" mx-20 text-green-500"> NOTE*  --for dummy testing : email - buddhiswarh597@gmail.com password- 123456</p>
             <Footer/>
        </div>
    </div>
  )
}

export default LoginPage