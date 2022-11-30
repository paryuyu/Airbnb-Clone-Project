import { Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";

function ReservationList({datas}:any) {
        console.log(datas,'?!?@?!@?!@?!@?!@?!@?!?@!?@')
    return ( <><Box sx={{border:'2px solid #ddd' , padding:1 , margin:1}}>
        <Typography>예약자 연락처: {datas.guestEmail}</Typography>
    <Typography>체크인: {new Date(datas.checkin).toLocaleDateString('ko',{year:'numeric',month:'long', day:'numeric' , weekday:'short'})}</Typography>
    <Typography>체크아웃: {new Date(datas.checkout).toLocaleDateString('ko',{year:'numeric',month:'long', day:'numeric' , weekday:'short'})}</Typography>
    <Typography>인원: {parseInt(datas.numberOfAdults)+parseInt(datas.numberOfChildren)}명</Typography>
    <Typography>어른과 어린이가 포함된 인원입니다.</Typography>
    <Typography>유아: {parseInt(datas.numberOfInfants)}명</Typography>
    <Typography>어른과 어린이가 포함된 인원입니다.</Typography>
    <Typography>예약확정날짜: {new Date(datas.reservationTime).toLocaleDateString('ko',{year:'numeric',month:'long', day:'numeric' , weekday:'short'})}</Typography>
    </Box></> );
}

export default ReservationList;