import { NextApiHandler } from "next";
import accomodation, { floorPlanData } from "../../../lib/model/accomodation";
import dummy from "../../../lib/model/dummy";
import user, { UserData } from "../../../lib/model/user";
import dbConnect from '../../../lib/db_connect.js';
type RstData = { result: Boolean; data?: UserData[], err?: Error }
const handler: NextApiHandler<RstData> = async (req, res) => {
    await dbConnect();
    let { itemId, guest, bed, bedroom, bathroom } = req.body;

    try {
              console.log("????")
                let floorPlan = {
                    guest: guest,
                    bed: bed,
                    bedroom: bedroom,
                    bathroom: bathroom
                } as floorPlanData

                let find = await accomodation.findByIdAndUpdate({ _id: itemId }, {floorPlan:floorPlan }, { returnDocument: "after" });

                if (find) {
                    return res.status(200).json({ result: true, data: find });
                } else {
                    return res.status(500).json({ result: false })
                }



    
    } catch (err) {
        return res.status(500).json({ result: false })
    }
}

export default handler;