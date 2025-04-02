import {  useState } from "react"
import { Footer } from "../../components/Footer/page"
import { toast } from "sonner"
import axios from "axios"
import { useNavigate } from "react-router-dom"



const SignupPaqge = () => {
  const navigate= useNavigate()

  const [optCheck,setOtpCheck]=useState(false)
  const [fullName,setFullName]=useState("")
   const [email,setEmail]=useState("")
      const [password,setPassword]=useState("")
      const[rPassword,setRPassword]=useState("")
      const [address,setAddress]=useState("")
      const [isHR,setIsHR]=useState(false)
      const [companyName,setCompanyName]=useState("")
      const[validName,setValidName]=useState(true)
 const[st,set1st]=useState("")
 const[nd,set2nd]=useState("")
 const[rd,set3rd]=useState("")
 const[th,set4th]=useState("")
 const [load,setLoad]=useState(false)

      

      const apiUrl =import.meta.env.VITE_API_URL
  
  const handleSubmit=async(e:React.FormEvent)=>{
      setLoad(true)
      e.preventDefault()
      if(!fullName.includes(" ")){
        setValidName(false)
        toast.error("give full name")
        return
      }
      setValidName(true)
      if(isHR===false){
        setCompanyName("notApplicable")
      }
      if(password!==rPassword){
        alert("password and confirm password not same")
        return
      }
     const res=await axios.post(`${apiUrl}/api/user/signup`,{
      name:fullName,
      email,password,address,isHR,company:companyName,experience:"notApplicable"
     },{withCredentials:true})
 console.log(res);
 
 
     if(res.status!==201){
      console.log("some error",res.data.response.data.message);
      alert(`${res.data.response.data.message}`)
      setLoad(false)
      return
     }


      setOtpCheck(true)

      
  
  }

  const otpSubmit=async()=>{
    try {
      const res=await axios.post(`${apiUrl}/api/user/otp`,{
        st,nd,rd,th,email
       },{withCredentials:true})

       console.log(res);

       if(res.status===200){
         navigate("/login")
       }
       

     
    } catch (error) {
      console.log(error);
      
    }
  }
  return (
    <div  className="flex flex-col justify-center text-white [@media(max-width:400px)]:max-w-screen  bg-gradient-to-tr from-black via-[rgb(104,52,164)] via-65% to-[rgb(31,30,30)] shadow-white min-h-screen w-full overflow-x-hidden">
            <div className="flex flex-col justify-center items-center">
               {optCheck?(
                <div className="flex w-fit center px-40 py-10 rounded-lg mt-6 flex-col items-center gap-4 justify-center shadow-[inset_0px_2px_20px_-3px_rgba(_255,_255,_255,1)]">
                  <p>Check your Email</p>
                  <p>OTP has been send!</p>
                  <div className="flex items-center justify-around gap-5">
                    <input className="w-14 h-10 border rounded-2xl p-4"
                    value={st}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>set1st(e.target.value)}
                    />
                    <input className="w-14 h-10 border rounded-2xl p-4"
                    value={nd}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>set2nd(e.target.value)}
                    />
                    <input className="w-14 h-10 border rounded-2xl p-4"
                    value={rd}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>set3rd(e.target.value)}
                    />
                    <input className="w-14 h-10 border rounded-2xl p-4"
                    value={th}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>set4th(e.target.value)}
                    />
                  </div>
                  <button className="!bg-green-400"
                  onClick={otpSubmit}
                  >Submit</button>

                  <p className="text-center font-mono cursor-pointer">Resend otp</p>

                </div>
               )
               :
               ( <form className="flex w-fit center px-40 py-10 rounded-lg mt-6 flex-col items-center gap-4 justify-center shadow-[inset_0px_2px_20px_-3px_rgba(_255,_255,_255,1)]"
                onSubmit={handleSubmit}
                >
                    <p className="font-bold text-lg">Register</p>
                    <input className=" p-2 max-w-[100%] border rounded-lg" 
                    type="text" placeholder="Full name"
                    value={fullName}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setFullName(e.target.value)}/>
                    {
                      !validName?(<p className="text-red-600">there should be space between name and surname</p>):""
                      }
                    <input className=" p-2 max-w-[100%] border rounded-lg" 
                    type="email" placeholder="email"
                    value={email}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setEmail(e.target.value)}/>
                    <input className=" p-2 max-w-[100%] border rounded-lg"
                     type="password" placeholder="password"
                     value={password}
                     onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setPassword(e.target.value)}/>
                    <input className=" p-2 max-w-[100%] border rounded-lg"
                     type="password" placeholder="confirm password"
                     value={rPassword}
                     onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setRPassword(e.target.value)}/>
                     <div className="flex gap-2 items-center ">
                      <p>Are you recruiter</p>
                     <input onChange={()=>setIsHR(!isHR)} type="checkbox"
                     className="w-6 h-6"
                     /></div>
                     
                     {
                      isHR &&<input className=" p-2 max-w-[100%] border rounded-lg"
                     type="text" placeholder="Your Company name"
                     value={companyName}
                     onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setCompanyName(e.target.value)}/>
                     }
                      
                      <textarea className=" p-2 max-w-[100%] border h-30 rounded-lg"
                      placeholder="address"
                     value={address}
                     onChange={(e:React.ChangeEvent<HTMLTextAreaElement>)=>setAddress(e.target.value)}></textarea>
                    <button className="!bg-blue-400">
                      {load?"running...":
                      "signup"}
                      </button>
                    <p>Already have acount? <a href="/login">login</a></p>
                </form>)
}
                 <Footer/>
            </div>
        </div>
  )
}

export default SignupPaqge