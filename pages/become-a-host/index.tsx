import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from "next/router";
import React from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { AccomodationData } from "../../lib/model/accomodation";
import RoomList from "../../components/ui/hosting-first/list";
import Head from "next/head";
export default function BecomeAHostPropertyTypeGroup() {

    const { data, status } = useSession();
    const [rstdata, setrstdata] = React.useState<AccomodationData[]>();
    const router = useRouter();

    const handleNew = () => {
        router.push("/become-a-host/property-type-group");
    }

    async function IncompleteData() {
        let find = await fetch("/api/accomodation/roomtypefind")
        let rst = await find.json();
        console.log(rst)
        if (rst.data.length > 0) {
            setrstdata(rst.data);
        }
    }

    React.useEffect(() => {
        if (data && status === "authenticated") {
            IncompleteData()
        }
    }, [status])

  

    return (
        <>
        <Head>
            <title>호스팅 홈</title>
        </Head>
        <Grid component={"main"} container  >

            <Grid item sx={{ display: "flex", flex: 1, bgcolor: "black", color: "white", height: '100vh', alignItems: "center", justifyContent: "center" }}
            >
                <Typography component="h1" variant="h5" textAlign={"center"}>
                    호스팅 할 숙소 유형을 알려주세요
                </Typography>
            </Grid>

            <Grid item sx={{ display: "flex", flex: 1, flexDirection: "column", height: '100vh', pr: 10, pl: 10 }}>

                {rstdata && 
                    <Typography fontSize={20} fontWeight={"bold"} pl={2} mt={4}>숙소 등록 완료하기</Typography>}


                {rstdata && rstdata.map((one) => {
                    return (<>
                        <RoomList item={one}/>
                    </>)
                })}

                <Typography fontSize={20} fontWeight={"bold"} pl={2} mt={3}>숙소 등록 시작하기</Typography>

                <Box border={'3px solid #d0d0d0'} borderRadius={"10px"} p={2} m={2} sx={[{ cursor: "pointer" }, { "&:hover": { borderColor: "black" } }]} onClick={handleNew}>
                    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }} >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <AddIcon sx={{ p: "2px", borderRadius: 2, mr: 2, fontSize: 30 }} /><Typography fontSize={13.5}>새로운 숙소 등록하기</Typography>
                        </Box>
                        <KeyboardArrowRightIcon />

                    </Box>
                </Box>
                <Link href={"/"}>
                    <Button>나가기</Button>
                </Link>
            </Grid>
        </Grid>
</>
    );
}

BecomeAHostPropertyTypeGroup.isLayout = false