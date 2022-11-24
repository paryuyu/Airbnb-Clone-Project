
import { Box, TextField } from "@mui/material";
import { DateRange, StaticDateRangePicker } from "@mui/x-date-pickers-pro";
import { useState , useEffect, useContext} from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers'
import { ko } from 'date-fns/locale'
import { CalendarCtx } from "../../../context/calendar-context";

export default function Calender() {

    // const [value, setValue] = useState<DateRange<Date>>([null, null]);
    const ctx = useContext(CalendarCtx);

    useEffect(()=>{
        if(ctx.date[0] && ctx.date[1]){
            ctx.setDate(ctx.date)
        }
    },[ctx.date])



    return (<>  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <LocalizationProvider adapterLocale={ko} dateAdapter={AdapterDateFns} localeText={{ start: 'check-in', end: 'check-out' }}>
        <StaticDateRangePicker
                disablePast
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

