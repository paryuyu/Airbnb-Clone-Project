
import React, { useState } from "react";
import { Box } from "@mui/system";
import ComboBox from "../../../components/location/addressAuto";
import { Maap } from "../../../components/location/map";
import {  Modal, Typography } from "@mui/material";
import { LocationProvider } from "../../../context/location-context";
import MoveButton from "../../../components/location/location-button";
import HostingModal from "../../../components/ui/hosting_modal/HostingModal";
import Head from "next/head";
import HeaderTwo from "../../../components/layout2/header2";
import NavTwo from "../../../components/layout2/nav2";

export default function Location() {

    const [open, setOpen] = useState<boolean>(false)
    const exitHandle = () => {
        setOpen(true)
    }

    //4단계
    return (

        <LocationProvider>
            <Head><title>주소찾기</title></Head>
            <HeaderTwo/>
            <NavTwo onExit={exitHandle} />
            <Box>
                
                <Typography sx={{ fontSize: 25, fontWeight: 'bold', textAlign: 'center', mb: 3 }}>
                    숙소 위치는 어디인가요?
                </Typography>

                <Typography sx={{ fontSize: 15, fontWeight: '100', textAlign: 'center', mb: 2 }}>
                    숙소의 위치는 마지막 마커의 값으로 저장됩니다.
                    정확한 위치를 찍어주세요.
                </Typography>

                <Maap />

                <Box sx={{ left: '40vw', top: '30vh', position: 'absolute' }}>
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
    mb: 2
}
