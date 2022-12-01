import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import formidable from "formidable";
import { NextApiHandler, NextApiRequest, NextApiResponse, NextConfig } from "next";
import { firebaseApp } from '../../../lib/firebase-config'
import fs from 'fs'
import accomodation from "../../../lib/model/accomodation";
import { arrayBuffer } from "stream/consumers";
import { resolve } from "path";
import { rejects } from "assert";
import dbConnect from "../../../lib/db_connect";
//multipart는 config를 바꿔서 사용해야함.
export const config: NextConfig = {
    api: { bodyParser: false },
}
//포스트타입이면 바디를 알아서 파싱을 해주는데. multipart로 보낸 formdata는 저게 먹으면 안돼서 수동으로 해줘야함.

/** multipart form-data parser는 기본 내장이 안되어있어서 추가설정을 해줘야함.
 * formidable -> parsing 라이브러리를 설정해서 파일부분만 추출해줄거임.
  */


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect()

    console.log(req.body)
    console.log('--------upload files')

    let uriArr: string[] = [];
    const form = formidable({ multiples: true }); //multiples:true 이걸 해주면 배열로 여러개 다 나옴 // 기본이 false여서 아무것도 안해주면 하나만 나옴

    //콜백펑션임

    const result = await new Promise((resolve, reject) => {

        form.parse(req, async (err, fields, files) => {
            resolve({
                itemId: fields.itemId as string,
                photos: files.photos as formidable.File[]
            })

            if (err) {
                return console.log('errrrrr-----', err)
            }

            //핵심코드
            let storage = getStorage(firebaseApp);
            const dirRef = ref(storage, 'hosting/' + fields.itemId);

            if (Array.isArray(files.photos)) {

                for (let one of files.photos as formidable.File[]) {
                    const fileRef = ref(dirRef, one.newFilename);
                    // 여기서 one은 파일 정보를 담고있는거지 파일은 아니라서 fs를 사용해서 파일로 만들어줄거임 (filepath가 실제 파일이 있는 곳.)
                    const file = fs.readFileSync(one.filepath);
                    //console.log(file)
                    //file로 바꿔주는건 fs -> readFileSync

                    //firebase에 업로드
                    let rst = await uploadBytes(fileRef, file, { contentType: one.mimetype! }) //content type을 설정을 안해주면 파일로 업로드되고, 이미지(mimetype->jpeg)를 업로드하면 이미지로 업로딩된다.(근데 이건 )
                    //다운로드 가능한 링크
                    let url = await getDownloadURL(fileRef);
                    uriArr.push(url);
                    resolve({
                        result:true, datas: [uriArr] 
                    })
                }

            } else {
                const fileRef = ref(dirRef, files.photos.newFilename);
                    // 여기서 one은 파일 정보를 담고있는거지 파일은 아니라서 fs를 사용해서 파일로 만들어줄거임 (filepath가 실제 파일이 있는 곳.)
                    const file = fs.readFileSync(files.photos.filepath);
                    //console.log(file)
                    //file로 바꿔주는건 fs -> readFileSync
                console.log(files, fields)
                let rst = await uploadBytes(fileRef, file, { contentType: files.photos.mimetype! }) //content type을 설정을 안해주면 파일로 업로드되고, 이미지(mimetype->jpeg)를 업로드하면 이미지로 업로딩된다.(근데 이건 )
                //다운로드 가능한 링크
                let url = await getDownloadURL(fileRef);
                uriArr.push(url)
                resolve({
                    result:true, datas: uriArr
                })

            }

            //files{photos[filepath,filepath]}
            if (uriArr.length !== 0) {
                const update = await accomodation.findByIdAndUpdate({ _id: fields.itemId }, { Photos: uriArr , step:7 }, { returnDocument: 'after' })
                if (update) {
                } else {
                    return res.status(500).json({ result: false });
                }
            }
            return res.status(200).json({});


        })




    })
    //console.log(update)


}
