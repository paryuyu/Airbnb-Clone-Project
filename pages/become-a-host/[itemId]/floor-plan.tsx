import { Box, Button, Checkbox, Grid, IconButton, Typography } from "@mui/material";
import { useRouter } from "next/router";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { CheckBox } from "@mui/icons-material";
import { useState } from 'react';



const boxStyle = {
    display: 'flex', justifyContent: 'space-around', alignItems: 'center', bgcolor: 'white', mb: 6
}

const textStyle = {
    fontSize: 20,
    fontWeight: 'bold'
}

const iconStyle = {
    color: '#333',
    fontSize: 20
}

const buttonBox = {
    display: 'flex', justifyContent: 'space-between'

}

const button = {
    width: 10, mt: 5, mb: 5, bgcolor: 'black',
    '&:hover': { 'backgroundColor': '#333' }
}

const numStyle = {
    fontWeight: '400',
    fontSize: 15,
    color: '#333'

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

    async function floorPlanUpdate (){
        console.log("...")
            let res = await fetch('/api/accomodation/floorplanUpdate',{
                method:'post',
                body: JSON.stringify({guest:guest, bed:bed,bedroom:bedroom,bathroom:bathroom ,itemId:itemId }),
                headers:{'Content-type':'application/json'}
            })

            let json = await res.json();
            console.log(json)
            if(json.result){
                router.push("/become-a-host/" + itemId + "/amenities")
            }
    
    }


    const NextHandle = () => {
     if(guest !==0){
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




    return (<Grid component={"main"} container  >

        <Grid item sx={{ display: "flex", flex: 1, bgcolor: "black", color: "white", height: '100vh', alignItems: "center", justifyContent: "center" }}
        >
            <Typography component="h1" variant="h5" textAlign={"center"}>
                숙소에서 맞이할 최대 인원수를 알려주세요.
            </Typography>
        </Grid>

        <Grid item sx={{ display: "flex", flex: 1, flexDirection: "column", height: '100vh', pr: 10, pl: 10, justifyContent: "center" }}>

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


            <Box sx={{ ...buttonBox }}>
                <Button variant="contained" sx={{ ...button }} onClick={BackHandle}>뒤로</Button>
                <Button variant="contained" sx={{ ...button }} onClick={NextHandle}>다음</Button>
            </Box>

        </Grid>
    </Grid>);
}

