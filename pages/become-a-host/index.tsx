import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { AccomodationData } from "../../lib/model/accomodation";
import RoomList from "../../components/ui/hosting-first/list";
import Head from "next/head";
import HeaderTwo from "../../components/layout2/header2";
import { BackDropContext } from "../_app";
export default function BecomeAHostPropertyTypeGroup() {
    const { data, status } = useSession();
    const router = useRouter();

    const [userId, setUserId] = React.useState<string>('')
    const [rstdata, setrstdata] = React.useState<AccomodationData[]>([]);

    const handleNew = () => {
        router.push("/become-a-host/property-type-group");
    }


    async function IncompleteData() {
        let find = await fetch("/api/accomodation/roomtypefind")
        let rst = await find.json();

        if (rst.result ) {
            setrstdata(rst.data);
        }else{
            return;
        }
    }

    React.useEffect(() => {

        if (data && status === "authenticated") {
            let email = data?.user!.email as any;
            let arr = email?.split('@')
            setUserId(arr[0])
            IncompleteData()
        }
    }, [status])



    return (
        <>
            <Head>
                <title>호스팅 시작하기</title>
            </Head>
            <HeaderTwo />
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box sx={{ ...outlineBox }}>

                    <Typography variant="h3">{userId}님, 환영합니다.</Typography>
                    {rstdata?.length > 0 &&
                        <Typography fontSize={20} fontWeight={"bold"} pl={2} mt={4}>숙소 등록 완료하기</Typography>}


                    {rstdata && rstdata.map((one) => {
                        return (<>
                            <RoomList item={one} />
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
                </Box>


            </Box>

        </>
    );
}

const outlineBox = {
    display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '70vh', width: '50vw'
}



const buttonSt = {
    bgcolor: 'black',
    borderRadius: 5,
    mb: 2
}


BecomeAHostPropertyTypeGroup.isLayout = false