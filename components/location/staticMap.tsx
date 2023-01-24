import { Box } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { LocationCtx } from '../../context/location-context';

//모달에서 받아오기(위도, 경도)
export const StaticMap: React.FC= () => {
    
    const [img, setImg] = React.useState("")
    const ctx = React.useContext(LocationCtx)
    // console.log(ctx)
    //스태틱 맵
    function createStaticMap() {
        
        let GoogleAppKey = process.env.GOOGLE_APP_KEY;
        //결제정보 업데이트하고 스태틱 지도 받아오기.(배경)
        //1. 위도경도를 지오코딩에서 받아오기.
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