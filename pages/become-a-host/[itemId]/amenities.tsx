import { Box, Button, Grid, Modal, Typography } from "@mui/material";
import { useRouter } from "next/router";
import AmenitiesFirst from "../../../components/ui/amenities/amenities_first";
import { useState, useContext, useEffect } from 'react'
import HostingModal from "../../../components/ui/hosting_modal/HostingModal";


function Amenities() {

    const router = useRouter()
    const { itemId } = router.query;

    const [open, setOpen] = useState<boolean>(false)
    const exitHandle = () => {

        setOpen(true)
    }




    return (<>
        <Box sx={{ display: 'flex', justifyContent: 'end', mr: 2, mt: 5 }}>
            <Button variant="contained" sx={[{ ...buttonSt }, { '&:hover': { backgroundColor: '#333' } }]} onClick={exitHandle}>저장 후 나가기</Button>
        </Box>
        <Typography sx={{ fontSize: 25, fontWeight: 'bold', textAlign: 'center', mb: 3 }}>
            숙소 편의시설 정보를 추가하세요.
        </Typography>

<Box sx={{marginLeft:2,marginRight:2}}>

        <AmenitiesFirst />

</Box>

        <Modal
            open={open}
            onClose={() => {
                setOpen(false)
            }
            }>
            <HostingModal onModal={() => { setOpen(false) }} />
        </Modal>
    </>
    );
}

export default Amenities;



const buttonSt = {
    bgcolor: 'black',
    borderRadius: 5,
    width: 120,
    fontSize: 12,
    mb: 2
}
