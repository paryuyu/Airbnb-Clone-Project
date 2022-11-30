import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useRouter } from "next/router";
import React from "react";
import { AccomodationData } from "../../lib/model/accomodation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Dummy } from "../../lib/model/dummy";
import Head from 'next/head'
import GroupType from "../../components/ui/property/groupType";
import HeaderTwo from "../../components/layout2/header2";
import FooterTwo from '../../components/layout2/footer2';
export default function PropertyGroup() {
    const [chk, setChk] = React.useState<string>('');
    const [rstData, setRstData] = React.useState<AccomodationData>();
    const [findData, setFindData] = React.useState<Dummy[]>();
    let { data, status } = useSession();

    const router = useRouter();

    React.useEffect(() => {
        fetch("/api/accomodation/dummyfound")
            .then(rc => rc.json())
            .then(rst => setFindData(rst.data))
    }, [])


    async function CreateData() {
        let create = await fetch("/api/accomodation/create", {
            method: "post",
            body: JSON.stringify({ groupType: chk }),
            headers: { "Content-type": "application/json" }
        })

        let rst = await create.json();
        setRstData(rst.data);

        if (rst.data) {
            router.push("/become-a-host/" + rst.data._id + "/property-type")
        }

    }

    const handleChk = (one:any) => {
        setChk(one)
    }

    const handleClick = () => {
        let con = confirm('등록이 취소됩니다. 나가시겠습니까?')
        if (con) {
            router.push('/become-a-host')
        }

    }

    const handleNext = ()=>{
        CreateData()
    }

    return (
        <>
            <Head>
                <title>호스팅_</title>
            </Head>
            <HeaderTwo/>

            <Box sx={{ width: '60vw', margin: 'auto', display: 'flex', flexDirection: 'column' }} >

                <Typography sx={{ fontSize: 25, fontWeight: 'bold', textAlign: 'center', mb: 3, mt: 5 }}>
                    호스팅 할 숙소 유형을 알려주세요
                </Typography>
                <Box >

                    {findData && findData.map((one) => {
                        return (
                            <>
                                <GroupType one={one} onChk={handleChk} chk={chk} />

                            </>
                        )
                    })}

                </Box>
                
            </Box>
<FooterTwo onBack={handleClick} onNext={handleNext} datas={chk} step={1}/>
        </>);
}

PropertyGroup.layout = "L2";


const buttonBox = {
    display: 'flex', justifyContent: 'space-between', ml: 5, mr: 5,

}

const button = {
    bgcolor: 'black',
    borderRadius: 5,
    mt: 2
}
