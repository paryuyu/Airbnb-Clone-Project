import { Box, Typography } from "@mui/material";
import { signIn, signOut, useSession } from "next-auth/react";
import * as React from 'react';
import { CircularProgress } from '@mui/material';
export default function KaKaoPopup() {

    const { data, status } = useSession();

    React.useEffect(() => {

        if (status == "unauthenticated") {

           let rst =  signIn("kakao");

        } else if (status == "authenticated") {
            window.close();
        }


    }, [status])



    return (<Box display={"flex"} justifyContent={"center"} alignItems={"center"}><CircularProgress /></Box>)
}

//레이아웃 다르게 해주기.
KaKaoPopup.isLayout = false;