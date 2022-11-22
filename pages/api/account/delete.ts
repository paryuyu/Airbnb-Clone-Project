import { hash } from "bcryptjs";
import { NextApiHandler } from "next";
import dbConnect from "../../../lib/db_connect";
import user, { UserData } from "../../../lib/model/user";
type RstData = {result: Boolean; data?:UserData[], err?:Error}
const handler : NextApiHandler<RstData> =  async(req, res) =>{
  await dbConnect();
    let {email} = req.body;
console.log(email)

    try{
        let deleteEmail = await user.findOneAndDelete({email});
        console.log(deleteEmail,"dataFind")
        if(deleteEmail !== null){
            return res.status(200).json({result:true, data:deleteEmail});
        }else{
            return res.status(500).json({result:false})
        }
      
    }catch(err){
        return  res.status(500).json({result:false})
    }
}

export default handler;