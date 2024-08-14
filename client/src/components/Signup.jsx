import { useLocation } from "react-router-dom";
import { useState } from "react";
import {useNavigate} from 'react-router-dom'

import { toast } from 'react-toastify';

import axios from 'axios'
const Signup = () => {
  const navigate=useNavigate()
    const location = useLocation();
    const role = location.state?.role;
    const [email,setemail]=useState("");
    const [password,setpassword]=useState("");
    const[error,seterror]=useState(false)

    const HandleSubmit= async()=>{
      
      try{
        const res = await axios.post('http://localhost:3000/Login',{email,password,role});
        if ( email=="" || password==""){
          alert("fill all the fields ")
        }
        if (res.data.status=="success"){
          console.log(role)
          toast.success("Successfully logged in");
          if (role=="Principal"){
            navigate('/PrDash',{
              state: { role } 
            })
          }
          else if (role=="Teacher"){
            navigate('/TeachDash',{
              state: { role } 
            })
          }
          // else{
          //   navigate('/StudDash')
          // }
        }
        else if (res.data.status =="Password is incorrect"){
        
          toast.error("Password is incorrect");
        }

      }
      catch(error){
        toast.error("error Occurred")
        seterror(true)
        
      }
    }
  return (
    <div className=" justify-center items-center  md:m-20">
       
        <h1 className="text-white md:p-6 text-3xl p-4 md:text-4xl">You are Logging in as <span>{role}</span></h1>
        
        <div className="md:mx-80 r p-4 rounded-md bg-slate-300">
            <h1 className="font-bold text-2xl p-4">Login / SignUp</h1>
            <div className="p-2">
            <label>Email : </label>
            <input type="text" className="" onChange={((e)=>{setemail(e.target.value)})}/>
            </div>
            <div className="p-2">
            <label>Password : </label>
            <input type="text" onChange={((e)=>{setpassword(e.target.value)})}/>
            </div>
            <div className="m-4">
            <button className="bg-red-500 p-3 rounded-md text-white" onClick={HandleSubmit}>Submit</button>
            </div>
            
              {error && <span className="font-bold">You are not Registered User</span>}
              
        </div>
    </div>
  )
}

export default Signup