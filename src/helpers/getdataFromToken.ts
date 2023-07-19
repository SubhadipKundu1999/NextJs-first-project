import { NextRequest} from "next/server";
import Jwt  from "jsonwebtoken";

export const  getDataFromToken = async (request:NextRequest)=>{

    try{
const token =await request.cookies.get('token')?.value || '';
const decodeToken:any = await Jwt.verify(token, process.env.TOKEN_SECRET!);
return decodeToken.id;
    }

    catch(error:any){
        throw new Error(error.message);
       
    }
}