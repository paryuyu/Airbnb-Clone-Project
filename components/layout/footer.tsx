import { Box, Divider, Typography } from "@mui/material";

export default function Footer () {
    return ( <Box sx={{mt:2,mb:2}}> 
        
        <Divider></Divider>
       <Typography sx={{fontWeight:'100', fontSize:15, ml:2, mt:1}}>© 2022 Airbnb, Inc. | Clone Coding Project 용 홈페이지입니다.</Typography> 
        
        
         </Box>);
}
