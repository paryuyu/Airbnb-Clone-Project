import { Button, Card, CardContent, Chip, Divider, ImageList, ImageListItem, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../../components/layout/header";
import DetailAddress from "../../components/ui/detail/addressDetail";
import Amenities from "../../components/ui/detail/amenities";
import Images from "../../components/ui/detail/images";
import { AccomodationData } from "../../lib/model/accomodation";
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
    const [reservationType, setReservationType] = useState<string | null>(null)
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
    //descripti
    //floorPlan

    //location
    //privacyType
    //propertyType
    //receipt


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
        }
    }
    useEffect(() => {
        if (router.query) {
            ItemReq()
        }
    }, [router.query])
    // console.log(data)



    const handleReservationType = (event: React.MouseEvent<HTMLElement, MouseEvent>
    ) => {
        // let val = event.currentTarget.value as any;
        // setReservationType(val) //타입오류잡기
    }

    return (
        <>
        <Head><title>Detail</title></Head>
        
        <Header />

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>

                <Box >

                    {datas && <Typography sx={{ fontSize: 30, fontWeight: 'bold', mt: 5 }}>{datas.title}</Typography>}

                    <ImageList
                        sx={{ width: '70vw', height: 500, border: '1px solid #ddd', borderRadius: 5 }}
                        variant="quilted"
                        cols={2}
                        rowHeight={300}

                    >
                        {photos && photos.map((item, index) => (
                            <Images key={index} item={item} />
                        ))}
                    </ImageList>

                    <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', width: '70vw', justifyContent: 'space-between' }}>

                        <Box >
                            <Typography sx={{ fontSize: 25, fontWeight: 'bold', color: '#333', mb: 1 }}>{email}님이 호스팅하는 {groupType}</Typography>

                            <Typography sx={{ fontSize: 14 }}>최대 인원 {floorPlan?.guest}명 / 침대 {floorPlan?.bed}개 / 침실 {floorPlan?.bedroom}개 / 욕실 {floorPlan?.bathroom}개</Typography>

                            <Divider sx={{ mt: 1, mb: 1, mr: 5 }}></Divider>
                            {description && description.map((one,index) => <Chip key={index} label={one} sx={{ mr: 1, bgcolor: '#333', color: 'white', fontSize: 12 }} />)}
                            <Divider sx={{ mt: 1, mb: 1, mr: 5 }}></Divider>

                            <Typography sx={{ fontSize: 25, fontWeight: 'bold', color: '#333', mb: 1 }} >숙소 편의시설</Typography>
                            {facilities?.map((one,index) => {
                                return (<Amenities item={one} key={index}/>)
                            })}
                            {special?.map((one,index) => {
                                return (<Amenities item={one} key={index}/>)
                            })}
                            {safty?.map((one,index) => {
                                return (<Amenities item={one} key={index}/>)
                            })}

                            {location && <DetailAddress location={location} />}
                        </Box>



                        {datas && <Card sx={{ width: 300, display: 'flex' }}>
                            <CardContent>
                                <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>₩ {datas?.price}</Typography>
                                <ToggleButtonGroup
                                    fullWidth
                                    sx={{ height: 20 }}
                                    value={reservationType}
                                    onChange={handleReservationType}
                                    exclusive
                                >

                                    <ToggleButton value='checkIn'><Typography fontSize={15}>체크인</Typography>

                                    </ToggleButton>
                                    <ToggleButton value='checkOut'><Typography fontSize={15}>체크아웃</Typography>

                                    </ToggleButton>
                                </ToggleButtonGroup>
                                <Typography sx={{ fontSize: 14, fontWeight: '100', mt: 1, mb: 1 }}>{datas?.price} X 1박</Typography>

                                <Button fullWidth variant="contained" sx={[{ backgroundColor: 'black' }, { '&:hover': { backgroundColor: '#333' } }]}>예약하기</Button>
                                <Typography sx={{ textAlign: 'center', fontSize: 14, fontWeight: '100', mt: 1, mb: 1 }}>예약 확정 전에는 요금이 청구되지 않습니다.</Typography>
                                <Divider></Divider>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography sx={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold', mt: 2, mb: 1 }}>총 합계</Typography> <Typography sx={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold', mt: 2, mb: 1 }}>{Number(datas?.price) * 1} 원</Typography>
                                </Box>
                            </CardContent>

                        </Card>}

                    </Box>




                </Box></Box></>);
}
