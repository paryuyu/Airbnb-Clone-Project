import { Box, Divider, Typography } from "@mui/material";

function Amenities({item}:any) {
    return ( <Box ><Typography sx={{ fontSize: 16, mt: 1 }}>{item}</Typography>
   </Box> );
}

export default Amenities;