import { Box, IconButton, List, Typography } from "@mui/material";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { useState, useContext, useEffect } from 'react'
import { ReservationCtx } from "../../../../context/reservation-context";
export default function GuestList() {
    const ctx = useContext(ReservationCtx);


    const handlePlusAdult = () => {
        if (ctx.totalGuest !== ctx.limitGuest) {
            ctx.setAdult(ctx.adult + 1)
        }

    }

    const handleMinusAdult = () => {
        if (ctx.adult !== 0) {
            ctx.setAdult(ctx.adult - 1)
        }
    }
    const handleMinusinfant = () => {
        if (ctx.infant !== 0) {
            ctx.setInfant(ctx.infant - 1)
        }
    }

    const handlePlusinfant = () => {
        if (ctx.infant < 5) {
            ctx.setInfant(ctx.infant + 1)
        }
    }

    const handlePluschild = () => {
        if (ctx.totalGuest !== ctx.limitGuest) {
            ctx.setChild(ctx.child + 1)
        }
    }

    const handleMinuschild = () => {
        if (ctx.child !== 0) {
            ctx.setChild(ctx.child - 1)
        }
    }

    const handleMinusPet = () => {
        if (ctx.pet !== 0) {
            ctx.setPet(ctx.pet - 1)
        }
    }

    const handlePlusPet = () => {
        ctx.setPet(ctx.pet + 1)
    }

    useEffect(() => {
        ctx.setTotalGuest(ctx.adult + ctx.child)
    }, [ctx.child, ctx.adult])






    
    return (<Box >

        <Box sx={{ ...boxStyle }}>

            <Typography sx={{ ...textStyle }}>성인</Typography>
            <Box sx={{ ...numboxStyle }}>
                <IconButton onClick={handleMinusAdult}>
                    <RemoveCircleOutlineIcon sx={{ ...iconStyle }} />
                </IconButton>
                <Typography sx={{ ...numStyle }}>{ctx.adult}</Typography>
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
                <Typography sx={{ ...numStyle }}>{ctx.child}</Typography>
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
                <Typography sx={{ ...numStyle }}>{ctx.infant}</Typography>
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
                <Typography sx={{ ...numStyle }}>{ctx.pet}</Typography>
                <IconButton onClick={handlePlusPet}>
                    <ControlPointIcon sx={{ ...iconStyle }} />
                </IconButton>
            </Box>
        </Box>

    </Box>);
}



const boxStyle = {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: 'white', borderRadius: 4, maxWidth: '100%', p:0.5
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
