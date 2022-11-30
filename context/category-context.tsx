import { useState } from "react";
import { createContext } from "react";



export const CategoryCtx = createContext<any|null>(null);

export function CategoryProvider({ children }: { children: React.ReactNode }) {

    const [category, setCategory] = useState<string>('all')


    return (

        <CategoryCtx.Provider value={{ category, setCategory }}>
            {children}
        </CategoryCtx.Provider>
    )

}

