import { Box, Button, Chip, Grid, Modal, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { AccomodationData } from "../../../lib/model/accomodation";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Types } from "../../../lib/model/dummy";
import Head from "next/head";
import HostingModal from "../../../components/ui/hosting_modal/HostingModal";
import PropertyList from "../../../components/ui/property/propertyList"
export default function Property() {

    const router = useRouter();
    const { itemId } = router.query;

    const [arr, setArr] = useState<string>('');
    const [propertyTypeData, setPropertyTypeData] = React.useState<Types[]>();
    const [propertyChoose, setPropertyChoose] = React.useState<AccomodationData>();
    //경로를 그냥 끌고 들어오면 ???3
    const [modalopen, setModalOpen] = useState<boolean>(false)

    React.useEffect(() => {

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
                }
            }();

        }
    }, [itemId])




    async function PropertyUpdate(propertyType: string) {

        let update = await fetch("/api/accomodation/newUpdate?_id=" + itemId, {
            method: "post",
            body: JSON.stringify({ propertyType: propertyType }),
            headers: { "Content-type": "application/json" }
        })

        let finalRst = await update.json();
        setPropertyChoose(finalRst);
        if (finalRst) {
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
    console.log(arr, "arrrr")

    return (
        <>
            <Head><title>호스팅_</title></Head>

            <Box sx={{ display: 'flex', justifyContent: 'end', mr: 2 ,mt:5 }}>
                <Button variant="contained" sx={[{ ...buttonSt }, { '&:hover': { backgroundColor: '#333' } }]} onClick={exitHandle}>저장 후 나가기</Button>
            </Box>

            <Typography sx={{ fontSize: 25, fontWeight: 'bold' ,textAlign:'center',mb:3 }}>다음 중 숙소를 가장 잘 설명하는 것은 무⁠엇⁠인⁠가⁠요?</Typography>

            <Box sx={{ ...outlineBox }}>

                {propertyTypeData && propertyTypeData.map((one, index) => {
                    return (<PropertyList item={one} arr={arr} onItem={handleItem} key={index} />)
                })}

            </Box>

            <Box sx={{ ...buttonBox }}>
                <Button variant="contained" sx={[{ ...button }, { '&:hover': { bgcolor: '#333' } }]} onClick={BackHandle}>뒤로</Button>
                <Button
                    disabled={arr === ""}
                    variant="contained" sx={[{ ...button }, { '&:hover': { bgcolor: '#333' } }]} onClick={handleClick}>다음</Button>
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
margin:'auto'
}

const buttonBox = {
    display: 'flex', justifyContent: 'space-between', ml: 5, mr: 5

}
