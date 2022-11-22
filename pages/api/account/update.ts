

import { hash } from "bcryptjs";
import { NextApiHandler } from "next";
import dbConnect from "../../../lib/db_connect";
import user, { UserData } from "../../../lib/model/user";
type RstData = {result: Boolean; data?:UserData[], err?:Error}
const handler : NextApiHandler<RstData> =  async(req, res) =>{
  console.log(req.body,"!!!!!!!!!")
  await dbConnect()
    let {email, agreestate} = req.body;
//console.log(email)

    try{
        let updateData = await user.findOneAndUpdate({email:email},{AntiDiscrimination:agreestate},{new:true});
       // console.log(updateData,"dataFind")
        if(updateData !== null){
            return res.status(200).json({result:true, data:updateData});
        }else{
            return res.status(500).json({result:false})
        }
      
    }catch(err){
        return  res.status(500).json({result:false})
    }
}

export default handler;