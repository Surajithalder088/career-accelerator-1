import { useEffect, useState } from "react"
import {CA} from "../CALogo/Calogo"
import { Menu, X } from "lucide-react"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"

interface UserState{
    name:string;
    email:string;
    address:string;
    company:string;
    experience:string;
    id:string;
    isHR:boolean
  }

const Navbar = () => {

    const [status,setStatus] = useState("") // eslint-disable-line @typescript-eslint/no-unused-vars
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const user:UserState=useSelector((state:RootState)=>state.user)

        useEffect(() => {
            if(user.id!==""){
               setStatus("authenticated") 
            }
          
        }, [user])
        
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }
  return (
    <div> <div className="fixed top-0 [@media(max-width:400px)]:w-screen  left-0 right-0 z-50">
    <div className="flex justify-between items-center mx-4 md:mx-10 lg:mx-30 my-4 p-4 md:p-6 rounded-2xl gap-x-2 bg-[rgba(255,255,255,0.2)] backdrop-blur-sm shadow-[inset_0px_2px_20px_-3px_rgba(_255,_255,_255,1)]">
        <div className="text-2xl md:text-3xl font-semibold flex items-center">
           <CA />
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-x-6 lg:gap-x-10 items-center text-white">
            <a href={'/'} className="hover:!text-black hover:!text-[20px] !text-white text-[20px] p-1 rounded-lg hover:shadow-[inset_2px_2px_20px_-3px_rgba(_255,_255,_255,1)]">Home</a>
            <a href={'/search-for-jobs'} className="hover:!text-black hover:!text-[20px] !text-white text-[20px]  p-1 rounded-lg hover:shadow-[inset_2px_2px_20px_-3px_rgba(_255,_255,_255,1)]">Search for Jobs</a>
            <a href={'/start-hiring'} className="hover:!text-black hover:!text-[20px] !text-white text-[20px]  p-1 rounded-lg hover:shadow-[inset_2px_2px_20px_-3px_rgba(_255,_255,_255,1)]">Start Hiring</a>
        </div>
        
        {/* Conditional Login / Dashboard Button */}
        <div className="hidden md:block">
            {status === "authenticated" ? (
                <a href={'/dashboard'}>
                    <button className="text-sm py-4 px-6 lg:py-6 lg:px-9 !bg-blue-400 rounded-xl text-white hover:font-bold hover:text-black flex gap-x-2 border shadow-[inset_0px_5px_20px_-3px_rgba(_255,_255,_255,1)]">
                        Dashboard
                    </button>
                </a>
            ) : (
                <a href={'/login'}>
                    <button className="text-sm py-4 px-6 lg:py-6 lg:px-9 !bg-blue-400 rounded-xl text-white hover:text-black flex gap-x-2 border shadow-[inset_0px_5px_20px_-3px_rgba(_255,_255,_255,1)]">
                        Login
                    </button>
                </a>
            )}
        </div>
        
        {/* Mobile Menu Button */}
        <button 
            className=" sm:hidden [@media(max-width:400px)]:!bg-transparent "
            onClick={toggleMenu}
        >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
    </div>
    
    {/* Mobile Navigation */}
    {isMenuOpen && (
        <div className="md:hidden bg-[rgba(30,30,30,0.95)] backdrop-blur-sm text-white p-4 flex flex-col space-y-4 rounded-b-xl mx-4">
            <a 
                href={'/'}
                className="py-2 px-4 hover:bg-[rgba(255,255,255,0.1)] rounded-lg"
                onClick={() => setIsMenuOpen(false)}
            >
                Home
            </a>
            <a 
                href={'/search-for-jobs'}
                className="py-2 px-4 hover:bg-[rgba(255,255,255,0.1)] rounded-lg"
                onClick={() => setIsMenuOpen(false)}
            >
                Search for Jobs
            </a>
            <a 
                href={'/start-hiring'}
                className="py-2 px-4 hover:bg-[rgba(255,255,255,0.1)] rounded-lg"
                onClick={() => setIsMenuOpen(false)}
            >
                Start Hiring
            </a>

            {/* Mobile version of Login / Dashboard button */}
            {status === "authenticated" ? (
                <a href={'/dashboard'} onClick={() => setIsMenuOpen(false)}>
                    <button className="w-full py-3 !bg-[rgb(149,126,234)] rounded-xl text-white hover:text-black border shadow-[inset_0px_5px_20px_-3px_rgba(_255,_255,_255,1)]">
                        Dashboard
                    </button>
                </a>
            ) : (
                <a href={'/login'} onClick={() => setIsMenuOpen(false)}>
                    <button className="w-full py-3 !bg-[rgb(149,126,234)] rounded-xl text-white hover:text-black border shadow-[inset_0px_5px_20px_-3px_rgba(_255,_255,_255,1)]">
                        Login
                    </button>
                </a>
            )}
        </div>
    )}
</div></div>
  )
}

export default Navbar