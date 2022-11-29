
import { Box, TextField, Typography } from "@mui/material";
import { DateRange, StaticDateRangePicker } from "@mui/x-date-pickers-pro";
import { useState, useEffect, useContext } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers'
import { ko } from 'date-fns/locale'
import { ReservationCtx } from "../../../../context/reservation-context";
import { useRouter } from "next/router";
import { format } from "date-fns";

export default function Calender() {
    let [chkDate, setChkDate] = useState<any[]>();
    // const [value, setValue] = useState<DateRange<Date>>([null, null]);
    let [date1,setDate1] = useState<string>()
    let [date2,setDate2] = useState<string>()
    const ctx = useContext(ReservationCtx);
    const router = useRouter();
    async function findDate() {
        let res = await fetch('/api/reservation/find', {
            method: 'post',
            body: JSON.stringify({ productId: router.query._id }),
            headers: { 'Content-type': 'application/json' }
        })
        let json = await res.json()
        if (json.result) {
            let arr = json.data as any[]
            setChkDate(arr)
        }
    }

    useEffect(() => {
        findDate()
        if (ctx.date[0] && ctx.date[1]) {
            ctx.setDate(ctx.date)
            let d0 = format(ctx.date[0],'yyyy-MM-dd')
            let d1 = format(ctx.date[1],'yyyy-MM-dd')
            setDate1(d0)
            setDate2(d1)
        }
    }, [ctx.date])


    return (<>  <Box sx={{ display: 'flex', mt: 2 ,flexDirection:'column' }}>
        <Typography sx={{ fontSize: 23, fontWeight: 'bold', color: '#333' }}>날짜 선택</Typography>
        <Typography sx={{fontSize:14,  fontWeight: '100', mb:1}}>{date1}~{date2}</Typography>
        <LocalizationProvider adapterLocale={ko} dateAdapter={AdapterDateFns} localeText={{ start: 'check-in', end: 'check-out' }}>
            <StaticDateRangePicker
                disablePast
                shouldDisableDate={(day:Date) => {
                    const rst = chkDate?.reduce((prev, current) => {
                      if (prev) {
                        return true;
                      }
                      const t = format(day, "yyyyMMdd");
                      const cin = format(new Date(current.checkin), "yyyyMMdd");
                      const cout = format(new Date(current.checkout), "yyyyMMdd");
        
                      return t >= cin && t <= cout;
                    }, false);
                    return rst;
                  }}
                displayStaticWrapperAs="desktop"
                calendars={2}
                value={ctx.date}
                onChange={(newVal) => {
                    ctx.setDate(newVal)
                }}

                renderInput={(startProps, endProps) => (
                    <>
                    </>
                )}
            />
        </LocalizationProvider>
    </Box></>);
}

