import { ConstructionOutlined } from "@mui/icons-material";
import { Box, Button, Chip, Divider, Typography } from "@mui/material";
import Image from "next/image";
import {useState, useEffect} from 'react'
import { AccomodationData } from "../../../lib/model/accomodation";
import HostingChip from "./amenity-chip";

type Location = {
    lat: string;
    lng: string;
}
export default function LastHosting({item, onClose}:any) {
    // console.log(item,'dkfjdkfjk')
    let [photos, setPhotos] = useState<string>('');
    let [title,setTitle]  = useState<string>('');

    let [fac, setFac] = useState<string[]>([]);
    let [sp, setSp] = useState<string[]>([]);
    let [sft, setSft] = useState<string[]>([]);

    let [guest, setguest] = useState<string>('');
    let [bed, setbed] = useState<string>('');
    let [bedroom, setbedroom] = useState<string>('');
    let [bathroom, setbathroom] = useState<string>('');
    let [location, setlocation] = useState<Location>();
    let [propertyType, setpropertyType] = useState<string>('');
    let [privacyType, setprivacyType] = useState<string>('');
    let [price, setprice] = useState<string>('');
    let [email_name, setEmail_name] = useState<string>('');
    let [description, setDescription] =useState<string[]>([])
    const [ad, setAd] = useState<string>('')

    async function Location() {
        if(location?.lat && location?.lng){
        let GoogleAppKey = 'AIzaSyAXTs6QeXQ0EZ4B5pCOv93vnnCx0LwEKIs'
        let endPoint = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${GoogleAppKey}&language=ko`;
        let response = await fetch(endPoint);
        let json = await response.json();
        setAd(json.results[0].formatted_address);
        return;
    }
    }

    useEffect(()=>{
        if(item){
            setPhotos(item.Photos[0]);
            setTitle(item?.title!)
            setFac(item?.amenities!.facilities)
            setSp(item.amenities!.special)
            setSft(item.amenities!.safty)
            setguest(item.floorPlan.guest)
            setbed(item.floorPlan.bed)
            setbedroom(item.floorPlan.bedroom)
            setbathroom(item.floorPlan.bathroom)
            setlocation(item.location)
            setpropertyType(item.propertyType)
            setprivacyType(item.privacyType)
            setprice(item.price)
            setDescription(item.description)
        }

        let email = item.email;
        let name = email.split('@')
        setEmail_name(name[0])
        if(item){
            Location()
        }
    },[item])



    return ( <Box sx={{...outline}}  overflow={"scroll"}>

        <Box sx={{display:'flex', flexDirection:'column'}}>

        <Box sx={{ display:'flex', justifyContent:'center' , border:'1px solid #333' , padding:2, borderRadius:2 }}>
          {photos && <Image alt='cover' src={photos}
            width={300} height={300}
            />}
        </Box>

        <Box >
          
        <Typography variant="h4" sx={{mb:3, mt:2, fontWeight:'bold', color:'#333'}}>{title}</Typography>
        
        <Typography variant="h5"  sx={{mt:1.5, color:'#333'}}>{email_name}님이 호스팅하는 {propertyType}</Typography>
        <Typography sx={{fontSize:14, color:'#333', ml:1,mt:0.5}}>최대 인원 {guest}명 / 침실 {bedroom}개 / 침대 {bed}개 / 욕실 {bathroom}개</Typography>
        
        <Divider sx={{mb:1.5, mt:1.5}}/>

        {description.map((one,index) => <Chip label={one} sx={{mr:1}} key={index}/>)}

        <Divider sx={{mb:1.5, mt:1.5}}/>

        <Typography variant="h6"  sx={{mt:2,mb:2, color:'#333', fontWeight:'bold'}}>편의시설</Typography>

        {fac.map((one,index)=><HostingChip key={index} one={one}/>)}
        {sp.map((one,index)=><HostingChip key={index} one={one}/>)}
        {sft.map((one,index)=><HostingChip key={index} one={one}/>)}
        
        <Typography variant="h6"  sx={{mt:2,mb:1, color:'#333', fontWeight:'bold'}}>위치</Typography>
        <Typography  sx={{fontSize:14, color:'#333',ml:1, fontWeight:'bold'}}>{ad}</Typography>

        <Typography sx={{fontSize:12, fontWeight:'100', color:'grey',ml:1}} >숙소 주소는 에어비앤비 개인정보 처리방침에 따라 예약을 완료한 게스트에게만 공개됩니다.</Typography>
        
        </Box>
        </Box>

        <Button variant="contained" fullWidth sx={[{mt:1, bgcolor:'black', borderRadius:5 },{'&:hover':{bgcolor:'#333'}}]} onClick={()=>{onClose()}}>닫기</Button>

    </Box> );
};


const outline = {
position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: '50vw',
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  height: 700
}

