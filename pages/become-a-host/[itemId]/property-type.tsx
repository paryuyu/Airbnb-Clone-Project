import { Box, Container, Modal, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { AccomodationData } from "../../../lib/model/accomodation";
import { Types } from "../../../lib/model/dummy";
import Head from "next/head";
import HostingModal from "../../../components/ui/hosting_modal/HostingModal";
import PropertyList from "../../../components/ui/property/propertyList"
import FooterTwo from "../../../components/layout2/footer2";
import HeaderTwo from "../../../components/layout2/header2";
import NavTwo from "../../../components/layout2/nav2";
import { BackDropContext } from "../../_app";
import { ContainerStyle, outlinedBox } from "../../../components/containerStyle";
export default function Property() {

    const backCtx = React.useContext(BackDropContext);
    const router = useRouter();
    const { itemId } = router.query;

    const [arr, setArr] = useState<string>('');
    const [propertyTypeData, setPropertyTypeData] = React.useState<Types[]>();
    const [propertyChoose, setPropertyChoose] = React.useState<AccomodationData>();
    const [modalopen, setModalOpen] = useState<boolean>(false)

    React.useEffect(() => {
        backCtx.setBackDrop(true)
        if (itemId) {

            !async function () {
                let a = await fetch("/api/accomodation/roomtypefind", {
                    method: "post",
                    body: JSON.stringify({ itemId: itemId }),
                    headers: { "Content-type": "application/json" }
                });

                let rstdata = await a.json();
                if (rstdata !== null && rstdata.data) {
                    setPropertyTypeData(rstdata.data.types)
                    backCtx.setBackDrop(false)
                }
            }();

        }
    }, [itemId])




    async function PropertyUpdate(propertyType: string) {
        backCtx.setBackDrop(true)
        let update = await fetch("/api/accomodation/newUpdate?_id=" + itemId, {
            method: "post",
            body: JSON.stringify({ propertyType: propertyType, step: 2 }),
            headers: { "Content-type": "application/json" }
        })

        let finalRst = await update.json();
        setPropertyChoose(finalRst);
        if (finalRst) {
            backCtx.setBackDrop(false)
            router.push("/become-a-host/" + itemId + "/privacy-type")
        }
    }

    const handleClick = () => {

        if (itemId && arr.length > 0) {
            PropertyUpdate(arr)
        }
    }


    const BackHandle = () => {
        //데이터 날려주기.
        fetch("/api/accomodation/room-delete?id=" + itemId)
            .then(rc => rc.json)
            .then(rst => console.log(rst))

        router.push("/become-a-host/property-type-group")
    }

    const exitHandle = () => {
        setModalOpen(true)
    }
    const handleModal = () => {
        setModalOpen(false)
    }


    const handleItem = (val: string) => {
        setArr(val)
    }
    // console.log(arr, "arrrr")

    return (
        <>
            <Head><title>상세숙소유형</title></Head>
            <HeaderTwo />
            <NavTwo onExit={exitHandle} />
            <Box sx={{...outlinedBox, width:'90vw'}} >

            <Typography sx={{ fontSize: 25, fontWeight: 'bold', textAlign: 'center', mb: 3, mt: 5 }}>다음 중 숙소를 가장 잘 설명하는 것은 무⁠엇⁠인⁠가⁠요?</Typography>

            <Box sx={{display:'flex',flexWrap:'wrap', height:'90%',gap:2, justifyContent: 'center'}}>
                {propertyTypeData && propertyTypeData.map((one, index) => {
                    return (<PropertyList item={one} arr={arr} onItem={handleItem} key={index} />)
                })}
            </Box>
            </Box>
            <FooterTwo onBack={BackHandle} onNext={handleClick} datas={arr.length} step={2} />

            <Modal
                open={modalopen}
                onClose={() => { setModalOpen(false) }}>
                <Box>
                    <HostingModal onModal={handleModal} />
                </Box>
            </Modal>

        </>);
}

const outlineBox = {
    display: 'flex',
    flexWrap: 'wrap',
    width: '90%',
    gap: 2,
    padding: 2,
    margin: 'auto',
    height: '80vh',
    justifyContent: 'center',
    alignItems: 'center',
}


