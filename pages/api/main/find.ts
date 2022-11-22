import { NextApiResponse } from 'next';
import { NextApiRequest } from 'next';
import { NextApiHandler } from 'next';
import accomodation from "../../../lib/model/accomodation";

async function handler(req:NextApiRequest,res:NextApiResponse) {

try{
  let found =  await accomodation.find({});
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