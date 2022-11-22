import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import { useRef, useState } from "react";
import Draging from "./dragPhoto";

type props = {
    onFile:(file:File[])=>void
}
function EmptyPhotos({ onFile }:props) {

    const [files, setFiles] = useState<File[]>([])
    const fileRef = useRef<HTMLInputElement>(null);

    const [draging, setDraging] = useState(false)
    const photoBox = {
        border: '1px dotted black',
        height: 400,
        width: 500,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        animation: 'fadein 1.5s'
    }

    const icon = {
        fontSize: 50,
        mb: 3
    }
    const imgBox = {
        height: 200,
        width: 300,
        border: '1px dotted black',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        animation: 'fadein 1.5s',
        margin: 2
    }

    const outlineBox = {
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh'
    }
    const dropHandle: React.DragEventHandler = (evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        console.log('drop-event')
        console.log(evt.dataTransfer.files);
        const arr = Array.from(evt.dataTransfer.files);
        onFile(arr)
        //드래그 후 드랍이벤트 발생
        
        setDraging(false)
    }

    const fileSelectHandle: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
        //인풋타입 체인지이벤트 파일선택할 때
        console.log(evt.target.files)
        const arr2 = Array.from(evt.target.files!)
        onFile(arr2)
        
    }

    return (<>
  
            <Box sx={{ ...photoBox }} onDragOver={(evt) => {
                evt.preventDefault();
                evt.stopPropagation();
                console.log("drag-event")
            }}
                onDrop={dropHandle}
              //  onDragEnter={(evt) => { setDraging(true) }}
            >

                <PhotoLibraryIcon sx={{ ...icon }} />
                <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>여기로 사진을 끌어다 놓으세요.</Typography>

                <Typography sx={{ fontSize: 13, color: 'grey', mb: 5 }}>5장 이상의 사진을 선택하세요.</Typography>

                <Typography sx={{ fontSize: 13, fontWeight: 'bold', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => { fileRef.current?.click() }}>기기에서 업로드</Typography>

                <input type='file' accept="image/*" multiple ref={fileRef} style={{ display: 'none' }} onChange={fileSelectHandle}></input>
            </Box>
  
    </>);
}

export default EmptyPhotos;