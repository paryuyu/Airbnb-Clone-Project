import { Box, Button, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
export default function Privacy() {

    const router = useRouter();
    const { itemId } = router.query;


    async function PrivacyTypeUpdate(privacyType : string) {
        let update = await fetch("/api/accomodation/update", {
            method: "post",
            body: JSON.stringify({ itemId: itemId, privacyType: privacyType }),
            headers: { "Content-type": "application/json" }
        })

        let finalRst = await update.json();

        if (finalRst) {
            router.push("/become-a-host/" + itemId + "/location")
        }
    }


    const handleClick :React.MouseEventHandler<HTMLDivElement> = (evt) => {
        let privacyType = evt.currentTarget.innerText as string;
        if (itemId && privacyType) {
            PrivacyTypeUpdate(privacyType)
        }
    }

    const BackHandle = () => {
        router.push("/become-a-host/" + itemId + "/property-type")
    }

    return (<Grid component={"main"} container  >

        <Grid item sx={{ display: "flex", flex: 1, bgcolor: "black", color: "white", height: '100vh', alignItems: "center", justifyContent: "center" }}
        >
            <Typography component="h1" variant="h5" textAlign={"center"}>
                게스트가 머무르게 될 숙소의 종류가 무엇인가요?
            </Typography>
        </Grid>

        <Grid item sx={{ display: "flex", flex: 1, flexDirection: "column", height: '100vh', pr: 10, pl: 10, justifyContent: "center" }}>

            <Box border={'3px solid #d0d0d0'} borderRadius={"10px"} p={2} m={2} sx={[{ cursor: "pointer" }, { "&:hover": { borderColor: "black" } }]} onClick={handleClick} >
                <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography fontSize={15}>공간전체</Typography>
                    </Box>
                    <KeyboardArrowRightIcon
                    />
                </Box>
            </Box>
            <Box border={'3px solid #d0d0d0'} borderRadius={"10px"} p={2} m={2} sx={[{ cursor: "pointer" }, { "&:hover": { borderColor: "black" } }]} onClick={handleClick} >
                <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography fontSize={15}>개인실</Typography>
                    </Box>
                    <KeyboardArrowRightIcon
                    />
                </Box>
            </Box>
            <Box border={'3px solid #d0d0d0'} borderRadius={"10px"} p={2} m={2} sx={[{ cursor: "pointer" }, { "&:hover": { borderColor: "black" } }]} onClick={handleClick} >
                <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography fontSize={15}>다인실</Typography>
                    </Box>
                    <KeyboardArrowRightIcon
                    />
                </Box>
            </Box>
            <Button variant="outlined" sx={{ width: 10, mt: 5 }} onClick={BackHandle}>뒤로</Button>
        </Grid>
    </Grid>);
}

