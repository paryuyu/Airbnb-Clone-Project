import { Box, Divider, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useContext, useEffect, useState } from 'react';
import Header from "../../components/layout/header";
import HostRoom from "../../components/ui/hostManagePage/host_room";
import { BackDropContext } from "../_app";

function HostPage() {
    let { status, data } = useSession()
    let [roomData, setRoomData] = useState<any[]>([])
    let [refresh, setRefresh] = useState<boolean>(false)
    let backCtx = useContext(BackDropContext);
    async function RoomFindReq() {
        let res = await fetch('/api/accomodation/roomtypefind')
        let json = await res.json();

        if (json.result) {
            backCtx.setBackDrop(false)
            setRoomData(json.data)
        }
    }

    useEffect(() => {
        backCtx.setBackDrop(true)
        console.log(data)
        if (status === 'authenticated') {
            RoomFindReq()
        }

    }, [status, refresh])

    //숙소관리
    // 1. 숙소 삭제
    // 2. 예약 관리
    const handleRefresh = () => {
        setRefresh((current) => !current)
        console.log('//12121')
    }

    return (<>
        <Head><title>호스트페이지</title></Head>
        <Header />
        {status === 'authenticated' ?

            <Box sx={{ margin: 2 }} >

                        <Typography variant="h4">숙소관리</Typography>
                        
                    {roomData.length > 0 ? <>
                        <Divider ></Divider>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
                            {roomData.map((one, index) => {
                                return <HostRoom datas={one} key={index} onRefresh={handleRefresh} />
                            })
                            }
                        </Box>

                    </> : <Typography>등록된 숙소정보가 없습니다.</Typography>}





            </Box> : <Typography>로그인 후 사용해주세요.</Typography>}

    </>);
}

export default HostPage;