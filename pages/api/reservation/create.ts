import { NextApiHandler } from "next";
import dbConnect from '../../../lib/db_connect.js';
import reservation from '../../../lib/model/reservation'
type RstData = { result: Boolean; data?: string[], err?: Error }
const handler: NextApiHandler<RstData> = async (req, res) => {
    await dbConnect()
    console.log(req.body)

    const one = req.body;
    try {


        //1. productId로 find -> 체크아웃이 들어오는 체크인보다 크고, 체크인이 체크아웃보다 작으면 막기.
        let findproductId = await reservation.find({
            productId:one.productId,
            checkout: {$gt:one.checkin },
            checkin: {$lt:one.checkout}
        }) as any[]

        console.log(findproductId,'find')

        //2. 데이터가 있으면 날짜가 겹치는거니까 데이터가 있으면 result false 없으면 데이터 생성
        if(findproductId.length > 0){
            //여기서 결제 취소코드가 들어가야함.
            res.status(422).json({ result: false });
            
        } else {
            let create = await reservation.create(req.body);
            res.status(200).json({ result: true, data: create });
        }
        
    } catch (err) {
        return res.status(500).json({ result: false })
    }
}

export default handler;