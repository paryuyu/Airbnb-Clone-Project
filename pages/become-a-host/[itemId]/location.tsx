
import React, { useState } from "react";
import { Box } from "@mui/system";
import ComboBox from "../../../components/location/addressAuto";
import { Maap } from "../../../components/location/map";
import { Button, Grid, Modal, Typography } from "@mui/material";
import { LocationProvider } from "../../../context/location-context";
import MoveButton from "../../../components/location/location-button";
import HostingModal from "../../../components/ui/hosting_modal/HostingModal";

export default function Location() {

    const [open, setOpen] = useState<boolean>(false)
    const exitHandle = () => {

        setOpen(true)
    }

    //4단계
    return (
        <LocationProvider>

            <Box>
                <Box sx={{ display: 'flex', justifyContent: 'end', mr: 2, mt: 5 }}>
                    <Button variant="contained" sx={[{ ...buttonSt }, { '&:hover': { backgroundColor: '#333' } }]} onClick={exitHandle}>저장 후 나가기</Button>
                </Box>
                <Typography sx={{ fontSize: 25, fontWeight: 'bold', textAlign: 'center', mb: 3 }}>

                    숙소 위치는 어디인가요?
                </Typography>

                <Typography sx={{ fontSize: 15, fontWeight: '100', textAlign: 'center', mb: 2 }}>
                    숙소의 위치는 마지막 마커의 값으로 저장됩니다.
                    정확한 위치를 찍어주세요.
                </Typography>



                <Maap />

                <Box sx={{ left: '40vw', top: 200, position: 'absolute' }}>
                    <ComboBox />
                </Box>
            </Box>

            < MoveButton />
            <Modal
                open={open}
                onClose={() => {
                    setOpen(false)
                }
                }>
                <HostingModal onModal={() => { setOpen(false) }} />
            </Modal>

        </LocationProvider>
    );
}



const buttonSt = {
    bgcolor: 'black',
    borderRadius: 5,
    width: 120,
    fontSize: 12,
    mb: 2
}
