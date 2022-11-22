import { Button, Typography } from "@mui/material";

import { Box } from "@mui/system";
import { useRef, useState } from "react";
import EmptyPhotos from "../../../components/ui/photos/emptyPhoto";
import PreviewPhotoBox from "../../../components/ui/photos/previewPhotosBox";
import { useRouter } from "next/router";

import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { firebaseApp } from "../../../lib/firebase-config";
import { uuidv4 } from "@firebase/util";

function Photos() {
    const [files, setFiles] = useState<File[]>([])
    const [draging, setDraging] = useState(false)
    const fileRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const { itemId } = router.query;
    const [loading,setLoading] = useState(false);

    const NextHandle = async () => {
        setLoading(true)
        const formData = new FormData();
        formData.append('itemId', itemId as string);

        files.forEach((one) => {
            formData.append('photos', one)
        })
        const res = await fetch('/api/accomodation/uploadPhotos', {
            method: 'post',
            body: formData,
            // headers:{'Content-type':'multipart/form-data'} //얘 설정해주면 에러 터짐
        })
        if(res.ok){
            router.push('/become-a-host/' + itemId + '/title')
            setLoading(false)
        }
    }


    const handleFile = (file: File[]) => {
        setFiles(file)
    }



    const BackHandle = () => {
        router.push('/become-a-host/' + itemId + '/amenities')
    }


    const removeFile = (t: File) => {
        setFiles((current) => {
            return current.filter(one => one !== t)
        })
    }

    return (
        <>
            <Box sx={{ ...outlineBox }}>
                <Typography sx={{ fontSize: 30, fontWeight: 'bold', mb: 2 }}>아파트 사진 추가하기</Typography>
                <Typography sx={{ fontSize: 15, color: 'grey', mb: 5 }}>숙소 등록을 시작하려면 사진 5장을 제출하셔야 합니다. 나중에 추가하거나 변경하실 수 있습니다.</Typography>

                {files.length == 0 ?
                    <EmptyPhotos onFile={handleFile} /> :
                    <PreviewPhotoBox target={files} onFile={handleFile} onDel={removeFile} />
                }

            </Box>
            <Box sx={{ ...buttonBox }}>
                <Button variant="contained" sx={{ ...button }} onClick={BackHandle}>뒤로</Button>
                <Button variant="contained" sx={{ ...button }} disabled={loading} onClick={NextHandle} 
                >다음</Button>
               
            </Box>
        </>
    );
}

export default Photos;

const buttonBox = {
    display: 'flex', justifyContent: 'space-around'

}

const button = {
    width: 10, mt: 5, mb: 5, bgcolor: 'black',
    '&:hover': { 'backgroundColor': '#333' }
}

const outlineBox = {
    display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '85vh', alignItems: 'center'
}