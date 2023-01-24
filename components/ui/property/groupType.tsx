import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from 'react';
import { Dummy } from "../../../lib/model/dummy";

type props = {
    one: any;
    onChk: (one: string) => void;
    chk: string;
}

export default function GroupType({ one, onChk, chk }: props) {
    // console.log(one.group,'이상하네')
    return (<>

        {chk === one.group ?

            <Box border={'3px solid #333'} borderRadius={"10px"} p={2} m={2} sx={[{ cursor: "pointer"}, { "&:hover": { borderColor: "black" } }]} onClick={() => { onChk(one.group) }}>
                <Box sx={{ display: "flex", alignItems: "center"}}>
                    <Typography fontSize={15}>{one.group}</Typography>
                </Box>
            </Box>

            : <Box border={'3px solid #ddd'} borderRadius={"10px"} p={2} m={2} sx={[{ cursor: "pointer" }, { "&:hover": { borderColor: "black" } }]} onClick={() => { onChk(one.group) }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography fontSize={15}>{one.group}</Typography>
                </Box>
            </Box>}



    </>);
};