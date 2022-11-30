import { NextApiResponse } from 'next';
import { NextApiRequest } from 'next';
import { NextApiHandler } from 'next';
import { factory } from 'typescript';
import accomodation from "../../../lib/model/accomodation";

async function handler(req:NextApiRequest,res:NextApiResponse) {
 let {category, publish} = req.query;
 let {_id} = req.body;
try{


switch(req.method){
 case 'GET':
  if(publish && category !== 'all'){
    let found =  await accomodation.find({publish:true,$or:[{"amenities.facilities":category},{"amenities.special":category},{"amenities.safty":category}]}).sort('-receipt').lean();
    
  console.log(found)
  if(found !==null){
    return res.status(200).json({result:true, data:found})
  }else{
    return res.status(500).json({result:false})
  }

  }else if(publish && category === 'all'){
    let found =  await accomodation.find({publish:true}).sort('-receipt').lean();

    if(found !==null){
      return res.status(200).json({result:true, data:found})
    }else{
      return res.status(500).json({result:false})
    }
  }
  case 'POST':
    let found =  await accomodation.find({_id:_id}).lean();

    if(found !==null){
      return res.status(200).json({result:true, data:found})
    }else{
      return res.status(500).json({result:false})
    }
}
  
  








}catch(err){
  return res.status(500).json({result:false})
}
 
}

export default handler;