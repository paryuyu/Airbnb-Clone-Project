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
export default function PropertyGroup() {
    const [chk,setChk] = React.useState<string>('');
    const [rstData, setRstData] = React.useState<AccomodationData>();
    const [findData, setFindData] = React.useState<Dummy[]>();
    let { data, status } = useSession();

    const router = useRouter();
    React.useEffect(() => {
        fetch("/api/accomodation/dummyfound")
            .then(rc => rc.json())
            .then(rst => setFindData(rst.data))

    }, [])


    async function CreateData(groupType: string) {
        let create = await fetch("/api/accomodation/create", {
            method: "post",
            body: JSON.stringify({ groupType: groupType }),
            headers: { "Content-type": "application/json" }
        })

        let rst = await create.json();
        setRstData(rst.data);

        if (rst.data) {
            router.push("/become-a-host/" + rst.data._id + "/property-type")
        }
    }

    const hanldleGroupType: React.MouseEventHandler<HTMLDivElement> = (evt) => {
        let groupType = evt.currentTarget.innerText as string;
        CreateData(groupType);
        setChk(groupType);
    }

    const handleClick = () => {
        let con = confirm('등록이 취소됩니다. 나가시겠습니까?')
        console.log(con)
        if (con) {
            router.push('/become-a-host')
        }

    }

    return (
        <>
            <Head>
                <title>호스팅_</title>
            </Head>
            <Box sx={{width:'60vw' , margin:'auto', display:'flex' , flexDirection:'column'}} >
                
                <Typography sx={{ fontSize: 25, fontWeight: 'bold', textAlign: 'center', mb: 3, mt: 5 }}>
                    호스팅 할 숙소 유형을 알려주세요
                </Typography>
                <Box >

                    {findData && findData.map((one) => {
                        return (
                    <>
                
                     <Box border={'3px solid #d0d0d0'} borderRadius={"10px"} p={2} m={2} sx={[{ cursor: "pointer" }, { "&:hover": { borderColor: "black" } }]} onClick={hanldleGroupType}>
                            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Typography fontSize={15}>{one.group}</Typography>
                                </Box>
                            </Box>
                        </Box>
     
                    </>
                       
                        
                        )
                    })}

                </Box>
                <Box sx={{ ...buttonBox }}>
                    <Button variant="contained" sx={[{ ...button }, { '&:hover': { backgroundColor: '#333' } }]} onClick={handleClick}>뒤로</Button>
                    <Button variant="contained" sx={[{ ...button }, { '&:hover': { backgroundColor: '#333' } }]} onClick={handleClick}>다음</Button>
                </Box>
            </Box>

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
