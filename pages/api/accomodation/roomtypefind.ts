import { NextApiHandler } from "next";
import { getToken, JWT } from "next-auth/jwt";
import dbConnect from "../../../lib/db_connect";
import accomodation from "../../../lib/model/accomodation";
import dummy from "../../../lib/model/dummy";
import user, { UserData } from "../../../lib/model/user";
type RstData = { result: Boolean; data?: UserData[], err?: Error }
const handler: NextApiHandler<RstData> = async (req, res) => {
await dbConnect()
    //fetch로 _id 찾아오고,
    //data-> groupType -> dummy -> Array를 찾자
    let { itemId } = req.body;
    const token = await getToken({ req }) as JWT;

    try {
        switch (req.method) {
            case "POST":
                let dataFind = await accomodation.findById({ _id: itemId });
                if (dataFind !== null) {
                    let find = await dummy.findOne({ groupType: dataFind.groupType });
                    return res.status(200).json({ result: true, data: find });
                } else {
                    return res.status(500).json({ result: false })
                }
                break;
            case "GET":
                let find = await accomodation.find({ email: token.email});
                console.log(find)
                if (find !== null) {
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