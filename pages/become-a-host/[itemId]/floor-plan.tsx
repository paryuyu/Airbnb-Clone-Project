import { Box, Button, Checkbox, Grid, IconButton, Modal, Typography } from "@mui/material";
import { useRouter } from "next/router";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { useState ,useContext } from 'react';
import HostingModal from "../../../components/ui/hosting_modal/HostingModal";
import FooterTwo from "../../../components/layout2/footer2";
import HeaderTwo from "../../../components/layout2/header2";
import NavTwo from "../../../components/layout2/nav2";
import Head from "next/head";
import { BackDropContext } from "../../_app";



const boxStyle = {
    display: 'flex', justifyContent: 'space-around', alignItems: 'center', bgcolor: 'white', mb: 4, border: '1px solid #ddd', borderRadius: 4, width: 400, pt: 1, pb: 1
}

const textStyle = {
    fontSize: 20,
    fontWeight: 'bold'
}

const iconStyle = {
    color: 'grey',
    fontSize: 25
}

const numStyle = {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#333',


}

const numboxStyle = {
    display: 'flex',
    alignItems: 'center'
}


export default function Privacy() {

    const backCtx = useContext(BackDropContext);
    const [guest, setGuest] = useState(4);
    const [bed, setBed] = useState(1);
    const [bedroom, setBedroom] = useState(1);
    const [bathroom, setBathroom] = useState(1);
    const [open, setOpen] = useState<boolean>(false)
    const router = useRouter();
    const { itemId } = router.query;

    //fetch update시키기

    async function floorPlanUpdate() {
        backCtx.setBackDrop(true)

        let floor = {
            guest: guest, bed: bed, bedroom: bedroom, bathroom: bathroom
        }
        
        let res = await fetch('/api/accomodation/newUpdate?_id=' + itemId, {
            method: 'post',
            body: JSON.stringify({ floorPlan: floor , step:6  }),
            headers: { 'Content-type': 'application/json' }
        })

        let json = await res.json();
        if (json.result) {
            backCtx.setBackDrop(false)
            router.push("/become-a-host/" + itemId + "/amenities")
        }

    }


    const NextHandle = () => {
        if (guest !== 0) {
            console.log("...!")
            floorPlanUpdate()
        }

    }

    const BackHandle = () => {
        router.push("/become-a-host/" + itemId + "/location")
    }

    const handlePlusGuest = () => {
        setGuest(guest + 1)
    }

    const handleMinusGuest = () => {
        if (guest !== 0) {
            setGuest(guest - 1)
        }
    }

    const handlePlusBed = () => {
        setBed(bed + 1)
    }

    const handleMinusBed = () => {
        if (bed !== 0) {
            setBed(bed - 1)
        }
    }

    const handlePlusBedroom = () => {
        setBedroom(bedroom + 1)
    }

    const handleMinusBedroom = () => {
        if (bedroom !== 0) {
            setBedroom(bedroom - 1)
        }
    }


    const handlePlusBathroom = () => {
        setBathroom(bathroom + 1)
    }

    const handleMinusBathroom = () => {
        if (bathroom !== 0) {
            setBathroom(bathroom - 1)
        }
    }

    const exitHandle = () => {

        setOpen(true)
    }



    return (
        <>
        <Head><title>인원수</title></Head>
            <HeaderTwo />
            <NavTwo onExit={exitHandle} />
            
            <Typography sx={{ fontSize: 25, fontWeight: 'bold', textAlign: 'center', mb: 3 }}>숙소에서 맞이할 최대 인원수를 알려주세요.</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box sx={{ ...boxStyle }}>

                    <Typography sx={{ ...textStyle }}>게스트</Typography>
                    <Box sx={{ ...numboxStyle }}>
                        <IconButton onClick={handleMinusGuest}>
                            <RemoveCircleOutlineIcon sx={{ ...iconStyle }} />
                        </IconButton>
                        <Typography sx={{ ...numStyle }}>{guest}</Typography>
                        <IconButton onClick={handlePlusGuest}>
                            <ControlPointIcon sx={{ ...iconStyle }} />
                        </IconButton>
                    </Box>
                </Box>

                <Box sx={{ ...boxStyle }}>

                    <Typography sx={{ ...textStyle }}>침대</Typography>
                    <Box sx={{ ...numboxStyle }}>
                        <IconButton onClick={handleMinusBed}>
                            <RemoveCircleOutlineIcon sx={{ ...iconStyle }} />
                        </IconButton>
                        <Typography sx={{ ...numStyle }}>{bed}</Typography>
                        <IconButton onClick={handlePlusBed}>
                            <ControlPointIcon sx={{ ...iconStyle }} />
                        </IconButton>
                    </Box>
                </Box>

                <Box sx={{ ...boxStyle }}>

                    <Typography sx={{ ...textStyle }}>침실</Typography>
                    <Box sx={{ ...numboxStyle }}>
                        <IconButton onClick={handleMinusBedroom}>
                            <RemoveCircleOutlineIcon sx={{ ...iconStyle }} />
                        </IconButton>
                        <Typography sx={{ ...numStyle }}>{bedroom}</Typography>
                        <IconButton onClick={handlePlusBedroom}>
                            <ControlPointIcon sx={{ ...iconStyle }} />
                        </IconButton>
                    </Box>
                </Box>

                <Box sx={{ ...boxStyle }}>

                    <Typography sx={{ ...textStyle }}>욕실</Typography>
                    <Box sx={{ ...numboxStyle }}>
                        <IconButton onClick={handleMinusBathroom}>
                            <RemoveCircleOutlineIcon sx={{ ...iconStyle }} />
                        </IconButton>
                        <Typography sx={{ ...numStyle }}>{bathroom}</Typography>
                        <IconButton onClick={handlePlusBathroom}>
                            <ControlPointIcon sx={{ ...iconStyle }} />
                        </IconButton>
                    </Box>
                </Box>


            </Box>


            <FooterTwo onBack={BackHandle} onNext={NextHandle} datas={1} step={5} />
            <Modal
                open={open}
                onClose={() => {
                    setOpen(false)
                }
                }>
                <HostingModal onModal={() => { setOpen(false) }} />
            </Modal>
        </>);
}




const buttonSt = {
    bgcolor: 'black',
    borderRadius: 5,
    mb: 2
}
