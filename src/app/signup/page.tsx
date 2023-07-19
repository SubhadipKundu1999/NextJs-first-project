"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios, { Axios } from "axios";
import { set } from "mongoose";
import { toast } from "react-hot-toast";
import User from "@/models/userModel";

export default function SignUpPage() {
    //useRouter for routing
    const router = useRouter();

    // define a state to manipulate form data
    const form_data = {
        userName: "",
        email: "",
        password: ""
    }
    const [data, setData] = useState(form_data);

    // to manipulate submit button here is an another state
    const [buttonDisabled, setButtonDisabled] = useState(false);

    // handle loading before submition successful
    const[loading,setLoading]= useState(false);

    // handle submit functionality
    const onSubmit = async () => {
        try{
            setLoading(true);
         const response=  await axios.post("/Api/user/signup",data);
console.log("Signup success",response.data);
router.push("/login")
        }
        catch(error:any){
            console.log("Signup failedd", error.message)
toast.error(error.message);
        }
        finally{
            setLoading(false);
        }

    }


    // use Effect to updata button state when user is update

    useEffect(() => {
        if (data.email.length > 0 && data.password.length > 0 && data.userName.length > 0) {
            setButtonDisabled(false)
        }
        else {
            setButtonDisabled(true);
        }

    }, [data])

    return (

        <div className=" w-full min-fit  bg-black text-white  text-centerjustify-center py-16">

<h1>{loading ?"Loading": "signUp"}</h1>

            <div className="bg-white p-4 flex flex-col gap-6 text-center w-auto text-black max-w-sm mx-auto">
                <label htmlFor="userName  " className="w-full flex-col  items-center justify-center flex ">
                    UserName
                    <input type="text" name="userName" id="userName" className="px-2 py-2 border-2 border-black w-full" value={data.userName} onChange={(event) => {
                        setData({ ...data, userName: event.target.value })
                    }} />
                </label>
                <label htmlFor="email  " className="w-full flex-col items- justify-center flex"
                >
                    email
                    <input type="email" name="email" id="email" className="px-2 py-2 border-2 border-black w-full" value={data.email} onChange={(event) => {
                        setData({ ...data, email: event.target.value })
                    }} />
                 
                </label>
                <label htmlFor="password  " className="w-full  flex-col items-center justify-center flex">
                    Password
                    <input type="password" name="password" id="password" className="px-2 py-2 border-2 w-full border-black"
                        value={data.password} onChange={(event) => {
                            setData({ ...data, password: event.target.value })
                        }} />
                </label>

                <button className="rounded-full bg-black text-white px-4 py-2 max-w-fit mx-auto" onClick={onSubmit} disabled={buttonDisabled}>Submit</button>

                <h6>Already have an account  <Link className="text-blue-700" href="/login"> login</Link></h6>
            </div>
        </div>
    )

}