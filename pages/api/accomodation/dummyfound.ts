import { NextApiHandler } from "next";
import dummy from "../../../lib/model/dummy";
import { UserData } from "../../../lib/model/user";
import dbConnect from '../../../lib/db_connect.js';
type RstData = { result: Boolean; data?: UserData[], err?: Error }
const handler: NextApiHandler<RstData> = async (req, res) => {
await dbConnect();

    try {
        let dataFind = await dummy.find({});
        if (dataFind !== null) {
            return res.status(200).json({ result: true, data: dataFind });
        } else {
            return res.status(500).json({ result: false })
        }

    } catch (err) {
        return res.status(500).json({ result: false })
    }
}

export default handler;