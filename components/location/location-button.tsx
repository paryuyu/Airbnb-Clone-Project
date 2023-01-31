import { useRouter } from "next/router";
import {useContext, useEffect, useState} from 'react';
import { LocationCtx } from "../../context/location-context";
import { BackDropContext } from "../../pages/_app";
import FooterTwo from "../layout2/footer2";

function MoveButton() {
    const router = useRouter();
    const { itemId } = router.query;
    const ctx = useContext(LocationCtx);
    const backCtx = useContext(BackDropContext);
    
    const [bt,setBt] =useState<boolean>(false);
    async function locationUpdate() {
        backCtx.setBackDrop(true)
        setBt(false)
        let res = await fetch('/api/accomodation/newUpdate?_id=' + itemId, {
            method: 'post',
            body: JSON.stringify({ location: ctx.mapNew , step:4 }), //바디
            headers: { 'Content-type': 'application/json' }
        });

        let json = await res.json();
        if(json.result){
            backCtx.setBackDrop(false)
            router.push("/become-a-host/" + itemId + "/floor-plan")
            setBt(true)
        }
    }


    useEffect(()=>{
        if(ctx.mapNew){
            setBt(true)
        }
    },[ctx.mapNew])


    const handleNext = ()=>{
        locationUpdate();
    }

    const BackHandle = () => {
        router.push("/become-a-host/" + itemId + "/privacy-type")
    }


    return (<>
    <FooterTwo onBack={BackHandle} onNext={handleNext} datas={bt} step={4} />
    </>);
}

export default MoveButton;


const buttonBox = {
    display: 'flex', justifyContent: 'space-between', ml: 5, mr: 5

}

const button = {
    bgcolor: 'black',
    borderRadius: 5,
    mt: 2
}
