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
    // const [orderId, setOrderID] = useState<string>('')
    // const [payerId, setPayerId] = useState<string>('')
    const [payState, setPayState] = useState<boolean>(false)
    const [findState, setFindState] = useState<boolean>(false);
    let { productId } = router.query;

    let checkin = router.query.checkin as string;
    let checkout = router.query.checkout as string;
    let guestCurrency = router.query.guestCurrency as string;
    let numberOfInfants = router.query.numberOfInfants;
    let numberOfPets = router.query.numberOfPets;
    let numberOfAdults = router.query.numberOfAdults as any;
    let numberOfChildren = router.query.numberOfChildren as any;
    let numberOfGuests = router.query.numberOfGuests;
    const date = new Date(checkin);

    console.log(new Date(checkin).toLocaleDateString('ko', { day: 'numeric', month: 'short', year: 'numeric', weekday: 'short' }), 'date')
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

    async function PayDataReq(orderId: any, payerId: any) {


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
            numberOfChildren: numberOfChildren,
            reservationTime: new Date()
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
    }


    useEffect(() => {

        findRoomInfo()

        if (status === 'authenticated') {
            let mail = data.user?.email as string;
            setEmail(mail)
        }

    }, [data])

    let formatter = new Intl.NumberFormat('ko', {
        style: 'currency',
        currency: 'krw'
    })



    return (<>
        <Head><title>예약요청</title></Head>
        <Header />

        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, mb: 2, justifyContent: 'start' }}>

            <IconButton onClick={() => { router.push('/detail?_id=' + productId) }}>
                <ArrowBackIosIcon sx={{ color: 'black' }} />
            </IconButton>
            <Typography variant="h4">예약요청</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', margin: 'auto', width: '80vw', gap: 5, mb: 2 }}>


            <Box sx={{ width: '50%' }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }} >예약정보</Typography>
                <Divider sx={{ mb: 2 }}></Divider>

                <Box>
                    <Typography sx={{ fontWeight: 'bold' }}>체크인</Typography>
                    <Typography sx={{ mb: 1 }}>{new Date(checkin).toLocaleDateString('ko', { day: 'numeric', month: 'short', year: 'numeric', weekday: 'short' })}</Typography>

                    <Typography sx={{ fontWeight: 'bold' }}>체크아웃</Typography>
                    <Typography sx={{ mb: 1 }}>{new Date(checkout).toLocaleDateString('ko', { day: 'numeric', month: 'short', year: 'numeric', weekday: 'short' })}</Typography>

                </Box>

                <Typography sx={{ fontWeight: 'bold' }}>게스트</Typography>
                <Typography>게스트 {parseInt(numberOfAdults) + parseInt(numberOfChildren)} 명</Typography>
            </Box>


            {findState &&
                <Card sx={{ maxWidth: 400 }} >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <CardMedia
                            component='img'
                            sx={{ height: 150, width: 150 }}
                            image={cover}
                            alt="cover"
                        ></CardMedia>
                        <Typography variant="h5">{title}</Typography>
                    </Box>
                    <CardContent>
                        <Typography sx={{ fontWeight: 'bold' }} >요금 세부정보</Typography>
                        <Divider></Divider>
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
                            <Typography sx={{ fontWeight: 'bold' }}>총 합계({guestCurrency?.toUpperCase()})</Typography>
                            <Typography sx={{ fontWeight: 'bold' }}>{formatter.format((roomPrice * night) + (roomPrice * night * 0.14))}</Typography>
                        </Box>
                    </CardContent>


                    <Box sx={{ margin: 2 }}>
                        <PayPalScriptProvider options={{
                            "client-id": "ATbKgZ9iRjFUD_DBVzm6Jph9O7JgRTy-XFBV52a8RFCKTkbADrTJM7ZqxWoN-qnab0PaeMNGcDV_VHv-",
                            intent: 'authorize'
                        }}>
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
                                        actions.order?.authorize()

                                        setPayState(true);
                                        console.log(data.orderID)
                                        console.log(data.payerID)
                                        if (data.payerID && data.orderID) {
                                            PayDataReq(data.orderID, data.payerID)
                                        }
                                    }

                                    console.log(data, 'data')
                                    console.log(actions, 'actions')
                                    console.log('----------------결제완료 후')
                                }}



                            />
                        </PayPalScriptProvider>
                    </Box>
                </Card>
            }

        </Box>

    </>);
}

