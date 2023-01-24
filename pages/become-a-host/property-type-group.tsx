import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import React from "react";
import { AccomodationData } from "../../lib/model/accomodation";
import { useSession } from "next-auth/react";
import { Dummy } from "../../lib/model/dummy";
import Head from 'next/head'
import GroupType from "../../components/ui/property/groupType";
import HeaderTwo from "../../components/layout2/header2";
import FooterTwo from '../../components/layout2/footer2';
import { BackDropContext } from "../_app";
import { outlinedBox } from "../../components/containerStyle";
export default function PropertyGroup() {
    const [chk, setChk] = React.useState<string>('');
    const [rstData, setRstData] = React.useState<AccomodationData>();
    const [findData, setFindData] = React.useState<Dummy[]>([]);
    let { data, status } = useSession();
    
    const backCtx = React.useContext(BackDropContext);
    const router = useRouter();

    async function DummyFind() {
        let res = await fetch("/api/accomodation/dummyfound");
        let json = await res.json();
        if(json.result){
            setFindData(json.data)
            backCtx.setBackDrop(false)
        }

    }

    React.useEffect(() => {
        DummyFind()
    }, [])


    async function CreateData() {
        backCtx.setBackDrop(true)
        let create = await fetch("/api/accomodation/create", {
            method: "post",
            body: JSON.stringify({ groupType: chk , step:1 ,publish:false}),
            headers: { "Content-type": "application/json" }
        })
        
        console.log(create)
        let rst = await create.json();
        setRstData(rst.data);

        if (rst.data) {
            backCtx.setBackDrop(false)
            router.push("/become-a-host/" + rst.data._id + "/property-type")
        }

    }

    const handleChk = (one: any) => {
        setChk(one)
    }

    const handleClick = () => {
        let con = confirm('등록이 취소됩니다. 나가시겠습니까?')
        if (con) {
            router.push('/become-a-host')
        }

    }

    const handleNext = () => {
        CreateData()
    }

    return (
        <>
            <Head>
                <title>숙소유형</title>
            </Head>
            <HeaderTwo />
            <Box sx={outlinedBox} >

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
            <FooterTwo onBack={handleClick} onNext={handleNext} datas={chk.length} step={1} />
        </>);
}

PropertyGroup.layout = "L2";
