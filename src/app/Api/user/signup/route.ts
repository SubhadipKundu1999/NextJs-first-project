import {connect} from "@/dbConfig/dbConfig"
import User from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server"; 
import bcryptjs from "bcryptjs"

connect();

export async function POST(request:NextRequest) {

    try{
      const reqBody=  await request.json();
      const {userName,email,password}= reqBody;
      console.log(reqBody);

//find user 
    const user=  await User.findOne({email});
    
    if(user){
        return NextResponse.json({
            error:"User already exist"},{status:400}
        )
    }
        // hash password
        const saltRounds=10;
      const salt = await bcryptjs.genSalt(saltRounds);
      const hasedpassword = await bcryptjs.hash(password,salt);
      console.log(hasedpassword);
//generate new user
      const newUser =  await new User({
        userName,
        email,
        password:hasedpassword
      })
      console.log("done till now")
      console.log(newUser);
//save new user
      const savedUser= await newUser.save()
      console.log(savedUser);
      //return 

      return NextResponse.json(
    {
       message:"User created sucessfully",
       success:true,
       savedUser
    })

        
        }
    

    


    catch(error: any){
return NextResponse.json({error:error.message},
    {status:500}
    )
    }
}