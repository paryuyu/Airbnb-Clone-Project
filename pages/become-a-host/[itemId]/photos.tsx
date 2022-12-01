import { Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useRef, useState ,useContext } from "react";
import EmptyPhotos from "../../../components/ui/photos/emptyPhoto";
import PreviewPhotoBox from "../../../components/ui/photos/previewPhotosBox";
import { useRouter } from "next/router";

import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { firebaseApp } from "../../../lib/firebase-config";
import { uuidv4 } from "@firebase/util";
import HostingModal from '../../../components/ui/hosting_modal/HostingModal'
import FooterTwo from "../../../components/layout2/footer2";
import HeaderTwo from "../../../components/layout2/header2";
import NavTwo from "../../../components/layout2/nav2";
import Head from "next/head";
import { BackDropContext } from "../../_app";


function Photos() {
    
    const backCtx = useContext(BackDropContext);
    const router = useRouter();
    const [files, setFiles] = useState<File[]>([])
    const fileRef = useRef<HTMLInputElement>(null);

    const { itemId } = router.query;
    const [loading, setLoading] = useState(false);
    const [bt, setBt] = useState<boolean>(true);

    const NextHandle = async () => {
        backCtx.setBackDrop(true)
        setLoading(false)
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

        if (res.ok) {
            router.push('/become-a-host/' + itemId + '/title')
            setLoading(true)
            backCtx.setBackDrop(false)
        }
    }


    const handleFile = (file: File[]) => {
        setFiles(file)

    }

    useEffect(() => {
        console.log(files, "flies")
        if (files.length < 5) {
            setLoading(false)
        } else if (files.length > 4) {
            setLoading(true)
        }

    }, [files])

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
            <Head><title>사진추가</title></Head>
            <HeaderTwo />
            <NavTwo onExit={exitHandle} />

            <Box sx={{ ...outlineBox }}>
                <Typography sx={{ fontSize: 30, fontWeight: 'bold', mb: 2 }}>숙소 사진 추가하기</Typography>
                <Typography sx={{ fontSize: 15, fontWeight: '100', color: 'grey', mb: 5 }}>숙소 등록을 시작하려면 사진 5장을 제출하셔야 합니다. 나중에 추가하거나 변경하실 수 있습니다.</Typography>

                {files.length == 0 ?
                    <EmptyPhotos onFile={handleFile} /> :
                    <PreviewPhotoBox target={files} onFile={handleFile} onDel={removeFile} onLoading={() => { setLoading(false) }} />
                }

            </Box>
            <FooterTwo onBack={BackHandle} onNext={NextHandle} datas={loading} step={7} />
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


const outlineBox = {
    display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '70vh', alignItems: 'center'
}

