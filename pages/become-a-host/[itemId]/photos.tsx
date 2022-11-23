import { Button, Modal, Typography } from "@mui/material";

import { Box } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import EmptyPhotos from "../../../components/ui/photos/emptyPhoto";
import PreviewPhotoBox from "../../../components/ui/photos/previewPhotosBox";
import { useRouter } from "next/router";

import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { firebaseApp } from "../../../lib/firebase-config";
import { uuidv4 } from "@firebase/util";
import HostingModal from '../../../components/ui/hosting_modal/HostingModal'
function Photos() {
    const [files, setFiles] = useState<File[]>([])
    const [draging, setDraging] = useState(false)
    const fileRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const { itemId } = router.query;
    const [loading,setLoading] = useState(false);
    const [bt,setBt] =useState<boolean>(true)
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
    const [open, setOpen] = useState<boolean>(false)
    const exitHandle = () => {

        setOpen(true)
    }
    return (
        <>

<Box sx={{ display: 'flex', justifyContent: 'end', mr: 2, mt: 5 }}>
                    <Button variant="contained" sx={[{ ...buttonSt }, { '&:hover': { backgroundColor: '#333' } }]} onClick={exitHandle}>저장 후 나가기</Button>
                </Box>
            <Box sx={{ ...outlineBox }}>
                <Typography sx={{ fontSize: 30, fontWeight: 'bold', mb: 2 }}>숙소 사진 추가하기</Typography>
                <Typography sx={{ fontSize: 15,fontWeight:'100', color: 'grey', mb: 5 }}>숙소 등록을 시작하려면 사진 5장을 제출하셔야 합니다. 나중에 추가하거나 변경하실 수 있습니다.</Typography>

                {files.length == 0 ?
                    <EmptyPhotos onFile={handleFile} /> :
                    <PreviewPhotoBox target={files} onFile={handleFile} onDel={removeFile} onLoading={()=>{setLoading(true)}} />
                }

            </Box>
            <Box sx={{ ...buttonBox }}>
                <Button variant="contained" sx={{ ...button }} onClick={BackHandle}>뒤로</Button>
                <Button variant="contained" sx={{ ...button }} disabled={loading} onClick={NextHandle} 
                >다음</Button>
               
            </Box>
            <Modal
                            open={open}
                onClose={() => {
                    setOpen(false)
                }
                }>
                <HostingModal onModal={() => { setOpen(false) }} />
            </Modal>
        </>
    );
}

export default Photos;

const buttonBox = {
    display: 'flex', justifyContent: 'space-between',
    ml: 5, mr: 5
}

const button = {
    bgcolor: 'black',
    borderRadius: 5,
    width: 50,
    fontSize: 12,
    mt: 2,mb:2,
    '&:hover': { 'backgroundColor': '#333' }
}
const outlineBox = {
    display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '85vh', alignItems: 'center'
}


const buttonSt = {
    bgcolor: 'black',
    borderRadius: 5,
    width: 110,
    fontSize: 12,
    mb: 2
}
