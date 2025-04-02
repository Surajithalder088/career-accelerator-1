import { useEffect } from "react"
import { FeatureSection } from "./components/FeaturesSection/page"
import { Footer } from "./components/Footer/page"
import HeroSection from "./components/HeroSection/page"
import Navbar from "./components/Navbar/page"
import ScrollAnimation from "./components/ScrollAnimation/page"
import { SocialSection } from "./components/SocialSection/page"
import { SupportSection } from "./components/SupportSection/page"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "./store/store"
import { getAuth } from "./pages/_gettingAuth/getAuth"
import { login } from "./store/userSlice"

interface UserState{
  name:string;
  email:string;
  address:string;
  company:string;
  experience:string;
  id:string;
  isHR:boolean
}


function App() {
  const user=useSelector((state:RootState)=>state.user)
  const dispatch=useDispatch()

  
   const authFetching=async()=>{
        
        const authUser:UserState=await getAuth()
            if(authUser.name!==""){
            dispatch(login(authUser))
            
          
          }
      }
  
  useEffect(() => {
  
        authFetching()
     
     }, [user])

  useEffect(() => {
 console.log("auth user is :",user);
 
   
  }, [])
  
  

  return (
    <>
    <section  className="flex flex-col justify-center text-white [@media(max-width:400px)]:max-w-screen  bg-gradient-to-tr from-black via-[rgb(104,52,164)] via-65% to-[rgb(31,30,30)] shadow-white min-h-screen w-full overflow-x-hidden">
    <Navbar/>
    <HeroSection/>
    <ScrollAnimation/>
    <FeatureSection/>
    <SocialSection/>
    <SupportSection/>
    <Footer/>
 
    </section>
    
    </>
  )
}

export default App
