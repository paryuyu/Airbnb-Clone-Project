import { Button, FormControl, IconButton, InputAdornment, OutlinedInput, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useState } from 'react'
import { useRouter } from "next/router";
import { createNonNullExpression } from "typescript";
export default function Price() {
    // 단위 셀렉트
    const [num, setNum] = useState(0)
    const router = useRouter()
    const { itemId } = router.query;
    const numChangeHandle:React.ChangeEventHandler<HTMLInputElement> = (evt) => {
        setNum(Number(evt.currentTarget.value))
    }

    const BackHandle = () => {
        router.push('/become-a-host/' + itemId + '/description')

    }

    const plusHandle = () => {
        setNum(current => current+1000)
    }

    const minusHandle = () => {
        if (num > 1000) {
            setNum(current => current-1000)
        }
    }
    async function priceUpdate(){
        let response = await fetch('/api/accomodation/price?itemId='+itemId,{
            method:'post',
            body:JSON.stringify({price:num}),
            headers:{'Content-type':'application/json'}
        });
        let json = await response.json();

        if(json.result){
            router.push('/become-a-host/'+itemId+'/lastpage')
        }
    }   
    const NextHandle = () => {
        priceUpdate()
    }
    return (<><Typography>이제 요금을 설정하세요</Typography>
        <Typography>언제든지 변경하실 수 있습니다.</Typography>
        <Box>

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
            <Typography>/박</Typography>
        </Box>

        <Button onClick={BackHandle}>뒤로</Button>
        <Button onClick={NextHandle} disabled={num === 0}>다음</Button>

    </>);
}
