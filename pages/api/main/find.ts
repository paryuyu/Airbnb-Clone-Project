import { NextApiResponse } from 'next';
import { NextApiRequest } from 'next';
import { NextApiHandler } from 'next';
import accomodation from "../../../lib/model/accomodation";

async function handler(req:NextApiRequest,res:NextApiResponse) {
  console.log(req.query)
try{
  let found =  await accomodation.find(req.query).sort('-receipt').lean();
  console.log(found)
  if(found !==null){
    return res.status(200).json({result:true, data:found})
  }else{
    return res.status(500).json({result:false})
  }
}catch(err){
  return res.status(500).json({result:false})
}
 
}

export default handler;