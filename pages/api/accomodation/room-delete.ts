
import { NextApiHandler } from "next";
import dbConnect from "../../../lib/db_connect";
import accomodation from "../../../lib/model/accomodation";

type RstData = {result: Boolean; err?:Error}
const handler : NextApiHandler<RstData> =  async(req, res) =>{
    await dbConnect()
    let {id} = req.query;
    try{
        let dataDel = await accomodation.deleteOne({_id:id});
       
        if(dataDel){
            return res.status(200).json({result:true});
        }else{
            return res.status(500).json({result:false})
        }
      
    }catch(err){
        return  res.status(500).json({result:false})
    }
}

export default handler;