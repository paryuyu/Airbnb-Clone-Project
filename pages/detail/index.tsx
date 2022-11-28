import { Button, Card, CardContent, Chip, Divider, ImageList, ImageListItem, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import Header from "../../components/layout/header";
import Calender from "../../components/ui/detail/reservation/calender";
import DetailAddress from "../../components/ui/detail/addressDetail";
import Amenities from "../../components/ui/detail/amenities";
import Images from "../../components/ui/detail/images";
import { AccomodationData } from "../../lib/model/accomodation";
import ReservationCard from "../../components/ui/detail/reservation/reservation-card";
import { ReservationProvider } from "../../context/reservation-context";
import GuestList from "../../components/ui/detail/reservation/guests";


type floorPlan = {
    guest: number;
    bed: number;
    bedroom: number;
    bathroom: number;
}
type Location = {
    lat: string;
    lng: string;
}
export default function DetailPage() {
    let { data, status } = useSession()
    const router = useRouter();
    const { _id } = router.query;

    const [datas, setDatas] = useState<AccomodationData>();
    const [photos, setPhotos] = useState<string[]>([])
    const [facilities, setFacilities] = useState<string[]>([])
    const [special, setSpecial] = useState<string[]>([])
    const [safty, setSafty] = useState<string[]>([])
    const [email, setEmail] = useState<string>('');
    const [groupType, setGroupType] = useState<string>('');
    const [floorPlan, setFloorPlan] = useState<floorPlan>();
    const [description, setDescription] = useState<string[]>([]);
    const [location, setLocation] = useState<Location>();
    const [title, setTitle] = useState<string>('');


    //receipt -> 호스팅 날짜
    async function ItemReq() {
        let res = await fetch('/api/main/find?_id=' + router.query._id);
        let json = await res.json();
        console.log(json)
        if (res.ok) {
            setDatas(json.data[0]);
            setPhotos(json.data[0].Photos)
            setFacilities(json.data[0].amenities.facilities)
            setSpecial(json.data[0].amenities.special)
            setSafty(json.data[0].amenities.safty)
            let rstEmail = json.data[0].email.split('@')
            setEmail(rstEmail[0])
            setGroupType(json.data[0].groupType)
            setFloorPlan(json.data[0].floorPlan)
            setDescription(json.data[0].description)
            setLocation(json.data[0].location)
            setTitle(json.data[0].title)
        }
    }


    useEffect(() => {
        if (_id) {
            ItemReq()
        }
    }, [_id])




    return (
        <>
            <ReservationProvider>
                <Head><title>{title}</title></Head>

                <Header />

                <Box sx={{ display: 'flex', justifyContent: 'center' }}>

                    <Box >

                        {datas && <Typography sx={{ fontSize: 25, fontWeight: 'bold', mt: 1, mb: 1, position: 'sticky', top: 0 }}>{title}</Typography>}

                        {description && description.map((one, index) => <Chip key={index} label={one} sx={{ mr: 0.5, bgcolor: '#333', color: 'white', fontSize: 12, height: 25, mb: 1 }} />)}


                        <Divider />
                        <ImageList
                            sx={{ width: '80vw', height: 500, border: '1px solid #ddd', borderRadius: 5 }}
                            variant="quilted"
                            cols={2}
                            rowHeight={300}
                        >
                            {photos && photos.map((item, index) => (
                                <Images key={index} item={item} />
                            ))}
                        </ImageList>

                            <Box sx={{width:'60%'}}>
                                <Typography sx={{ fontSize: 25, fontWeight: 'bold', color: '#333', mb: 1 }}>{email}님이 호스팅하는 {groupType}</Typography>

                                <Typography sx={{ fontSize: 14 }}>최대 인원 {floorPlan?.guest}명 / 침대 {floorPlan?.bed}개 / 침실 {floorPlan?.bedroom}개 / 욕실 {floorPlan?.bathroom}개</Typography>

                                <Divider sx={{ mt: 1, mb: 1 }}></Divider>



                                <Typography sx={{ fontSize: 23, fontWeight: 'bold', color: '#333' }} >편의시설</Typography>
                                {facilities?.map((one, index) => {
                                    return (<Amenities item={one} key={index} />)
                                })}
                                {special?.map((one, index) => {
                                    return (<Amenities item={one} key={index} />)
                                })}
                                {safty?.map((one, index) => {
                                    return (<Amenities item={one} key={index} />)
                                })}
                            </Box>

                            {datas && <ReservationCard datas={datas} />}
                        
                        <Calender />
                        {location && <DetailAddress location={location} />}


                    </Box></Box>





            </ReservationProvider></>);
}

// flexWrap: 'wrap', width: '70vw', justifyContent: 'center' 