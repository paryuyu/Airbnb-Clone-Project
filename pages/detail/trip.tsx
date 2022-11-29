import { Box, Button, Card, CardContent, CardMedia, Divider, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import Header from "../../components/layout/header";
import TripCard from "../../components/ui/trip/trip-card";




function Trip() {

    let { status } = useSession();
    const [totalData, setTotalData] = useState<string[]>([])
    const [cover, setCover] = useState<string>()
    async function findReservationData() {
        let res = await fetch('/api/reservation/find');
        let json = await res.json();
        console.log(json, '왜 안나오니')

        if (json.result) {
            setTotalData(json.data)
            setCover(json.data)
        }
    }

    console.log(totalData, '???????')
    useEffect(() => {
        findReservationData();
    }, [status])


    return (<>
        <Head><title>여행상세페이지</title></Head>
        <Header />
        {status === 'authenticated' ?
            <>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    {totalData.length > 0 && totalData.map(one => {
                        return (<><TripCard datas={one} /></>)
                    })}
                </Box>

                <Link href={'/'}>
                    <Button variant="contained" sx={[{ ...buttonSt }, { '&:hover': { bgcolor: '#333' } }]}>숙소 검색하기</Button>
                </Link>







            </>
            : <Typography>로그인 후 이용해주세요</Typography>}
    </>

    );
}

export default Trip;



const buttonSt = {
    bgcolor: 'black',
    borderRadius: 5,
    mb: 2
}

