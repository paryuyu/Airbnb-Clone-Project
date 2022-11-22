import { NextApiHandler } from "next";
import accomodation, { floorPlanData } from "../../../lib/model/accomodation";
import user, { UserData } from "../../../lib/model/user";
import dbConnect from '../../../lib/db_connect.js'
type RstData = { result: Boolean; data?: UserData[], err?: Error }
const handler: NextApiHandler<RstData> = async (req, res) => {
    await dbConnect();
    console.log(req.body, 'body')
    let { itemId } = req.body;
    let { ameinty } = req.body;
    try {

        let find = await accomodation.findByIdAndUpdate({ _id: itemId }, { amenities: ameinty }, { returnDocument: "after" });

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