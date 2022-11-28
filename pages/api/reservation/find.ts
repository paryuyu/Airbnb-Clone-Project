import { NextApiHandler } from "next";
import dbConnect from '../../../lib/db_connect.js';
import reservation from '../../../lib/model/reservation'
type RstData = { result: Boolean; data?: string[], err?: Error }
const handler: NextApiHandler<RstData> = async (req, res) => {
    await dbConnect()
    
    try {
        let find = await reservation.find({});

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