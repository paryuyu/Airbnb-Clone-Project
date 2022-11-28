import { NextApiHandler } from "next";
import dbConnect from '../../../lib/db_connect.js';
import reservation from '../../../lib/model/reservation'
type RstData = { result: Boolean; data?: string[], err?: Error }
const handler: NextApiHandler<RstData> = async (req, res) => {
    await dbConnect()
    console.log(req.body)
    try {
        let create = await reservation.create(req.body);

        if (create !== null) {
            return res.status(200).json({ result: true, data: create });
        } else {
            return res.status(500).json({ result: false })
        }

    } catch (err) {
        return res.status(500).json({ result: false })
    }
}

export default handler;