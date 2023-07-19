import { getDataFromToken } from "@/helpers/getdataFromToken";
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
connect();
export async function GET(request:NextRequest){
    try{

const curr_user_id = await getDataFromToken(request);

const curr_user= await User.findOne({_id:curr_user_id}).select("-password -isAdmin")

console.log(curr_user);
return NextResponse.json({
    message:"User notFound",
    curr_user:curr_user
})

    }
    catch(error:any){
        NextResponse.json({
            error:error.message
        },
        {
            status:500
        })
    }
}



