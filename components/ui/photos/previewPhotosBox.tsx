import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import { useContext, useEffect, useRef, useState } from "react";
import PreviewPhoto from "./previewPhots";
import AddIcon from '@mui/icons-material/Add';
type props={
    target:File[];
    onFile:(file:any)=>void;
    onDel:(t:any)=>void
}

export default function PreviewPhotoBox({ target, onFile ,onDel }:props) {

    const [emptyBox, setEmptyBox] = useState(false);


    const fileRef = useRef<HTMLInputElement>(null);
    const dropHandle: React.DragEventHandler = (evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        const arr = Array.from(evt.dataTransfer.files);
        onFile((current:any) => [...current, ...arr]);

    }

    const fileSelectHandle: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
        console.log(evt.target.files)
        const arr2 = Array.from(evt.target.files!)
        onFile((current:any) => [...current, ...arr2]);
    }

    return (
        <Box sx={{
            display: 'flex', gap: 2, felxWrap: 'wrap'
        }} >
            {target.map((one) => {
                return <PreviewPhoto one={one} key={one.lastModified} onDel={onDel} />
            })}


            <Box sx={{ border: '1px dotted', display: 'flex', justifyContent: 'center', alignItems: 'center', height: 110, width: 180, cursor: 'pointer' }} onClick={() => { fileRef.current?.click() }}
                onDragOver={(evt) => {
                    evt.preventDefault();
                    evt.stopPropagation();
                    console.log("drag-event")
                }}
                onDrop={dropHandle}
            >

                <AddIcon sx={{ fontSize: 40, color: 'grey' }} />
                <input type='file' accept="image/*" ref={fileRef} style={{ display: 'none' }} onChange={fileSelectHandle}></input>

            </Box>
        </Box>


    );
}
