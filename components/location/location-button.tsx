import { Box, Button } from "@mui/material";
import { useRouter } from "next/router";
import {useContext, useEffect, useState} from 'react';
import { LocationCtx } from "../../context/location-context";

function MoveButton() {
    const router = useRouter();
    const { itemId } = router.query;
    const ctx = useContext(LocationCtx);
    console.log(ctx,'여기서는 나오니')
    const [bt,setBt] =useState<boolean>(true);
    async function locationUpdate() {
        setBt(true)
        let res = await fetch('/api/accomodation/newUpdate?_id=' + itemId, {
            method: 'post',
            body: JSON.stringify({ location: ctx.mapNew }), //바디
            headers: { 'Content-type': 'application/json' }
        });

        let json = await res.json();
        console.log(json, "location last-update result")
        if(json.result){
            router.push("/become-a-host/" + itemId + "/floor-plan")
            setBt(false)
        }
    }


    useEffect(()=>{
        if(ctx.mapNew){
            setBt(false)
        }
    },[ctx.mapNew])


    const handleNext = ()=>{
        //여기서 업데이트를 한번 더 시키긴 해야 함.
        locationUpdate();
    }

    const BackHandle = () => {
        router.push("/become-a-host/" + itemId + "/privacy-type")
    }


    return (<>
    <Box sx={{...buttonBox}}>
        <Button variant="contained" sx={[{ ...button }, { '&:hover': { 'backgroundColor': '#333' } }]} onClick={BackHandle}>뒤로</Button>
    
        <Button variant="contained" sx={[{...button}, { '&:hover': { 'backgroundColor': '#333' } }]} onClick={handleNext} disabled={bt}>다음</Button>   
        </Box>
    </>);
}

export default MoveButton;


const buttonBox = {
    display: 'flex', justifyContent: 'space-between', ml: 5, mr: 5

}

const button = {
    bgcolor: 'black',
    borderRadius: 5,
    width: 50,
    fontSize: 12,
    mt: 2
}
