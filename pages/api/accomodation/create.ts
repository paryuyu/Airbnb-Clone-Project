import { NextApiHandler } from "next";
import { getToken, JWT } from "next-auth/jwt";
import accomodation from "../../../lib/model/accomodation";
import dummy from "../../../lib/model/dummy";
import user, { UserData } from "../../../lib/model/user";
import dbConnect from '../../../lib/db_connect.js';
type RstData = { result: Boolean; data?: UserData[], err?: Error }
const handler: NextApiHandler<RstData> = async (req, res) => {
    await dbConnect()
    const token = await getToken({ req }) as JWT;
    let { groupType } = req.body;

    try {
        let dataCreate = await accomodation.create({ groupType: groupType, email: token.email });

        if (dataCreate !== null) {
            return res.status(200).json({ result: true, data: dataCreate });
        } else {
            return res.status(500).json({ result: false })
        }

    } catch (err) {
        return res.status(500).json({ result: false })
    }
}

export default handler;