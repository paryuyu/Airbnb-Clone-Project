import { Box } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { LocationCtx } from '../../context/location-context';

export const StaticMap: React.FC= () => {
    
    const [img, setImg] = React.useState("")
    const ctx = React.useContext(LocationCtx)
    function createStaticMap() {
        
        let GoogleAppKey = process.env.GOOGLE_APP_KEY;
        return `https://maps.googleapis.com/maps/api/staticmap?center=${ctx.what.lat},${ctx.what.lng}&zoom=18&size=300x300&markers=size:mid%7Ccolor:green%7Clabel:S%7C${ctx.what.lat},${ctx.what.lng}&key=${GoogleAppKey}`;

    }

    React.useEffect(() => {
        if (ctx.what) {

            let mapImgSrc = createStaticMap();
            setImg(mapImgSrc)
        }
    }, [])

    return (<Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }} >
        {img.length > 0 && <Image src={img} alt='map' width={300} height={300} />}
    </Box>)
}