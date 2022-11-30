
import accomodation from "../../../../lib/model/accomodation";
import dbConnect from '../../../../lib/db_connect.js';
import { NextApiHandler } from "next";
import { getToken, JWT } from "next-auth/jwt";
import reservation from "../../../../lib/model/reservation";

type RstData = { result: Boolean, err?: Error , data?:any[] }
const handler: NextApiHandler<RstData> = async (req, res) => {
    await dbConnect()
    const token = await getToken({ req }) as JWT;
    console.log(req.query)
    let {_id} =req.query
    
    try {
        let find = await reservation.find({productId:_id})

        console.log(find)
        if (find !== null) {
            return res.status(200).json({ result: true , data:find});
        } else {
            return res.status(500).json({ result: false })
        }

    } catch (err) {
        return res.status(500).json({ result: false })
    }
}

export default handler;