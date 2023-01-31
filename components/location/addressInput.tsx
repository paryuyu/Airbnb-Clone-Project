
import { Button, Divider, FormControlLabel, IconButton, Switch, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState, useEffect, useContext } from "react";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { StaticMap } from "./staticMap";
import InfoIcon from '@mui/icons-material/Info';
import { useRouter } from "next/router";
import { LocationCtx } from "../../context/location-context";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    overflow: 'scroll',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    height: 700,
    pt: 2,
    px: 4,
    pb: 2
}


type Addressprops = {
    onClose: () => void,
    found?: any,
    onRst?: (val: string) => void,
    onLatLng?: (lat: number, lng: number) => void
}

//export const ModalForm: React.FC<ModalProps> = ({ isShown }) => {
//에러 표시하기.
//선택사항 빼고 다 필수사항
export const AddressInputModal: React.FC<Addressprops> = ({ onClose, found, onRst, onLatLng }) => {

    //에러상태값 & 텍스트
    const [judo, setJudo] = useState(false);
    const [judoText, setJudoText] = useState("");

    const [city, setCity] = useState(false);
    const [cityText, setCityText] = useState("");

    const [street, setStreet] = useState(false);
    const [streetText, setStreetText] = useState("");
    const [extra, setExtra] = useState("");
    const [postNum, setPostNum] = useState(false);
    const [postNumText, setPostNumText] = useState("");

    const [nation, setNation] = useState(false);
    const [nationText, setNationText] = useState("");

    const [lastErr, setlastErr] = useState(false);
    const [lat, setLat] = useState<null | number>(null);
    const [lng, setLng] = useState<null | number>(null);



    const ctx = useContext(LocationCtx);
   
    useEffect(() => {
        if (found) {
            const timerId = setTimeout(async () => {
                let key = process.env.GOOGLE_APP_KEY;
                const endPoint = `/google/details?place_id=${found.place_id}&key=${key}&language=ko`

                const response = await fetch(endPoint);
                const json = await response.json();
                
                if (json && json.result) {
                    ctx.setWhat({ lat: json.result.geometry.location.lat, lng: json.result.geometry.location.lng })

                    setLat(json.result.geometry.location.lat)
                    setLng(json.result.geometry.location.lng)
                }

                let rst = json.result.address_components.sort().reverse();

                if (rst[0]) {
                    setPostNumText(rst[0].long_name)
                } else {
                    setPostNumText("")
                }

                if (rst[1]) {
                    setNationText(rst[1].long_name)
                } else {
                    setNationText("")
                }

                if (rst[2]) {
                    setJudoText(rst[2].long_name)
                } else {
                    setJudoText("")
                }

                if (rst[3]) {
                    setCityText(rst[3].long_name)
                } else {
                    setCityText("")
                }

                if (rst[4]) {
                    setStreetText(rst[4].long_name)
                } else {
                    setStreetText("")
                }

            }, 500) 


            return () => {
                clearTimeout(timerId);
            }
        }

    }, [])
    
    const router = useRouter()
    let { itemId } = router.query;

    async function locationUpdate() {

        let res = await fetch('/api/accomodation/newUpdate?_id=' + itemId, {
            method: 'post',
            body: JSON.stringify({ location: ctx.what }),
            headers: { 'Content-type': 'application/json' }
        });

        let json = await res.json();
    }

    const handleNext = () => {


        if (judoText.length == 0) {
            setJudo(true)
        } else {
            setJudo(false)

        }

        if (cityText.length == 0) {
            setCity(true)
        } else {
            setCity(false)

        }


        if (postNumText.length == 0) {
            setPostNum(true)
        } else {
            setPostNum(false)
        }


        if (nationText.length == 0) {
            setNation(true)
        } else {
            setNation(false)
        }

        if (nationText.length > 0 && postNumText.length > 0 && cityText.length > 0 && judoText.length > 0) {
            setlastErr(false)
            let fullstr = nationText + " " + judoText + " " + cityText + " " + streetText + " " + extra;
            ctx.setLocation(fullstr)
            locationUpdate()
            onClose()
        } else {
            setlastErr(true)
        }

    }

    return (<Box sx={{ ...style }}>

        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>

            <IconButton onClick={() => onClose()}>
                <ArrowBackIosIcon />
            </IconButton>

            <Typography fontSize={20} fontWeight="bold">주소 확인</Typography>
        </Box>
        <Divider sx={{ mb: 3 }} />

        <TextField fullWidth label="주/도" style={{ marginBottom: 10 }} error={judo} onChange={(evt) => { setJudoText(evt.target.value) }} value={judoText} />
        <TextField fullWidth label="도시" style={{ marginBottom: 10 }} error={city} onChange={(evt) => { setCityText(evt.target.value) }} value={cityText} />
        <TextField fullWidth label="읍/면/동" style={{ marginBottom: 10 }} error={street} onChange={(evt) => { setStreetText(evt.target.value) }} value={streetText} />
        <TextField fullWidth label="아파트 이름, 동호수 등 (선택사항)" onChange={(evt) => { setExtra(evt.target.value) }} value={extra} style={{ marginBottom: 10 }} />
        <TextField fullWidth label="우편번호" style={{ marginBottom: 10 }} error={postNum} onChange={(evt) => { setPostNumText(evt.target.value) }} value={postNumText} />
        <TextField fullWidth label="국가/지역" style={{ marginBottom: 10 }} error={nation} onChange={(evt) => { setNationText(evt.target.value) }} value={nationText} />



        {lastErr &&
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <InfoIcon sx={{ fontSize: 15, ml: 1, mr: 1.5, color: 'firebrick' }} />
                <Typography sx={{ fontSize: 13, color: 'firebrick', fontWeight: 'bold' }}>주소가 올바른지 확인해주세요.</Typography>
            </Box>
        }

        {ctx.what ?
            <Box sx={{ display: 'flex', flexDirection: "column", flex: 1, justifyContent: "center" }}>

                <Divider />
                <Box sx={{ display: 'flex', justifyContent: "space-between", alignContent: "center", mb: 2, mt: 1 }}>
                    <Box>
                        <Typography fontSize={20} fontWeight="bold">지도로 확인하기</Typography>
                        <Typography fontSize={13} color={'grey'}>위치를 지도로 확인해보세요</Typography>
                    </Box>

                </Box>
                <StaticMap />
                <Divider sx={{ mb: 2 }} />
            </Box>
            : <></>}
        <Button onClick={handleNext} variant="contained" sx={btnStyle}>확인</Button>
    </Box>);
}

const btnStyle = {
    bgcolor: "black" ,
    "&:hover":{
        "backgroundColor": "#333", 
        "color": "white"
    }
}
