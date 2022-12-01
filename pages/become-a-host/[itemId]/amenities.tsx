import { Box, Modal } from "@mui/material";
import { useRouter } from "next/router";
import AmenitiesFirst from "../../../components/ui/amenities/amenities_first";
import { useState, useContext, useEffect } from 'react'
import HostingModal from "../../../components/ui/hosting_modal/HostingModal";
import Head from "next/head";
import HeaderTwo from "../../../components/layout2/header2";
import NavTwo from "../../../components/layout2/nav2";
import FooterTwo from "../../../components/layout2/footer2";
import { AmenityData } from "../../../lib/model/accomodation";
import { BackDropContext } from "../../_app";


function Amenities() {

    const backCtx = useContext(BackDropContext);
    const router = useRouter()
    const { itemId } = router.query;

    const [open, setOpen] = useState<boolean>(false)
    const exitHandle = () => {

        setOpen(true)
    }

    let [facilities, setFacitlities] = useState<string[]>([])
    let [sp,setsp]=useState<string[]>([]);
    let [safty,setSafty]=useState<string[]>([]);

    let handlefacility= (val:string)=>{
        if(facilities.includes(val)){
            setFacitlities(facilities.filter(one => val !== one))
        }else{
            setFacitlities([...facilities,val])
        }
    } 

    let handleSpecial = (val:string)=>{
        if(sp.includes(val)){
            setsp(sp.filter(one => val !== one))
        }else{
            setsp([...sp,val])
        }
    }


    let handleSafty = (val:string)=>{
        if(safty.includes(val)){
            setSafty(safty.filter(one=> one !== val))
        }else{
            setSafty([...safty,val])
        }
    }


    async function AmenityUpdate() {
        backCtx.setBackDrop(true)

        let amenity = {
            facilities: facilities,
            special: sp,
            safty: safty
        } as AmenityData
        
        let res = await fetch('/api/accomodation/newUpdate?_id='+itemId, {
            method: 'post',
            body: JSON.stringify({amenities:amenity, step:6}),
            headers: { 'Content-type': 'application/json' }
        })
        
        let json = await res.json();
        if (json.result) {
            backCtx.setBackDrop(false)
            router.push('/become-a-host/' + itemId + '/photos')
        }
    }



    const NextHanldle = () => {
        AmenityUpdate()
    }


    const BackHandle = () => {
        router.push('/become-a-host/' + itemId + '/floor-plan')
    }


    return (<>
          <Head><title>편의시설</title></Head>
            <HeaderTwo />
            <NavTwo onExit={exitHandle} />

        <Box sx={{ display: 'flex', justifyContent: 'center', }}>
            <AmenitiesFirst onFac={handlefacility}   onSp={handleSpecial}  onSafty={handleSafty} sp={sp}   safty={safty}    fac={facilities}     />
        </Box>

        <FooterTwo onBack={BackHandle} onNext={NextHanldle} datas={(facilities.length+sp.length+safty.length)} step={6} />

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
    mb: 2
}
