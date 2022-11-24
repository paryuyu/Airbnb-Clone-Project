import { useState } from "react";
import { createContext } from "react";
import { DateRange } from "@mui/x-date-pickers-pro";
import { addDays } from "date-fns";


export const CalendarCtx = createContext<any | null>(null);

export function CalendarProvider({ children }: { children: React.ReactNode }) {
    let add = addDays(new Date, 1)
    const [date, setDate] = useState<DateRange<Date>>([new Date(), add]);

    console.log(add, 'add')
    return (

        <CalendarCtx.Provider value={{ date, setDate }}>
            {children}
        </CalendarCtx.Provider>
    )

}

