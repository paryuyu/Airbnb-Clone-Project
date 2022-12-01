import { Box, Button, Card, CardContent, CardMedia, Divider, Typography } from "@mui/material";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { useEffect , useState } from 'react';

export default function TripCard({ datas }: any) {
    let [night,setNight] = useState<number>()
    let [product,setProduct] =useState<any[]>([])
  let {data, status} = useSession();
console.log(datas)
    useEffect(()=>{
        if(datas){
            let d1 = new Date(datas.checkout) as any;
            let d2 = new Date(datas.checkin) as any;
            let date = (d1-d2)/(1000*60*60*24);
            setNight(date)
            setProduct(datas.product)
        }

    },[datas])


    return (<>
       {product.length > 0 && <Card sx={{mt:1, maxWidth:300 , padding:2 ,marginBottom:1}}>
        <Box sx={{display:'flex'}}>
            <CardMedia
                  component='img'
                  sx={{ height: 120, width: 120 }}
                  image={product[0].Photos[0]}
                  alt="cover"
                ></CardMedia>
                <Box>
                <Typography sx={{fontSize:25, ml:2, mt:1,fontWeight:'bold'}}>{datas.product[0].title}</Typography>
                <Typography sx={{fontSize:15, ml:2, mt:1,fontWeight:'100'}}>{datas.product[0].propertyType}</Typography>
                <Typography sx={{fontSize:15, ml:2, fontWeight:'100'}}>{datas.product[0].privacyType}</Typography>
                </Box>
                </Box>
            <CardContent>

                <Typography> <b>기간 :</b> {datas.checkin.slice(0, 4)}년 {datas.checkin.slice(5, 7)}월 {datas.checkin.slice(8, 10)}일 ~{datas.checkout.slice(0, 4)}년 {datas.checkout.slice(5, 7)}월 {datas.checkout.slice(8, 10)}일 ({night}박)</Typography>
                <Typography><b>인원 :</b> {(datas.numberOfAdults+datas.numberOfChildren)}명</Typography>
            </CardContent>
        </Card>} 
    </>);
}
