import { Box, Button } from "@mui/material";
import { useRouter } from "next/router";
import {useContext} from 'react';
import { LocationCtx } from "../../context/location-context";

function MoveButton() {
    const router = useRouter();
    const { itemId } = router.query;
    const ctx = useContext(LocationCtx);
    console.log(ctx,'여기서는 나오니')

    async function locationUpdate() {

        let res = await fetch('/api/accomodation/newUpdate?_id=' + itemId, {
            method: 'post',
            body: JSON.stringify({ location: ctx.mapNew }), //바디
            headers: { 'Content-type': 'application/json' }
        });

        let json = await res.json();
        console.log(json, "location last-update result")
        if(json.result){
            router.push("/become-a-host/" + itemId + "/floor-plan")
        }
    }





    const handleNext = ()=>{
        //여기서 업데이트를 한번 더 시키긴 해야 함.
        locationUpdate();
    }

    const BackHandle = () => {
        router.push("/become-a-host/" + itemId + "/privacy-type")
    }


    return (<>
    <Box sx={{ position: 'absolute', bottom: 0, left: 50 }}>
        <Button variant="contained" sx={[{ width: 10, mt: 5, mb: 5, bgcolor: 'black' }, { '&:hover': { 'backgroundColor': '#333' } }]} onClick={BackHandle}>뒤로</Button>
    </Box>
    <Box sx={{ position: 'absolute', bottom: 0, left: 450 }}>
        <Button variant="contained" sx={[{ width: 10, mt: 5, mb: 5, bgcolor: 'black' }, { '&:hover': { 'backgroundColor': '#333' } }]} onClick={handleNext}>다음</Button>   
    </Box></>);
}

export default MoveButton;