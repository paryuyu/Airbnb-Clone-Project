import { AccomodationData } from './../../../lib/model/accomodation';
import { NextApiHandler } from "next";
import accomodation, { floorPlanData } from "../../../lib/model/accomodation";
import dbConnect from '../../../lib/db_connect.js'
type RstData = { result: Boolean; data?: AccomodationData, err?: Error }
const handler: NextApiHandler<RstData> = async (req, res) => {
  await dbConnect();

  console.log(req.body, 'body')
  console.log(req.query,'query')

  
  try {
    if(req){
      let find = await accomodation.findByIdAndUpdate(req.query, req.body, { returnDocument: "after" });
      if (find) {
        return res.status(200).json({ result: true, data: find });
      } else {
        return res.status(500).json({ result: false })
      }
    }
      
    

  } catch (err) {
    return res.status(500).json({ result: false })
  }
}

export default handler;