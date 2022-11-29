import { NextApiHandler } from "next";
import dbConnect from '../../../lib/db_connect.js';
import { getToken, JWT } from "next-auth/jwt";
import reservation from '../../../lib/model/reservation'
import { METHODS } from "http";
type RstData = { result: Boolean; data?: any[], err?: Error }
const handler: NextApiHandler<RstData> = async (req, res) => {
    await dbConnect()
    //그냥 여행 find는 이메일로 찾아야함. (그러네...)
    console.log(req.method)
    switch (req.method) {
        case 'GET':
            const token = await getToken({ req }) as JWT;
            let find = await reservation.find({ guestEmail: token.email }).populate('product').sort('-reservationTime').lean();

            console.log(find)
            if (find !== null) {
                return res.status(200).json({ result: true, data: find });
            } else {
                return res.status(500).json({ result: false });
            }
           
        case 'POST':
            let { productId } = req.body;
            let productFind = await reservation.find({ productId: productId },
                "checkin checkout");
            console.log(productFind)

            return res.status(201).json({ result: true, data: productFind });

    }



}

export default handler;