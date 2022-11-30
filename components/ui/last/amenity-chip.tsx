import { Box, Divider, Typography } from "@mui/material";

function HostingChip({one}:any) {
    return ( 
        <><Box><Typography sx={{fontSize:14,mb:1,ml:1}}>{one}</Typography><Divider sx={{mb:1}}/></Box></>
     );
}

export default HostingChip;