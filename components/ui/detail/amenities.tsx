import { Divider, Typography } from "@mui/material";

function Amenities({item}:any) {
    return ( <><Typography sx={{ fontSize: 14, mt: 1 }}>{item}</Typography><Divider sx={{ mt: 1, mr: 5 }} />
   </> );
}

export default Amenities;