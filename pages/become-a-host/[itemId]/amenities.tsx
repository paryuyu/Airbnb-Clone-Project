import { Box, Button, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import AmenitiesFirst from "../../../components/ui/amenities/amenities_first";
import {useState, useContext,useEffect} from 'react'


function Amenities() {
   
    const router = useRouter()
    const { itemId } = router.query;



    return (<Grid component={"main"} container  >
       
        <Grid item sx={{ display: "flex", flex: 1, bgcolor: "black", color: "white", height: '100vh', alignItems: "center", justifyContent: "center" }}
        >
            <Typography component="h1" variant="h5" textAlign={"center"}>
                숙소 편의시설 정보를 추가하세요.
            </Typography>
        </Grid>

        <Grid item sx={{ display: "flex", flex: 1, flexDirection: "column", height: '100vh', pr: 10, pl: 10, justifyContent: "center" }}>
               <AmenitiesFirst/>
        </Grid>
    </Grid>);
}

export default Amenities;

