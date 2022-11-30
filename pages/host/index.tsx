import { Box, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useEffect, useState } from 'react';
import Header from "../../components/layout/header";
import HostRoom from "../../components/ui/hostManagePage/host_room";

function HostPage() {
    let { status, data } = useSession()
    let [roomData, setRoomData] = useState<any[]>([])
    let [refresh, setRefresh] =useState<boolean>(false)

    async function RoomFindReq() {
        let res = await fetch('/api/accomodation/roomtypefind')
        let json = await res.json();
        console.log(json)
        if (json.result) {
            setRoomData(json.data)
        }
    }

    useEffect(() => {
        console.log(data)
        if (status === 'authenticated') {
            RoomFindReq()
        }

    }, [status,refresh])

    //숙소관리
    // 1. 숙소 삭제
    // 2. 예약 관리
    const handleRefresh = ()=>{
        setRefresh((current)=>!current)
        console.log('//12121')
    }

    return (<>
        <Head><title>호스트페이지</title></Head>
        <Header/>
        {status === 'authenticated' ?
            <Box >

                {roomData.length > 0 && <>
                    <Typography>숙소관리</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                        {roomData.map((one, index) => {
                            return <HostRoom datas={one} key={index} onRefresh={handleRefresh}/>
                        })
                        }
                    </Box>
                </>

                }
            </Box> : <Typography>로그인 후 사용해주세요.</Typography>}

    </>);
}

export default HostPage;