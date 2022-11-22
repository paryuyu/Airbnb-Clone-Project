import { hash } from "bcryptjs";
import { error } from "console";
import { NextApiHandler } from "next";
import dbConnect from "../../../lib/db_connect";
import user, { UserData } from "../../../lib/model/user";
type RstData = { result: Boolean; data?: UserData[], err?: Error }
const handler: NextApiHandler<RstData> = async (req, res) => {
    // console.log(req.body);
    await dbConnect()

    let hashingPass = await hash(req.body.password, 12);
    // console.log(hashingPass)
    let data = {
        email: req.body.email,
        password: hashingPass,
        marketingAgreeDate: req.body.marketingAgreeDate,
        privacyTermsAgreeDate: req.body.privacyTermsAgreeDate,
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        birthday: req.body.birthday,
        marketingAgreeState:req.body.marketingAgreeState,
        AntiDiscrimination:req.body.antiDiscrimination
    } as UserData

console.log(data,"data")
    try {
        let dataCreate = await user.create(data);
        console.log(dataCreate,"수정")
        if (dataCreate) {
            return res.status(200).json({ result: true, data: dataCreate })
        } else {
            return res.status(500).json({ result: false })
        }
    } catch (err) {
        return res.status(500).json({ result: false })
    }

}

export default handler;