
import { Box } from "@mui/system";
import { useEffect, useState, useRef } from "react";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { IconButton } from "@mui/material";
function PreviewPhoto(props: any) {
    //console.log(props, "dkdkdkdkr")
    const [imgurl, setimgurl] = useState('');
    const ref = useRef<HTMLDivElement>();

    useEffect(() => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(props.one)
        fileReader.onload = (rst) => {
            let result = rst.target!.result as string;
            setimgurl(result)
            console.log(rst, '????type잡는중')
        }

    }, [props])

    const handleDel = () => {
        ref.current!.style!.setProperty('animation', 'fadeout 1s')
        setTimeout(() => {
            props.onDel(props.one)
        }, 500)
    }


    return (
        <Box sx={{ border: '1px dotted', position: 'relative', height: 110, width: 180 }}>
            <IconButton sx={{ position: 'absolute', top: 2, left: 1 }} onClick={handleDel} >
                <HighlightOffIcon sx={{ fontSize: 20, color: 'grey' }} />
            </IconButton>
            <Box ref={ref}>
                <img src={imgurl} style={{ height: '100%' }} />
            </Box>
        </Box>
    );
}

export default PreviewPhoto;