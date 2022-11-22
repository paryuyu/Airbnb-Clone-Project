import { NextApiHandler } from "next";
import dbConnect from "../../../lib/db_connect";
import accomodation, { floorPlanData } from "../../../lib/model/accomodation";
import dummy from "../../../lib/model/dummy";
import user, { UserData } from "../../../lib/model/user";
type RstData = { result: Boolean; data?: UserData[], err?: Error }
const handler: NextApiHandler<RstData> = async (req, res) => {
    await dbConnect()
    //fetch로 _id 찾아오고,
    //data-> groupType -> dummy -> Array를 찾자
    let { itemId, propertyType, privacyType, location, lng, lat, guest, bed, bedroom, bathroom } = req.body;

    try {
        if (itemId) {
            if (propertyType) {
                let find = await accomodation.findByIdAndUpdate({ _id: itemId }, { propertyType: propertyType }, { returnDocument: "after" });

                if (find) {
                    return res.status(200).json({ result: true, data: find });
                } else {
                    return res.status(500).json({ result: false })
                }

            } else if (privacyType) {
                let find = await accomodation.findByIdAndUpdate({ _id: itemId }, { privacyType: privacyType }, { returnDocument: "after" });

                if (find) {
                    return res.status(200).json({ result: true, data: find });
                } else {
                    return res.status(500).json({ result: false })
                }

            

            } else if (guest && bed && bedroom && bathroom) {
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

            }

        }
    } catch (err) {
        return res.status(500).json({ result: false })
    }
}

export default handler;