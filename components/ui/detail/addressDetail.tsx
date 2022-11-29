import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import Image from 'next/image';
import { useEffect , useState } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
type Location = {
    lat: string;
    lng: string;
}
export default function DetailAddress({ location }: any) {
    let GoogleAppKey = 'AIzaSyAXTs6QeXQ0EZ4B5pCOv93vnnCx0LwEKIs'
    const [img, setImg] = useState<string>('')
    const [ad, setAd] = useState<string>('')
    async function Location() {
        let endPoint = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${GoogleAppKey}&language=ko`;
        let response = await fetch(endPoint);
        let json = await response.json();
        setAd(json.results[0].formatted_address);
        return;
    }

    function createStaticMap() {
        return `https://maps.googleapis.com/maps/api/staticmap?center=${location.lat},${location.lng}&zoom=15&size=500x500&markers=size:mid%7Ccolor:green%7Clabel:S%7C${location.lat},${location.lng}&key=${GoogleAppKey}`
    }
  
    useEffect(() => {
        if (location) {
            Location();
           let createMap = createStaticMap();
           setImg(createMap)
        }
    }, [location])

    return (<Box sx={{display:'flex', flexDirection:'column' , mt:2 , mb:10}}>
        <Box sx={{display:'flex', flexDirection:'row', alignItems:'center' }}>
    <Typography sx={{ fontSize: 23, fontWeight: 'bold', color: '#333' }} >숙소 위치</Typography>
    </Box>
    <Typography sx={{fontSize:14,  fontWeight: '100', mb:1}}>{ad}</Typography>
    {img.length > 0 && <Image src={img} alt='map' width={500} height={500}/>}
  
    </Box>);
}

;