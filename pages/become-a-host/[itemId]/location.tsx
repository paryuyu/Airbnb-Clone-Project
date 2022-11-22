
import React from "react";
import { Box } from "@mui/system";
import ComboBox from "../../../components/location/addressAuto";
import { Maap } from "../../../components/location/map";
import { Grid, Typography } from "@mui/material";
import { LocationProvider } from "../../../context/location-context";
import MoveButton from "../../../components/location/location-button";


export default function Location() {



    //4단계
    return (
        <LocationProvider>
            <Grid component={"main"} container  >

                <Grid item sx={{ display: "flex", flex: 1, bgcolor: "black", color: "white", height: '100vh', alignItems: "center", justifyContent: "center" }}
                >
                    <Typography component="h1" variant="h5" textAlign={"center"}>
                        숙소 위치는 어디인가요?
                    </Typography>
                </Grid>



                <Grid item sx={{ display: "flex", flex: 1, flexDirection: "column", height: '100vh', justifyContent: "center" }}>

                    <Box sx={{ display: "flex", flex: 1, flexDirection: "column", position: 'relative' }}>

                        <Box>
                            <Maap />
                        </Box>

                        <Box sx={{ left: '35%', top: 200, position: 'absolute' }}>
                            <ComboBox />
                        </Box>
                        < MoveButton />
                    </Box>

                </Grid>
            </Grid>
        </LocationProvider>
    );
}