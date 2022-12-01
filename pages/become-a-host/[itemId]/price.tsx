import { Button, FormControl, IconButton, InputAdornment, Modal, OutlinedInput, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useState , useContext} from 'react'
import { useRouter } from "next/router";
import HostingModal from "../../../components/ui/hosting_modal/HostingModal";
import FooterTwo from "../../../components/layout2/footer2";
import Head from "next/head";
import HeaderTwo from "../../../components/layout2/header2";
import NavTwo from "../../../components/layout2/nav2";
import { BackDropContext } from "../../_app";
export default function Price() {
    // 단위 셀렉트
    const [num, setNum] = useState(0)
    const router = useRouter()
    const { itemId } = router.query;
    const backCtx = useContext(BackDropContext);

    const numChangeHandle: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
        setNum(Number(evt.currentTarget.value))
    }

    const BackHandle = () => {
        router.push('/become-a-host/' + itemId + '/description')

    }

    const plusHandle = () => {
        setNum(current => current + 1000)
    }

    const minusHandle = () => {
        if (num > 1000) {
            setNum(current => current - 1000)
        }
    }
    async function priceUpdate() {
        backCtx.setBackDrop(true)

        let response = await fetch('/api/accomodation/newUpdate?_id=' + itemId, {
            method: 'post',
            body: JSON.stringify({ price: num , step:10}),
            headers: { 'Content-type': 'application/json' }
        });
        let json = await response.json();

        if (json.result) {
            router.push('/become-a-host/' + itemId + '/lastpage')
            backCtx.setBackDrop(false)
        }
    }
    const NextHandle = () => {
        priceUpdate()
    }

    const [open, setOpen] = useState<boolean>(false)
    const exitHandle = () => {

        setOpen(true)
    }


    return (<Box>
        <Head><title>가격</title></Head>
        <HeaderTwo />
        <NavTwo onExit={exitHandle} />

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography sx={{ fontSize: 25, fontWeight: 'bold', textAlign: 'center', mb: 3 }}>이제 요금을 설정하세요</Typography>

            <Typography sx={{ fontSize: 15, color: 'grey', mb: 5 }}>언제든지 변경하실 수 있습니다.</Typography>



            <Box sx={{ border: '1px solid #ddd', borderRadius: 5, padding: 3, width: '55vw', display: 'flex', justifyContent: 'center', alignItems: 'end', margin: 'auto' }}>

                <Box display={'flex'} alignItems={'center'}>

                    <IconButton onClick={minusHandle}>
                        <RemoveCircleOutlineIcon />
                    </IconButton>

                    <FormControl>
                        <OutlinedInput
                            placeholder="0"
                            type="number"
                            onChange={numChangeHandle}
                            value={num}
                            startAdornment={<InputAdornment position="start">KRW</InputAdornment>}
                        />
                    </FormControl>

                    <IconButton onClick={plusHandle}>
                        <AddCircleOutlineIcon />
                    </IconButton>
                </Box>

                <Typography sx={{ textAlign: 'end', fontWeight: '100', pr: 2, color: 'grey' }}>/박</Typography>
            </Box>
        </Box>

        <FooterTwo onBack={BackHandle} onNext={NextHandle} datas={num} step={10} />

        <Modal
            open={open}
            onClose={() => {
                setOpen(false)
            }
            }>
            <HostingModal onModal={() => { setOpen(false) }} />
        </Modal>
    </Box>
    );
}


const outlineBox = {
    display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '85vh', alignItems: 'center', width: '50vw', margin: 'auto'
}


const buttonBox = {
    display: 'flex', justifyContent: 'space-between',
    ml: 5, mr: 5
}

const button = {
    bgcolor: 'black',
    borderRadius: 5,
    mt: 2, mb: 2,
    '&:hover': { 'backgroundColor': '#333' }
}


const buttonSt = {
    bgcolor: 'black',
    borderRadius: 5,
    mb: 2
}


