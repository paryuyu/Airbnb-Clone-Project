import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import { useRef, useState } from "react";

function Draging() {

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

    
    return ( <> 
    
    <Box sx={{ ...photoBox }} >
    
        <PhotoLibraryIcon sx={{ ...icon }} />
        <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>업로드하려면 사진을 끌어다 놓으세요.</Typography>

    </Box>
    


     </> );
}

export default Draging;