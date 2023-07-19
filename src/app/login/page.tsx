"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios, { Axios } from "axios";
import { toast } from "react-hot-toast";
import User from "@/models/userModel";
export default function LoginPage(){
    // require router
    const router = useRouter();

    // handling loading
    const [loading,setLoading] = useState(false);

// handle form data
const form_data={
    email:"",
    password:""
}
 const[data,setData]= useState(form_data);

    // handle login
    const onLogin= async ()=>{
        try{
            setLoading(true);
            const response=  await axios.post("/Api/user/login",data);
   console.log("login success",response.data);
   toast.success("Log in sucess");
   router.push("/profile")

        }
        catch(error:any){
            console.log("Signup failedd", error.message)
toast.error(error.message);
        }
        finally{
            setLoading(false);
        }

    }
    // button manipulation
    const [disable,setDisable]= useState(false)

// handle button disable
useEffect(()=>{
    if(data.email.length>0 && data.password.length>0 ){
        setDisable(false)
    }
    else{
        setDisable(true);
    }

},[data])


    return(

<div className=" w-full min-fit h-100vh bg-black text-white justify-center py-16">

    <h1>{loading?"loading":"Signup"}</h1>

    <div className="bg-white p-4 flex flex-col gap-6 text-center items-center justify-center w-auto text-black max-w-sm mx-auto">
        <label htmlFor="email  " className="w-full flex-col items-center justify-center flex"
    >
        email
        <input type="email" name="email" id="email" placeholder="enter Email" className="px-2 py-2 border-2 border-black w-full"  value={data.email} onChange={(event)=>{
            setData({...data, email:event.target.value})
        }}/>
        </label>
        <label htmlFor="password  " className="w-full  flex-col items-center justify-center flex">
        User name
        <input type="password" name="password" placeholder="Enter Password" id="password" className="px-2 py-2 border-2 w-full border-black" 
         value={data.password} onChange={(event)=>{
            setData({...data, password:event.target.value})
        }}/>
        </label>

        <button className="rounded-full bg-black text-white px-4 py-2 max-w-fit mx-auto"  disabled={disable} onClick={onLogin}>Login</button>
       
<h6>Already have an account  <Link className="text-blue-700" href="/signup"> signup</Link></h6>
    </div>
</div>
    )

}