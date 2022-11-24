import { Box, Button, Card, CardContent, Divider, Modal, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { format } from "date-fns";

import { useState, useContext ,useEffect} from 'react';
import { CalendarCtx } from "../../../context/calendar-context";
import Calender from "./calender";
import PersonList from "./person";

function ReservationCard({ datas }: any) {
    const [reservationType, setReservationType] = useState<string | null>(null)
    const [calmodal, setcalmodal] = useState(false)
    const [date1,setdate1] =useState() as any;
    const [date2,setdate2] =useState() as any;

    const handleReservationType = (event: React.MouseEvent<HTMLElement, MouseEvent>
    ) => {
        // let val = event.currentTarget.value as any;
        // setReservationType(val) //타입오류잡기
    }

    const ctx = useContext(CalendarCtx)
  
    useEffect(()=>{
        if (ctx.date[0] !== null) {
            const date = format(ctx.date[0], 'yyyy.MM.dd.') as any;
            setdate1(date)
        }
        
        if(ctx.date[1] !== null){
            const date = format(ctx.date[1], 'yyyy.MM.dd.') as any;
            setdate2(date)
        }
    },[ctx.date])
    return (<>

        <Card sx={{ width: 300, position: 'relative' }}>
            <CardContent>
                <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>₩ {datas?.price}</Typography>
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

                    <ToggleButton sx={{ color: 'grey' }} value='checkOut'  onClick={() => { setcalmodal(true) }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography fontSize={12}>체크아웃</Typography>
                    {ctx.date[1] && <Typography fontSize={15}>{date2}</Typography>}
                    </Box>
                    </ToggleButton>
              
                </ToggleButtonGroup>

                <Box sx={[{ border: '1px solid #ddd', cursor: 'pointer', mt: 2, borderRadius: 1, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center' }, { '&:hover': { bgcolor: '#ddd' } }]}
                ><Typography sx={{ fontSize: 15, color: 'grey' }}>인원</Typography></Box>
                
        <PersonList/>
                <Typography sx={{ fontSize: 14, fontWeight: '100', mt: 1, mb: 1 }}>{datas?.price} X 1박</Typography>

                <Button fullWidth variant="contained" sx={[{ backgroundColor: 'black' }, { '&:hover': { backgroundColor: '#333' } }]}>예약하기</Button>
                <Typography sx={{ textAlign: 'center', fontSize: 14, fontWeight: '100', mt: 1, mb: 1 }}>예약 확정 전에는 요금이 청구되지 않습니다.</Typography>
                <Divider></Divider>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold', mt: 2, mb: 1 }}>총 합계</Typography> <Typography sx={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold', mt: 2, mb: 1 }}>{Number(datas?.price) * 1} 원</Typography>
                </Box>
            </CardContent>

        </Card>
        <Modal
            open={calmodal}
            onClose={() => { setcalmodal(false) }}
        ><Box><Calender /></Box></Modal>
        

    </>);
}
 
export default ReservationCard;