import { NextApiHandler } from "next";
import accomodation from "../../../lib/model/accomodation";
import user, { UserData } from "../../../lib/model/user";
import dbConnect from '../../../lib/db_connect.js';
type RstData = { result: Boolean; data?: UserData[], err?: Error }
const handler: NextApiHandler<RstData> = async (req, res) => {
  await dbConnect();
  //fetch로 _id 찾아오고,
  //data-> groupType -> dummy -> Array를 찾자
  let { itemId } = req.query;
  let {description} = req.body;
  console.log(req.body)
  console.log(itemId)
  try {
    let find = await accomodation.findByIdAndUpdate({_id:itemId},{ description:description},{returnDocument:'after'});

        if (find !== null) {
          return res.status(200).json({ result: true, data: find });
        } else {
          return res.status(500).json({ result: false })
        }
  
     
    

  } catch (err) {
    return res.status(500).json({ result: false })
  }
}

export default handler;