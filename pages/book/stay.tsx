import { Button, Card, CardContent, CardMedia, Divider, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../../components/layout/header";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export default function Stay() {
    const { data, status } = useSession()
    const router = useRouter();
    console.log(data)
    console.log(status)
    console.log(router.query, 'query')
    const [email, setEmail] = useState<string>('');
    const [roomPrice, setRoomPrice] = useState<number>(0);
    const [night, setNight] = useState<number>(0);
    const [cover, setCover] = useState<string>('')
    const [total, setTotal] = useState<number>(0)
    const [title, setTitle] = useState<string>('')
    const [orderId, setOrderID] = useState<string>('')
    const [payerId, setPayerId] = useState<string>('')
    const [payState, setPayState] = useState<boolean>(false)
    const [findState,setFindState] =useState<boolean>(false);
    let { productId } = router.query;

    let checkin = router.query.checkin as string;
    let checkout = router.query.checkout as string;
    let guestCurrency = router.query.guestCurrency as string;
    let numberOfInfants = router.query.numberOfInfants;
    let numberOfPets = router.query.numberOfPets;
    let numberOfAdults = router.query.numberOfAdults;
    let numberOfChildren = router.query.numberOfChildren;
    let numberOfGuests = router.query.numberOfGuests;

    async function findRoomInfo() {
        let response = await fetch('/api/accomodation/roomIdFind', {
            method: 'post',
            body: JSON.stringify({ _id: productId }),
            headers: { 'Content-type': 'application/json' }
        });

        let json = await response.json();
        console.log(json, '결과')
        if (json.result) {
            setFindState(true)
            setRoomPrice(json.data.price)
            let start = new Date(checkin) as any;
            let end = new Date(checkout) as any;
            let night_calc = (Math.ceil(end - start) / (1000 * 60 * 60 * 24))
            setNight(night_calc)
            setCover(json.data.Photos[0])
            let commission = Math.ceil(roomPrice * night * 0.14)
            setTotal((json.data.price * night) + commission)
            setTitle(json.data.title)
        }
    }


    async function PayDataReq() {


        let reservationData = {
            productId: productId,
            guestEmail: email,
            paypal: {
                orderId: orderId,
                payId: payerId
            },
            checkin: checkin,
            checkout: checkout,
            guest: numberOfGuests,
            numberOfInfants: numberOfInfants,
            numberOfPets: numberOfPets,
            numberOfAdults: numberOfAdults,
            numberOfChildren: numberOfChildren
        }

        let response = await fetch('/api/reservation/create', {
            method: 'post',
            body: JSON.stringify(reservationData),
            headers: { 'Content-type': 'application/json' }
        })
        let json = await response.json();

        setPayState(false)
        if (json.result) {
            setPayState(false)
            router.push('/trip')
        }
        console.log(json, '예약')
    }


    useEffect(() => {
                              
            findRoomInfo()
    }, [])

    useEffect(() => {
        if (data) {
            let mail = data.user?.email as string;
            setEmail(mail)
        }

        if (payState) {
            PayDataReq()
        }

    }, [payState])

    let formatter = new Intl.NumberFormat('ko', {
        style: 'currency',
        currency: 'krw'
    })



    return (<>
<Head><title>예약요청</title></Head>
        <Header />
     
  <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, mb: 2 }}>
        <IconButton>
            <ArrowBackIosIcon sx={{ color: 'black' }} />
        </IconButton>
        <Typography variant="h4">예약요청</Typography>
    </Box>

    <Box sx={{display:'flex' , flexDirection:'row', justifyContent:'space-around'}}>

    <Box>
        <Typography variant="h4" sx={{ fontWeight: '500' }} >예약정보</Typography>
        <Box>
            <Typography sx={{ fontWeight: 'bold' }}>날짜</Typography>
            <Typography>{checkin}~{checkout}</Typography>
        </Box>
        <Typography sx={{ fontWeight: 'bold' }}>게스트</Typography>
        <Typography>게스트 {numberOfGuests} 명</Typography>
    </Box>

    
{findState &&
    <Card sx={{ maxWidth: 250 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <CardMedia
                component='img'
                sx={{ height: 120, width: 120 }}
                image={cover}
                alt="cover"
            ></CardMedia>
            <Typography variant="h5">{title}</Typography>
        </Box>
        <CardContent>

            <Typography sx={{ fontWeight: 'bold' }} >요금 세부정보</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>{formatter.format(roomPrice)} X {night}박</Typography>
                <Typography>{formatter.format(roomPrice * night)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>서비스 수수료</Typography>
                <Typography>{formatter.format(Math.ceil(roomPrice * night * 0.14))}</Typography>
            </Box>
            <Divider></Divider>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>총 합계({guestCurrency?.toUpperCase()})</Typography>
              <Typography>{formatter.format(total)}</Typography>
            </Box>
        </CardContent>
    </Card>

}
</Box>


    <PayPalScriptProvider  options={{ "client-id": "ATbKgZ9iRjFUD_DBVzm6Jph9O7JgRTy-XFBV52a8RFCKTkbADrTJM7ZqxWoN-qnab0PaeMNGcDV_VHv-" }}>
        <PayPalButtons style={{ layout: "horizontal" }}
            createOrder={(data, actions) => {
                return actions.order.create({
                    purchase_units: [
                        {
                            description: '숙소예약금',
                            amount: {
                                value: "5.99",
                            },
                        },
                    ],
                });
            }}
            onApprove={async (data, actions) => {
                console.log('----------------결제완료 후')
                if (data) {
                    setOrderID(data.orderID!);
                    setPayerId(data.payerID!);
                    setPayState(true);
                }

                console.log(data, 'data')
                console.log(actions, 'actions')
                console.log('----------------결제완료 후')
            }}



        />
    </PayPalScriptProvider>




    </>);
}

