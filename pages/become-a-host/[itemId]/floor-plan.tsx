import { Box, Button, Checkbox, Grid, IconButton, Modal, Typography } from "@mui/material";
import { useRouter } from "next/router";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { CheckBox } from "@mui/icons-material";
import { useState } from 'react';
import HostingModal from "../../../components/ui/hosting_modal/HostingModal";



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

const buttonBox = {
    display: 'flex', justifyContent: 'space-between',
    ml: 5, mr: 5
}

const button = {
    bgcolor: 'black',
    borderRadius: 5,
    mt: 2,
    '&:hover': { 'backgroundColor': '#333' }
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

    const [guest, setGuest] = useState(4);
    const [bed, setBed] = useState(1);
    const [bedroom, setBedroom] = useState(1);
    const [bathroom, setBathroom] = useState(1);

    const router = useRouter();
    const { itemId } = router.query;

    //fetch update시키기

    async function floorPlanUpdate() {
        console.log("...")
        let floor = {
            guest: guest, bed: bed, bedroom: bedroom, bathroom: bathroom
        }
        let res = await fetch('/api/accomodation/newUpdate?_id=' + itemId, {
            method: 'post',
            body: JSON.stringify({ floorPlan: floor }),
            headers: { 'Content-type': 'application/json' }
        })

        let json = await res.json();
        console.log(json)
        if (json.result) {
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

    const [open, setOpen] = useState<boolean>(false)
    const exitHandle = () => {

        setOpen(true)
    }



    return (
        <>

            <Box sx={{ display: 'flex', justifyContent: 'end', mr: 2, mt: 5 }}>
                <Button variant="contained" sx={[{ ...buttonSt }, { '&:hover': { backgroundColor: '#333' } }]} onClick={exitHandle}>저장 후 나가기</Button>
            </Box>
            <Typography sx={{ fontSize: 25, fontWeight: 'bold', textAlign: 'center', mb: 3 }}>숙소에서 맞이할 최대 인원수를 알려주세요.</Typography>
            <Box sx={{display:'flex', flexDirection:'column', alignItems:'center'}}>
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
            <Box sx={{ ...buttonBox }}>
                <Button variant="contained" sx={{ ...button }} onClick={BackHandle}>뒤로</Button>
                <Button variant="contained" sx={{ ...button }} onClick={NextHandle}>다음</Button>
            </Box>

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
