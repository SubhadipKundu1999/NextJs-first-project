"use client";
import { useRouter } from "next/navigation"
import axios from "axios"
import { useEffect, useState } from "react";


export default function ProfilePage(){

    const[userData,setuserData]= useState("nothing")

    useEffect( ()  =>{
const getUser = async ()=>{
    const user:any = await axios.get("/Api/user/currentUser");
   setuserData(user.data.curr_user.userName!)
}
getUser();

    },[])
    const router= useRouter()
    const  handleLogout= async ()=>{
        try{

            const response = await axios.get("/Api/user/logout");
            console.log("login success",response.data);
            
           router.push("/login");
        }
        catch(error:any){
        console.log(error)
        }
        


    }
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="rounded p-2 bg-green-400 text-white">{userData}</h1>
            <h1>Profile</h1>
            <hr />
            <p>Profile Page</p>
<button onClick={handleLogout}>Logout</button>
        </div>
    )
    }
