import { Card, CardActionArea, CardContent, CardMedia, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState, useEffect , useContext} from 'react'
import { useRouter } from "next/router";
import LastHosting from "../../../components/ui/last/hosting-last";
import { AccomodationData } from "../../../lib/model/accomodation";
import HostingModal from "../../../components/ui/hosting_modal/HostingModal";
import FooterTwo from "../../../components/layout2/footer2";
import Head from "next/head";
import HeaderTwo from "../../../components/layout2/header2";
import NavTwo from "../../../components/layout2/nav2";
import { BackDropContext } from "../../_app";

export default function LastPage() {
    let router = useRouter();
    let { itemId } = router.query;
    let [modalOpen, setModalOpen] = useState(false)
    let [photos, setphotos] = useState('');
    let [price, setPrice] = useState('');
    let [item, setItem] = useState<AccomodationData>()
    let [title, setTitle] = useState('');
    const BackCtx=useContext(BackDropContext)


    useEffect(() => {
        BackCtx.setBackDrop(true)
        !async function () {
            let response = await fetch('/api/accomodation/roomIdFind', {
                method: 'post',
                body: JSON.stringify({ _id: itemId }),
                headers: { 'Content-type': 'application/json' }
            })

            let json = await response.json();

            if (json.result && json.data) {
                BackCtx.setBackDrop(false)
                setphotos(json.data.Photos[0])
                setPrice(json.data.price)
                setTitle(json.data.title)
                setItem(json.data)
            }

        }();
    }, [])

    const BackHandle = () => {
        router.push('/become-a-host/' + itemId + '/price')
    }
    async function LastPageApi() {

        BackCtx.setBackDrop(true)
        let response = await fetch('/api/accomodation/lastpage?itemId=' + itemId, {
            method: 'post',
            body: JSON.stringify({ receipt: new Date(), publish: true , step:11 }),
            headers: { 'Content-type': 'application/json' }
        });
        let json = await response.json();

        if (json.result) {

            BackCtx.setBackDrop(false)
            router.push('/')
        }
    }

    const NextHandle = () => {
        LastPageApi()
    }

    const closeHandle = () => {
        setModalOpen(false)
    }
    const [open, setOpen] = useState<boolean>(false)
    const exitHandle = () => {

        setOpen(true)
    }

    return (<Box>
        <Head><title>마지막 검토</title></Head>
        <HeaderTwo />
        <NavTwo onExit={exitHandle} />

        <Box sx={{ ...outlineBox }}>
            <Typography sx={{ fontSize: 30, fontWeight: 'bold', mb: 2 }}>숙소 검토하기</Typography>
            <Typography sx={{ fontSize: 15, fontWeight: '100', color: 'grey', mb: 5 }}>게스트에게 표시되는 정보는 다음과 같습니다. 모든 정보가 정확한지 확인하세요.</Typography>


            <Card sx={{ width: 350 }}>
                <CardActionArea onClick={() => { setModalOpen(true) }}>
                    {photos.length > 0 &&
                        <CardMedia
                            component="img"
                            height="140"
                            image={photos}
                            alt="cover"
                        />
                    }

                    <CardContent>
                        {title && <Typography variant="h5" >{title}</Typography>}
                        {price && <Typography>{price}원 /박</Typography>}
                        <Typography variant="subtitle1" color="text.secondary"
                            style={{
                                fontWeight: 'bold', textDecoration: 'underline',
                                fontSize: 12, textAlign: 'end'
                            }}>
                            상세정보확인하기
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            <Modal
                open={modalOpen}
                onClose={closeHandle}
            >
                <LastHosting item={item} onClose={closeHandle} />
            </Modal>
        </Box>

        <FooterTwo onBack={BackHandle} onNext={NextHandle} datas={1} step={11} />

        <Modal
            open={open}
            onClose={() => {
                setOpen(false)
            }
            }>
            <HostingModal onModal={() => { setOpen(false) }} />
        </Modal>
    </Box>);
}

const outlineBox = {
    display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '85vh', alignItems: 'center'
}

