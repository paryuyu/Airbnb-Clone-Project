import { Button, FormControl, IconButton, InputAdornment, OutlinedInput, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useState } from 'react'
import { useRouter } from "next/router";
export default function Price() {
    // 단위 셀렉트
    const [num, setNum] = useState(0)
    const router = useRouter()
    const { itemId } = router.query;
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
        let response = await fetch('/api/accomodation/newUpdate?_id=' + itemId, {
            method: 'post',
            body: JSON.stringify({ price: num }),
            headers: { 'Content-type': 'application/json' }
        });
        let json = await response.json();

        if (json.result) {
            router.push('/become-a-host/' + itemId + '/lastpage')
        }
    }
    const NextHandle = () => {
        priceUpdate()
    }
    return (<Box >
        <Box sx={{ ...outlineBox }}>
            <Typography sx={{ fontSize: 30, fontWeight: 'bold', mb: 2 }}>이제 요금을 설정하세요</Typography>
            <Typography sx={{ fontSize: 15, color: 'grey', mb: 5 }}>언제든지 변경하실 수 있습니다.</Typography>
            <Box sx={{ border: '1px solid #ddd', borderRadius: 5, padding: 3 }}>
                <Box>
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
        <Box sx={{ ...buttonBox }}>
            <Button variant="contained" sx={{ ...button }} onClick={BackHandle}>뒤로</Button>
            <Button variant="contained" sx={{ ...button }} disabled={num === 0} onClick={NextHandle}
            >다음</Button>
        </Box>
    </Box>);
}


const outlineBox = {
    display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '85vh', alignItems: 'center'
}

//disabled={num === 0}
const buttonBox = {
    display: 'flex', justifyContent: 'space-around'
}


const button = {
    width: 10, mt: 5, mb: 5, bgcolor: 'black',
    '&:hover': { 'backgroundColor': '#333' }
}
