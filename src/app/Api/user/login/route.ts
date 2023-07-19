import {connect} from "@/dbConfig/dbConfig"
import User from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server"; 
import bcryptjs from "bcryptjs";
import jwt from  "jsonwebtoken"
connect();

export async function POST(request:NextRequest){
    try{
       const reqBody = await request.json();
       const {email, password} = reqBody;
       const user = await User.findOne({email});

    //    check any user present or not by email information

       if(!user){
        return NextResponse.json({
            message: "Please enter valid email & password"
        });
        
       }
    //check password matched or not
   const passworMatched = await bcryptjs.compare(password,user.password); 
   if(!passworMatched){
    return NextResponse.json({
        message: "Please enter valid email & password"
    });
}
    // create token

    const tokenData ={
        id:user._id,
        userName:user.userName,
        email:user.email
    }
    const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:"1d"})

const response = NextResponse.json({
    message:"Login successful",
    success:true
})

// store token in cookie

response.cookies.set("token",token,
{
    httpOnly:true,
});
return response;
    }
    catch(error:any){

      return  NextResponse.json(
        {error:error.message},
        {status:500})

    }
}