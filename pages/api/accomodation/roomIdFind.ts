import { NextApiHandler } from "next";
import dbConnect from "../../../lib/db_connect";
import accomodation from "../../../lib/model/accomodation";
import dummy from "../../../lib/model/dummy";
import user, { UserData } from "../../../lib/model/user";
type RstData = {result: Boolean; data?:UserData[], err?:Error}
const handler : NextApiHandler<RstData> =  async(req, res) =>{
    await dbConnect()
    let {_id} = req.body;

    try{
        let dataCreate = await accomodation.findById(_id);
        console.log(dataCreate)
        if(dataCreate){
            return res.status(200).json({result:true, data:dataCreate});
        }else{
            return res.status(500).json({result:false})
        }
      
    }catch(err){
        return  res.status(500).json({result:false})
    }
}

export default handler;