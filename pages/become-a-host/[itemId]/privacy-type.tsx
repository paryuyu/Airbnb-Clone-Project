import { Box, Button, Grid, Modal, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Head from "next/head";
import HostingModal from "../../../components/ui/hosting_modal/HostingModal";
import PrivacyList from "../../../components/ui/property/privacyList";
export default function Privacy() {

    const router = useRouter();
    const { itemId } = router.query;
    const [pri, setPri] = useState<string>('')

    async function PrivacyTypeUpdate() {
        let update = await fetch("/api/accomodation/newUpdate?_id=" + itemId, {
            method: "post",
            body: JSON.stringify({ privacyType: pri }),
            headers: { "Content-type": "application/json" }
        })

        let finalRst = await update.json();

        if (finalRst) {
            router.push("/become-a-host/" + itemId + "/location")
        }
    }


    const BackHandle = () => {
        router.push("/become-a-host/" + itemId + "/property-type")
    }

    const [modalopen, setModalOpen] = useState<boolean>(false)
    const exitHandle = () => {
        setModalOpen(true)
    }
    const handleModal = () => {
        setModalOpen(false)
    }

    const handleItem = (that: string) => {
        setPri(that)

    }
    const handleNext = () => {
        if (itemId && pri !== "") {
            PrivacyTypeUpdate()
        }
    }
    console.log(pri)
    const arr = ['공간전체', '개인실', '다인실']
    return (
        <>
            <Head><title>호스팅_</title></Head>

            <Box sx={{ display: 'flex', justifyContent: 'end', mr: 2, mt: 5 }}>
                <Button variant="contained" sx={[{ ...buttonSt }, { '&:hover': { backgroundColor: '#333' } }]} onClick={exitHandle}>저장 후 나가기</Button>
            </Box>
            <Typography sx={{ fontSize: 25, fontWeight: 'bold', textAlign: 'center', mb: 3 }}>게스트가 사용할 숙소  유형</Typography>

            <Box sx={{ ...outlineBox }}>
                {arr.map((one, index) => <PrivacyList item={one} key={index} onItem={handleItem} pri={pri} />)}

            </Box>



            <Box sx={{ ...buttonBox }}>
                <Button variant="contained" sx={[{ ...button }, { '&:hover': { bgcolor: '#333' } }]} onClick={BackHandle}>뒤로</Button>
                <Button variant="contained" disabled={pri===""} onClick={handleNext} sx={[{ ...button }, { '&:hover': { backgroundColor: '#333' } }]}>다음</Button>
            </Box>

            <Modal
                open={modalopen}
                onClose={() => { setModalOpen(false) }}>
                <Box>
                    <HostingModal onModal={handleModal} />
                </Box>
            </Modal>

        </>);
}



const buttonSt = {
    bgcolor: 'black',
    borderRadius: 5,
    width: 120,
    fontSize: 12,
    mb: 2
}

const button = {
    bgcolor: 'black',
    borderRadius: 5,
    width: 50,
    fontSize: 12,
    mt: 2
}

const outlineBox = {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    gap: 2,
    padding: 2
}

const buttonBox = {
    display: 'flex', justifyContent: 'space-between', ml: 5, mr: 5

}
