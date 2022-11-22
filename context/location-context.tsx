import { useState } from "react";
import { createContext } from "react";



export const LocationCtx = createContext<any|null>(null);

export function LocationProvider({ children }: { children: React.ReactNode }) {

    type Location = { lat: string, lng: string }
    const [location, setLocation] = useState<string>('');
    const [what, setWhat] = useState<Location>()
    const [mapNew, setMapNew] = useState<Location>()


    return (

        <LocationCtx.Provider value={{ mapNew, setMapNew, location, setLocation, what, setWhat }}>
            {children}
        </LocationCtx.Provider>
    )

}

