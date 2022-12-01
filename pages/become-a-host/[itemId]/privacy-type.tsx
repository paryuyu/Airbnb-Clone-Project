import { Box,  Modal, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState , useEffect} from "react";
import Head from "next/head";
import HostingModal from "../../../components/ui/hosting_modal/HostingModal";
import PrivacyList from "../../../components/ui/property/privacyList";
import FooterTwo from "../../../components/layout2/footer2";
import HeaderTwo from "../../../components/layout2/header2";
import NavTwo from "../../../components/layout2/nav2";
import { BackDropContext } from "../../_app";
export default function Privacy() {

    const backCtx = React.useContext(BackDropContext);
    const router = useRouter();
    const { itemId } = router.query;
    const [pri, setPri] = useState<string>('')

    




    async function PrivacyTypeUpdate() {  
        backCtx.setBackDrop(true)
        let update = await fetch("/api/accomodation/newUpdate?_id=" + itemId, {
            method: "post",
            body: JSON.stringify({ privacyType: pri , step:3  }),
            headers: { "Content-type": "application/json" }
        })

        let finalRst = await update.json();

        if (finalRst) {
            backCtx.setBackDrop(false)
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
    const arr = ['공간전체', '개인실', '다인실']


    return (
        <>
            <Head><title>공간정보</title></Head>
            <HeaderTwo />
            <NavTwo onExit={exitHandle} />


            <Typography sx={{ fontSize: 25, fontWeight: 'bold', textAlign: 'center', mb: 3 }}>게스트가 사용할 숙소  유형</Typography>

            <Box sx={{ ...outlineBox }}>
                {arr.map((one, index) => <PrivacyList item={one} key={index} onItem={handleItem} pri={pri} />)}

            </Box>

            <Modal
                open={modalopen}
                onClose={() => { setModalOpen(false) }}>
                <Box>
                    <HostingModal onModal={handleModal} />
                </Box>
            </Modal>

            <FooterTwo onBack={BackHandle} onNext={handleNext} datas={pri.length} step={3} />

        </>);
}



const buttonSt = {
    bgcolor: 'black',
    borderRadius: 5,
    mb: 2
}

const button = {
    bgcolor: 'black',
    borderRadius: 5,
    mt: 2
}

const outlineBox = {
    display: 'flex',
    flexWrap: 'wrap',
    width: '90%',
    gap: 2,
    padding: 2,
    margin: 'auto'
}

const buttonBox = {
    display: 'flex', justifyContent: 'space-between', ml: 5, mr: 5

}
