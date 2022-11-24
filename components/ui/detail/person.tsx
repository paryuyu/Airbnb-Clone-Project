import { Box, IconButton, List, Typography } from "@mui/material";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { useState, useContext, useEffect } from 'react'
export default function PersonList() {


    const [adult, setAdult] = useState<number>(0);
    const [child, setChild] = useState<number>(0);
    const [infant, setInfant] = useState<number>(0);
    const [pet, setPet] = useState<number>(0);
    const handlePlusAdult = () => {
        setAdult(adult + 1)
    }
    const handleMinusAdult = () => {
        if (adult !== 0) {
            setAdult(adult - 1)
        }
    }
    const handleMinusinfant = () => {
        if (infant !== 0) {
            setInfant(infant - 1)
        }
    }

    const handlePlusinfant = () => {
        setInfant(infant + 1)
    }

    const handlePluschild = () => {
        
            setChild(child + 1)
        
    }

    const handleMinuschild = () => {
        if (child !== 0) {
            setChild(child - 1)
        }
    }

    const handleMinusPet = () => {
        if (pet !== 0) {
            setPet(pet - 1)
        }
    }

    const handlePlusPet = () => {
        setPet(pet + 1)
    }

    return (<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' , bgcolor:'red', maxHeight:370 }}>

        <Box sx={{ ...boxStyle }}>

            <Typography sx={{ ...textStyle }}>성인</Typography>
            <Box sx={{ ...numboxStyle }}>
                <IconButton onClick={handleMinusAdult}>
                    <RemoveCircleOutlineIcon sx={{ ...iconStyle }} />
                </IconButton>
                <Typography sx={{ ...numStyle }}>{adult}</Typography>
                <IconButton onClick={handlePlusAdult}>
                    <ControlPointIcon sx={{ ...iconStyle }} />
                </IconButton>
            </Box>
        </Box>
        <Box sx={{ ...boxStyle }}>

            <Typography sx={{ ...textStyle }}>어린이</Typography>
            <Box sx={{ ...numboxStyle }}>
                <IconButton onClick={handleMinuschild}>
                    <RemoveCircleOutlineIcon sx={{ ...iconStyle }} />
                </IconButton>
                <Typography sx={{ ...numStyle }}>{child}</Typography>
                <IconButton onClick={handlePluschild}>
                    <ControlPointIcon sx={{ ...iconStyle }} />
                </IconButton>
            </Box>
        </Box>
        <Box sx={{ ...boxStyle }}>

            <Typography sx={{ ...textStyle }}>유아</Typography>
            <Box sx={{ ...numboxStyle }}>
                <IconButton onClick={handleMinusinfant}>
                    <RemoveCircleOutlineIcon sx={{ ...iconStyle }} />
                </IconButton>
                <Typography sx={{ ...numStyle }}>{infant}</Typography>
                <IconButton onClick={handlePlusinfant}>
                    <ControlPointIcon sx={{ ...iconStyle }} />
                </IconButton>
            </Box>
        </Box>

        <Box sx={{ ...boxStyle }}>

            <Typography sx={{ ...textStyle }}>반려동물</Typography>
            <Box sx={{ ...numboxStyle }}>
                <IconButton onClick={handleMinusPet}>
                    <RemoveCircleOutlineIcon sx={{ ...iconStyle }} />
                </IconButton>
                <Typography sx={{ ...numStyle }}>{pet}</Typography>
                <IconButton onClick={handlePlusPet}>
                    <ControlPointIcon sx={{ ...iconStyle }} />
                </IconButton>
            </Box>
        </Box>

    </Box>);
}



const boxStyle = {
    display: 'flex', justifyContent: 'space-around', alignItems: 'center', bgcolor: 'white',  borderRadius: 4, width: 400, pt: 1, pb: 1
}

const textStyle = {
    fontSize: 15,
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
