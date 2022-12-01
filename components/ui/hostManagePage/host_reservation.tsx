import { FormatTextdirectionRToL, Tune } from "@mui/icons-material";
import { Button, Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { formatDistance } from "date-fns";
import { useEffect, useState } from 'react';
function ReservationList({ datas }: any) {


    let [night, setNight] = useState<number>(0);
    let [date, setDate] = useState<string>('')
    useEffect(() => {
        let checkIn = new Date(datas.checkout) as any;
        let checkOut = new Date(datas.checkin) as any;

        setNight((checkIn - checkOut) / (1000 * 60 * 60 * 24))

        let formatter = new Intl.RelativeTimeFormat('ko', { numeric: 'auto' });
        let chkin = new Date(datas.checkin) as any;
        let today = new Date() as any;
        const dayPress = Math.ceil((chkin - today) / (1000 * 60 * 60 * 24));
        setDate(formatter.format(dayPress, 'day'))
    }, [])



    return (<>
   
    <Box sx={{ border: '2px solid #ddd', padding: 1.5, margin: 1, borderRadius: 5 }}>

        <Typography sx={{ fontWeight: 'bold', mb: 1 }}>예약자 연락처: {datas.guestEmail}</Typography>
        <Typography sx={{ fontSize: 'small', fontWeight: '100', color: 'grey' }}></Typography>

        <Typography>체크인: {new Date(datas.checkin).toLocaleDateString('ko', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'short' })}</Typography>

        <Typography  sx={{mb:1}}>체크아웃: {new Date(datas.checkout).toLocaleDateString('ko', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'short' })}</Typography>
        
        <Typography sx={{mb:1}}>예약확정날짜: {new Date(datas.reservationTime).toLocaleDateString('ko', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'short' })}</Typography>

        <Typography>인원: {parseInt(datas.numberOfAdults) + parseInt(datas.numberOfChildren)}명</Typography>
        <Typography sx={{ fontSize: 'small', fontWeight: '100', color: 'grey' }}>게스트 인원은 어른과 어린이가 포함된 인원입니다.</Typography>
      { datas.numberOfInfants !==0 && <Typography>유아: {parseInt(datas.numberOfInfants)}명</Typography>}
      { datas.numberOfPets !==0 && <Typography>반려동물: {parseInt(datas.numberOfPets)}마리</Typography>}
       

      <Typography sx={{ fontSize: 'small', fontWeight: '100', color: 'grey' }}>기간: {night}박</Typography>
        <Typography sx={{ fontSize: 'small', fontWeight: '100', color: 'grey' }}>체크인 {date}</Typography>

    </Box>
 
    
    </>);
}

export default ReservationList;