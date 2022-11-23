import { Button, Card, CardActionArea, CardContent, CardMedia, Checkbox, FormControl, FormControlLabel, IconButton, InputAdornment, Modal, OutlinedInput, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useState, useEffect } from 'react'
import { useRouter } from "next/router";
import { CheckBox, SettingsOutlined } from "@mui/icons-material";
import Image from "next/image";
import LastHosting from "../../../components/ui/last/hosting-last";
import { AccomodationData } from "../../../lib/model/accomodation";
import HostingModal from "../../../components/ui/hosting_modal/HostingModal";

export default function LastPage() {
    let router = useRouter();
    let { itemId } = router.query;
    let [modalOpen, setModalOpen] = useState(false)
    let [photos, setphotos] = useState('');
    let [price, setPrice] = useState('');
    let [item, setItem] = useState<AccomodationData>()
    let [title, setTitle] = useState('');
   

   
    useEffect(() => {
        !async function () {

            let response = await fetch('/api/accomodation/roomIdFind', {
                method: 'post',
                body: JSON.stringify({ _id: itemId }),
                headers: { 'Content-type': 'application/json' }
            })

            let json = await response.json();

            if (json.result && json.data) {
                setphotos(json.data.Photos[0])
                setPrice(json.data.price)
                setTitle(json.data.title)
                setItem(json.data)
                
               
            }

        }();
    }, [])

    /** receipt: { type: Date },
        publish: { type: Boolean }, */
    const BackHandle = () => {
        router.push('/become-a-host/' + itemId + '/price')
    }
    async function LastPageApi() {
        let response = await fetch('/api/accomodation/lastpage?itemId=' + itemId, {
            method: 'post',
            body: JSON.stringify({ receipt: new Date(), publish: true }),
            headers: { 'Content-type': 'application/json' }
        });
        let json = await response.json();

        if (json.result) {

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
      
        <Box sx={{ display: 'flex', justifyContent: 'end', mr: 2, mt: 5 }}>
                    <Button variant="contained" sx={[{ ...buttonSt }, { '&:hover': { backgroundColor: '#333' } }]} onClick={exitHandle}>저장 후 나가기</Button>
                </Box>
            <Box sx={{ ...outlineBox }}>
                <Typography sx={{ fontSize: 30, fontWeight: 'bold', mb: 2 }}>숙소 검토하기</Typography>
        <Typography  sx={{ fontSize: 15, fontWeight: '100' ,  color: 'grey', mb: 5 }}>게스트에게 표시되는 정보는 다음과 같습니다. 모든 정보가 정확한지 확인하세요.</Typography>


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
            <LastHosting item={item} />
        </Modal>
        </Box>
        <Box sx={{ ...buttonBox }}>
            <Button onClick={BackHandle} variant='contained' sx={{ ...button }}>뒤로</Button>
            <Button onClick={NextHandle} variant='contained' sx={{ ...button }}>다음</Button>
        </Box>

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

const buttonBox = {
    display: 'flex', justifyContent: 'space-between',
    ml: 5, mr: 5
  }
  
  const button = {
    bgcolor: 'black',
    borderRadius: 5,
    width: 50,
    fontSize: 12,
    mt: 2, mb: 2,
    '&:hover': { 'backgroundColor': '#333' }
  }


const buttonSt = {
    bgcolor: 'black',
    borderRadius: 5,
    width: 110,
    fontSize: 12,
    mb: 2
}
