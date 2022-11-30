import { Button, Divider, IconButton, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import { useState } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useSession } from "next-auth/react";
import ReservationList from "./host_reservation";
function HostRoom({ datas, onRefresh }: any) {
    let { data, status } = useSession();
    console.log(datas)
    //숙소 삭제
    //예약 확인
    const [total, setTotal] = useState<boolean>(false)
    const [modal, setModal] = useState<boolean>(false);
    const [reservationModal, setReservationModal] = useState<boolean>(false)
    const [reservationData, setReservationData] = useState<any[]>([])
    let formmater = new Intl.NumberFormat('ko', {
        style: 'currency',
        currency: 'krw'
    })

    let handleClose = () => {
        setModal(false)
    }


    async function Delete() {

        let res = await fetch('/api/accomodation/manage/delete?_id=' + datas._id
        )
        let json = await res.json()
        if (json.result) {
            setModal(false)
            onRefresh()
        }

    }

    async function ReservationFind() {
        let res = await fetch('/api/accomodation/manage/find?_id=' + datas._id
        )
        let json = await res.json()
        setReservationData(json.data)

        return json.data;

    }

    let handleDelete = () => {

        Delete()
    }

    let handleReservation = () => {
        setReservationModal(true)
        ReservationFind()

    }

    let handlereservationModal = () => {
        setReservationModal(false)
    }

    const [delChk, setDelChk] = useState(false);
    const [after, setAfter] = useState<Date[]>([])

    let handleDelChk = async () => {

        let rrr = await ReservationFind();

        let dateArr = rrr.map((one: any) => { return (one.checkout) }
        )
        let filterArr = dateArr.filter((one: any) => new Date(one) >= new Date())
        setAfter(filterArr)
        console.log(filterArr, 'filterArr')

        if (filterArr.length > 0) {
            setModal(true)
            setDelChk(false)
        } else {
            setModal(true)
            setDelChk(true)
        }
    }


    return (<>

        {datas.publish &&
            <Box sx={{ border: '1px solid #ddd', mb: 1, width: 300, padding: 1, borderRadius: 3, }}>

                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>

                    <Image src={datas.Photos[0]} width={100} height={100} alt='cover' />

                    <Box >
                        <Typography sx={{ fontWeight: 'bold', fontSize: 'medium' }}>{datas.title}</Typography>
                        <Typography sx={{ fontSize: 'small' }}><b>가격:</b> {formmater.format(datas.price)}</Typography>

                        <Typography sx={{ fontSize: 'small' }}><b>등록일:</b> {new Date(datas.receipt).toLocaleDateString('ko', { year: 'numeric', day: "numeric", month: 'long' })}</Typography>

                        <Typography sx={{ color: 'black', textDecoration: 'underline', fontSize: 15, cursor: 'pointer', textAlign: 'center', mt: 2 }} onClick={handleReservation}>해당숙소 예약 확인하기</Typography>

                    </Box>
                </Box>

                <Box>


                    <Button variant="contained" fullWidth sx={[{ bgcolor: 'black', borderRadius: 5, mt: 2 }, { '&:hover': { bgcolor: '#333' } }]} onClick={handleDelChk}>숙소 삭제하기</Button>
                </Box>

            </Box>}

        <Modal
            open={modal}
            onClose={handleClose}>
            <Box sx={{ ...modalStyle }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <IconButton onClick={() => { setModal(false) }}>
                        <ArrowBackIosIcon />
                    </IconButton>
                    <Typography variant="h5">숙소삭제</Typography>
                </Box>
                <Divider></Divider>
                <Box sx={{
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', mt: 2, mb: 1
                }}>

                    {delChk ? <>
                        <Typography sx={{ fontSize: 'large', fontWeight: 'bold', mb: 1 }}>숙소가 완전히 삭제됩니다.</Typography>
                        <Typography sx={{ fontSize: 'medium', fontWeight: '100', mb: 1 }}>{data?.user!.email}님이 등록하신 <b style={{ textDecoration: 'underline' }}>{datas.title}</b>을 삭제하시겠습니까?</Typography>
                        <Button variant="contained" fullWidth sx={[{ bgcolor: 'black', borderRadius: 5 }, { '&:hover': { bgcolor: '#333' } }]} onClick={handleDelete}>완전히 삭제하기</Button>
                    </>
                        : <>

                            <Box sx={{ border: '2px solid #ddd', pr: 4, pl: 4, pt: 1, pb: 1, mb: 1, borderRadius: 3 }}>
                                {reservationData.map((one) => {
                                    if (new Date(one.checkout) >= new Date()) {
                                        return (<><Typography sx={{ fontWeight: '300' }}>{new Date(one.checkin).toLocaleDateString('ko', { year: 'numeric', month: 'long', day: 'numeric' })} </Typography></>)
                                    }


                                })}
                            </Box>

                            <Typography sx={{ fontSize: 'large', fontWeight: 'bold', mb: 1 }}>{after.length}건의 예약이 존재합니다.</Typography>

                            <Typography sx={{ fontSize: 'medium', fontWeight: '100', mb: 1 }}>체크아웃 날짜가 지나지 않은 예약자가 존재할 경우 삭제가 제한됩니다.</Typography>
                            <Button variant="contained" fullWidth sx={[{ bgcolor: 'black', borderRadius: 5 }, { '&:hover': { bgcolor: '#333' } }]} onClick={() => { setReservationModal(true); setModal(false) }}>예약 확인하기</Button>
                            <></>
                        </>}

                </Box>

            </Box>

        </Modal>

        <Modal
            open={reservationModal}
            onClose={handlereservationModal}>
            <Box sx={{ ...modalStyle }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <IconButton onClick={() => { setReservationModal(false) }}>
                        <ArrowBackIosIcon />
                    </IconButton>
                    <Typography variant="h5">예약내역</Typography>
                </Box>
                <Divider></Divider>
                {reservationData?.length > 0 ? <>{reservationData.map((one, index) => {
                    if (new Date(one.checkout) >= new Date()) {
                        return (<ReservationList datas={one} key={index} />)
                    }

                })}

                    <Button sx={{ color: 'black', textDecoration: 'underline' }} onClick={() => { setTotal(current => !current) }}> 전체 예약내역 확인하기</Button>
                    {total &&
                        <>
                            {reservationData.map((one, index) => {
                                return (<ReservationList datas={one} key={index} />)
                            })}
                        </>
                    }



                </>

                    : <Typography>예약내역이 없습니다.</Typography>}
                <Box sx={{
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', mt: 2, mb: 1
                }}>

                </Box>
            </Box>
        </Modal>





    </>);
}

export default HostRoom;



const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};