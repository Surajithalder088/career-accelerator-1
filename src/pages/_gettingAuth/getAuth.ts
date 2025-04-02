import axios from "axios"

const apiUrl =import.meta.env.VITE_API_URL

export const getAuth=async()=>{
    interface UserState{
        name:string;
        email:string;
        address:string;
        company:string;
        experience:string;
        id:string;
        isHR:boolean
    }

    
    const user=await axios.get(`${apiUrl}/api/user/credentials`,{withCredentials:true})
    console.log("verify user",user);
    
    if(user.status===500){
      console.log("unauthorized");
      console.log("failed verify user",user);
      let data={name:"",
        email:"",
        address:"",
        company:"",
        experience:"",
        id:"",
        isHR:false}
        console.log(data);
        
      return data
    }
    console.log(user);
    const authUser:UserState={
name:user.data.user.name,
email:user.data.user.email,
address:user.data.user.address,
company:user.data.user.company,
experience:user.data.user.experience,
id:user.data.user.id,
isHR:user.data.user.isHR,
    }
   return authUser;


}