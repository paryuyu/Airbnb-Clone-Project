import { Box, Divider, Typography } from "@mui/material";
import { useContext, useEffect, useState } from 'react';
import { ReservationCtx } from "../../../../context/reservation-context";
function PriceCalc() {
    //context -> 수수료 계산금액(1.4), 총 계산금액 / 몇박인지 넣기 /원래 가격도 넣기
    let ctx = useContext(ReservationCtx);
    
    let formatter = new Intl.NumberFormat('ko',{
        style:'currency',
        currency:'krw'}); 

    useEffect(() => {
        let onePrice = ctx.price * ctx.night;
        let commission = Math.ceil(onePrice * 0.14);
        ctx.setCommissionPrice(commission)
        

    }, [ctx.night, ctx.price])


    return (<>
        <Divider />
        <Box sx={{ ...boxStyle }}>
            <Typography sx={{ fontSize: 18, fontWeight: '100', mt: 1, mb: 1 }}>₩{ctx.price} X {ctx.night}박</Typography>
            <Typography sx={{ fontSize: 18, fontWeight: 'bold', mt: 1, mb: 1 }}>{formatter.format(ctx.price*ctx.night)}</Typography>
        </Box>
        <Box sx={{ ...boxStyle }}>
            <Typography sx={{ fontSize: 18, fontWeight: '100', mt: 1, mb: 1 }}>서비스 수수료</Typography>
            <Typography sx={{ fontSize: 18, fontWeight: 'bold', mt: 1, mb: 1 }}>{formatter.format(ctx.commissionPrice)}</Typography>
        </Box>
        <Divider></Divider>


        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold', mt: 2, mb: 1 }}>총 합계</Typography> <Typography sx={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold', mt: 2, mb: 1 }}>{formatter.format(ctx.totalPrice)}</Typography>
        </Box>

    </>);
}


export default PriceCalc;

const boxStyle = {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: 'white', borderRadius: 4, maxWidth: '100%', p: 0.5
}