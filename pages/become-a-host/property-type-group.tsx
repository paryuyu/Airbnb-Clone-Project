import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useRouter } from "next/router";
import React from "react";
import { AccomodationData } from "../../lib/model/accomodation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Dummy } from "../../lib/model/dummy";


export default function PropertyGroup() {
    const [rstData, setRstData] = React.useState<AccomodationData>();
    const [findData, setFindData] = React.useState<Dummy[]>();
    let { data, status } = useSession();

    const router = useRouter();
    React.useEffect(() => {
        fetch("/api/accomodation/dummyfound")
            .then(rc => rc.json())
            .then(rst => setFindData(rst.data))

            console.log(findData,"!@!@!@!@!@!@!@!@!@!")
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

    const hanldleGroupType :React.MouseEventHandler<HTMLDivElement> = (evt) => {
        let groupType = evt.currentTarget.innerText as string;
        CreateData(groupType);
    }

    return (

        <Grid component={"main"} container  >

            <Grid item sx={{ display: "flex", flex: 1, bgcolor: "black", color: "white", height: '100vh', alignItems: "center", justifyContent: "center" }}
            >
                <Typography component="h1" variant="h5" textAlign={"center"}>
                    호스팅 할 숙소 유형을 알려주세요
                </Typography>
            </Grid>
            <Grid item sx={{ display: "flex", flex: 1, flexDirection: "column", height: '100vh', pr: 10, pl: 10, justifyContent: "center" }}>

                {findData && findData.map((one) => {
                    return (<Box border={'3px solid #d0d0d0'} borderRadius={"10px"} p={2} m={2} sx={[{ cursor: "pointer" }, { "&:hover": { borderColor: "black" } }]} onClick={hanldleGroupType}>
                        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Typography fontSize={15}>{one.group}</Typography>
                            </Box>
                            <KeyboardArrowRightIcon />
                        </Box>
                    </Box>)
                })}
                <Link href={"/become-a-host"}>
                    <Button>나가기</Button>
                </Link>
            </Grid>
        </Grid>);
}

PropertyGroup.layout = "L2";