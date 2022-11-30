
import accomodation from "../../../../lib/model/accomodation";
import dbConnect from '../../../../lib/db_connect.js';
import { NextApiHandler } from "next";

type RstData = { result: Boolean, err?: Error }
const handler: NextApiHandler<RstData> = async (req, res) => {
    await dbConnect()
    try {
        let del = await accomodation.deleteOne(req.query);

        if (del !== null) {
            return res.status(200).json({ result: true});
        } else {
            return res.status(500).json({ result: false })
        }

    } catch (err) {
        return res.status(500).json({ result: false })
    }
}

export default handler;