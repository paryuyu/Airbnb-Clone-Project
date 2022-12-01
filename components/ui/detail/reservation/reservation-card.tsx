import { Box, Button, Card, CardContent, Divider, Modal, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { format, formatDistance } from "date-fns";
import { ko } from "date-fns/locale";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { useState, useContext, useEffect } from 'react';
import { ReservationCtx } from "../../../../context/reservation-context";
import Calender from "./calender";
import GuestList from "./guests";
import PriceCalc from "./price-calc";

function ReservationCard({ datas }: any) {
    const [reservationType, setReservationType] = useState<string | null>(null)
    const [calmodal, setcalmodal] = useState(false)
    const [date1, setdate1] = useState() as any;
    const [date2, setdate2] = useState() as any;
    const {data,status} = useSession();
    const ctx = useContext(ReservationCtx)
    const router = useRouter();
    let _id = router.query._id as string;
    const [guestOpen, setGuestOpen] = useState<boolean>(false);
    const handleReservationType = (event: React.MouseEvent<HTMLElement, MouseEvent>
    ) => {
        // let val = event.currentTarget.value as any;
        // setReservationType(val) //타입오류잡기
    }
    useEffect(() => {
        ctx.setLimitGuest(datas.floorPlan.guest)
        ctx.setPrice(datas.price)
        if (ctx.date[0] !== null) {
            const date = format(ctx.date[0], 'yyyy.MM.dd.') as any;
            setdate1(date)
        }

        if (ctx.date[1] !== null) {
            const date = format(ctx.date[1], 'yyyy.MM.dd.') as any;
            setdate2(date)
        }
        if (ctx.date[0] !== null && ctx.date[1] !== null) {
            let day = (Math.ceil(ctx.date[1] - ctx.date[0]) / (1000 * 60 * 60 * 24))
            ctx.setNight(day)
        }

    }, [ctx.date, datas])


    const handleReservation = () => {
        //디비붙이고, 예약페이지로 가기
        if(status === 'authenticated'){
            if (ctx.date[0] !== null && ctx.date[1] !== null) {
                let chkin = format(ctx.date[0], 'yyyy-MM-dd');
                let chkout = format(ctx.date[1], 'yyyy-MM-dd');
                router.push(`/book/stay?numberOfAdults=${ctx.adult}&numberOfChildren=${ctx.child}&numberOfInfants=${ctx.infant}&numberOfPets=${ctx.pet}&checkin=${chkin}&checkout=${chkout}&guestCurrency=krw&productId=${_id}&numberOfGuests=${ctx.totalGuest}`)
            }
        }else if (status === 'unauthenticated'){
            alert('로그인 후 이용해주세요.')
        }
       
    }

    let formatter = new Intl.NumberFormat('ko',{
    style:'currency',
currency:'krw'})



    return (<>

        <Card sx={{position:'sticky', top:50}}>
            <CardContent>
                <Box sx={{display:'flex'}}>
                <Typography sx={{ fontSize: 25, fontWeight: 'bold' , mb:2 }}>{formatter.format(datas.price)}</Typography> <Typography sx={{ fontSize: 25, fontWeight: '100' , mb:2 , ml:1 }}> /박</Typography>
                </Box>



                <ToggleButtonGroup
                    fullWidth
                    sx={{ height: 50 }}
                    value={reservationType}
                    onChange={handleReservationType}
                    exclusive
                >
                    <ToggleButton sx={{ color: 'grey' }} value='checkIn' onClick={() => { setcalmodal(true) }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography fontSize={12}>체크인</Typography>
                            {ctx.date[0] && <Typography fontSize={15}>{date1}</Typography>}
                        </Box>
                    </ToggleButton>

                    <ToggleButton sx={{ color: 'grey' }} value='checkOut' onClick={() => { setcalmodal(true) }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography fontSize={12}>체크아웃</Typography>
                            {ctx.date[1] && <Typography fontSize={15}>{date2}</Typography>}
                        </Box>
                    </ToggleButton>

                </ToggleButtonGroup>

                <Box sx={[{ ...boxStyle }, { '&:hover': { bgcolor: '#ddd' } }]} onClick={() => setGuestOpen(current => !current)}
                >
                    <Typography sx={{ fontSize: 12, color: 'grey' }}>인원</Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        {ctx.totalGuest !== 0 && <Typography fontSize={15}>게스트 {ctx.totalGuest}명 </Typography>}
                        {ctx.totalGuest !== 0 && ctx.infant !== 0 ? <Typography fontSize={15}>, </Typography> : <></>}
                        {ctx.infant !== 0 && <Typography fontSize={15}> 유아 {ctx.infant}명 </Typography>}
                    </Box>
                </Box>

                {guestOpen &&
                    <GuestList />
                }


                <Button fullWidth variant="contained" sx={[{ ...bt }, { '&:hover': { backgroundColor: '#333' } }]}
                    onClick={handleReservation}
                >예약하기</Button>

                <Typography sx={{ textAlign: 'center', fontSize: 14, fontWeight: '100', mt: 1, mb: 1 }}>예약 확정 전에는 요금이 청구되지 않습니다.</Typography>
                <PriceCalc />

            </CardContent>

        </Card>
        <Modal
            open={calmodal}
            onClose={() => { setcalmodal(false) }}
        ><Box sx={{bgcolor:'white', width:'100%', padding:2, display:'flex', justifyContent:'center', alignItems:'center'}}>
            <Calender />
            </Box></Modal>


    </>);
}

export default ReservationCard;
//마무리
const boxStyle = { border: '1px solid #ddd', cursor: 'pointer', mt: 2, borderRadius: 1, height: 50, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }

const bt = { backgroundColor: 'black', mt: 2 }