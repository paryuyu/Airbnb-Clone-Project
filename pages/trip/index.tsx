import { Box, Button, Card, CardMedia, Divider, Typography } from "@mui/material";
import Head from "next/head";
import { useEffect } from "react";




function Trip() {


    async function findData() {
        let res = await fetch('/api/reservation/find');
        let json = await res.json();
        console.log(json)
    }

    useEffect(()=>{
        findData();
    
    },[])
    
    
    return (<>
        <Head><title>여행목록</title></Head>

        <Typography variant="h3">여행</Typography>
        <Divider />
        <Box>
            <Card>
                <CardMedia
                ></CardMedia>
            </Card>
        </Box>

        <Button variant="contained">숙소 검색하기</Button>
        <Divider />
    </>

    );
}

export default Trip;