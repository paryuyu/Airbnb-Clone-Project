import { DatasetTwoTone } from "@mui/icons-material";
import { Box, Button, Card, CardContent, CardMedia, Divider, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import Header from "../../components/layout/header";
import TripCard from "../../components/ui/trip/trip-card";
import { BackDropContext } from "../_app";




function Trip() {


    const backCtx = useContext(BackDropContext);
    let { status } = useSession();
    const [totalData, setTotalData] = useState<any[]>([])
    const [cover, setCover] = useState<string>()
    const [past, setPast] = useState<any[]>([]);
    const [future, setFuture] = useState<any[]>([]);
    async function findReservationData() {
        let res = await fetch('/api/reservation/find');
        let json = await res.json();
 

        if (json.result) {
            setTotalData(json.data)
            setCover(json.data)
            backCtx.setBackDrop(false)
            let reservations = json.data as any[]
            let futureReservation = reservations.map(one => {
                if (new Date(one.checkout) >= new Date() && one.product.length > 0) {
                    return one
                }
            }
            )
            let pastReservation = reservations.map(one => {
                if (new Date(one.checkout) <= new Date() && one.product.length > 0) {
                    return one
                }
            }
            )


            setFuture(futureReservation)
            setPast(pastReservation)
            if(past.length>0 || future.length>0){
                console.log(past,'past',future,'futuer')

            }
        }
    }

    useEffect(() => {
        backCtx.setBackDrop(true)
        if (status === 'authenticated') {
            findReservationData();
        }

    }, [status])


    return (<>
        <Head><title>여행상세페이지</title></Head>
        <Header />


        {status === 'authenticated' ?

            <Box sx={{ margin: 2 }}>
{totalData.length == 0 ?<Typography>예약내역이 없습니다.</Typography> :<> 
                {future.length > 0 && <Typography variant="h4">예약숙소</Typography>}

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    {future.map((one, index) => {
                        return (<><TripCard datas={one} key={index} /></>)

                    })}
                </Box>

                {past.length>0 && <Typography variant="h4">지난숙소</Typography>}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    {past.map((one, index) => {
                        return (<><TripCard datas={one} key={index} /></>)

                    })}


</Box>
                    
</> }

            </Box>

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

