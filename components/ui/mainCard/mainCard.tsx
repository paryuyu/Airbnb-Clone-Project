import { Card, CardContent, CardMedia, Typography, CardActionArea } from "@mui/material";
import { formatDistance } from "date-fns";
import { ko } from "date-fns/locale";
import { useRouter } from "next/router";

export default function MainCard({ item }: any) {
    const router = useRouter()

    let formatter = new Intl.NumberFormat('ko',{
        style:'currency',
        currency:'krw'
    })

    const cardClickhandle = ()=>{
        router.push('detail?_id=' + item._id)
    }

    
    return (<> 
    
    <Card sx={{ width: 250, height:300 }} onClick={cardClickhandle}>
        <CardActionArea>
            <CardMedia
                component='img'
                sx={{ height: 200 }}
                image={item.Photos[0]}
                alt="cover"
            />

            <CardContent>
                <Typography sx={{ fontSize: 15, fontWeight: 'bold' }}>{item.title}</Typography>

                <Typography sx={{ fontSize: 14, fontWeight: '100', color: 'grey' }}>
                    {formatDistance((new Date(item.receipt!)), new Date(), { addSuffix: true, locale: ko })}</Typography>

                <Typography sx={{ fontSize: 14, fontWeight: '100', color: 'grey' }}> {formatter.format(item.price)} /박</Typography>


            </CardContent>
        </CardActionArea>
    </Card>
    </>);
}

