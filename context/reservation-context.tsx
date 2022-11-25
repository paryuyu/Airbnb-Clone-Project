import { useState, useEffect } from "react";
import { createContext } from "react";
import { DateRange } from "@mui/x-date-pickers-pro";
import { addDays } from "date-fns";

export const ReservationCtx = createContext<any | null>(null);

export function ReservationProvider({ children }: { children: React.ReactNode }) {
    let add = addDays(new Date, 1)
    const [date, setDate] = useState<DateRange<Date>>([new Date(), add]);
    const [totalGuest, setTotalGuest] = useState<number>(0);
    const [totalInfant, setTotalInfant] = useState<number>(0);
    const [adult, setAdult] = useState<number>(0);
    const [child, setChild] = useState<number>(0);
    const [infant, setInfant] = useState<number>(0);
    const [pet, setPet] = useState<number>(0);
    const [ReservationPrice, setReservationPrice] = useState<number>(0);
    const [limitGuest, setLimitGuest] = useState<number>(0)

    const [price, setPrice] = useState<number>(0)
    const [night, setNight] = useState<number>(0)
    const [commissionPrice, setCommissionPrice] = useState<number>(0)

    const [totalPrice, setTotalPrice] = useState<number>(0)

    useEffect(() => {
        let total = (price * night) + commissionPrice;
        setTotalPrice(total)
    }, [price, night, commissionPrice])



    return (

        <ReservationCtx.Provider value={{ date, setDate, totalGuest, setTotalGuest, totalInfant, setTotalInfant, adult, setAdult, child, setChild, infant, setInfant, pet, setPet, ReservationPrice, setReservationPrice, limitGuest, setLimitGuest, price, setPrice, night, setNight, commissionPrice, setCommissionPrice, totalPrice, setTotalPrice }}>
            {children}
        </ReservationCtx.Provider>
    )

}

