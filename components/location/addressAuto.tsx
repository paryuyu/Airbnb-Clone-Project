import * as React from 'react';
import TextField from '@mui/material/TextField';

import { Modal } from '@mui/material';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { AddressInputModal } from './addressInput';

type matched_substrings = { length: number, offset: number };

type terms = { offset: number, value: string }

type main_text_matched_substrings = { length: number, offset: string }

type structured_formatting = {
    main_text: string;
    main_text_matched_substrings: main_text_matched_substrings[]
    secondary_text: string
}


type rst = {
    description: string;
    matched_substrings: matched_substrings[];
    place_id: string;
    reference: string;
    structured_formatting: structured_formatting;
    terms: terms[];
    types: string[];
}


export default function ComboBox() {
    const [inputVal, setInputVal] = React.useState<string>("")
    const [arrRst, setArrRst] = React.useState<rst[]>([]);
    const [modalopen, setmodalopen] = React.useState(false);
    const [foundrst, setFound] = React.useState<rst | null>(null);
    const [listopen, setlistopen] = React.useState(false);



    //스태틱 맵
    React.useEffect(() => {
        const timerId = setTimeout(async () => {

            let key = process.env.GOOGLE_APP_KEY;
            const endPoint = `/google/autoComplete?input=${inputVal}&types=geocode&key=${key}&language=ko&components=country:kr&types=address`
            const response = await fetch(endPoint);
            const json = await response.json();

            let arr = json.predictions;
            setArrRst(arr)

        }, 500) //0.5초 딜레이 발생하게 유도.


        return () => {
            // console.log(timerId + "...canceled") //여기 timerId의 리턴값은 숫자(시간)이 뜸.
            clearTimeout(timerId); //이렇게 해놨지만 타이머를 해제를 해버린 거라 콘솔이 반응을 안함. -> 언마운트...?
        }

    }, [inputVal])

    const handleClose = () => {
        setmodalopen(false)
    }

    const handlerstAddress = (val: string) => {
        setInputVal(val)
        setlistopen(false)
    }
    console.log(arrRst)

    return (
        <>
            <TextField placeholder='주소를 입력하세요' sx={{ ...TextFieldStyle }} value={inputVal} onChange={(evt) => { setInputVal(evt.target.value); setlistopen(true) }}></TextField>

            <Box sx={{ width: '100%', bgcolor: 'background.paper', mt: 0 }}>

                <nav aria-label="secondary mailbox folders">
                    {inputVal.length > 1 && listopen ?
                        <List sx={{ border: '1px solid black' }}>

                            {arrRst && arrRst.length > 0 && arrRst.map(one => {
                                return (
                                    <>
                                        <ListItem disablePadding>
                                            <ListItemButton onClick={() => { setFound(one); setmodalopen(true); setInputVal(""); }}>
                                                <ListItemText primary={one.description} />
                                            </ListItemButton>
                                        </ListItem>
                                        <Divider />
                                    </>
                                )
                            })
                            }

                            <Divider />
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => { setmodalopen(true); setFound(null); setInputVal(""); }}>

                                    <ListItemText primary="주소 직접 입력하기" />

                                </ListItemButton>
                            </ListItem>
                        </List>
                        : <></>
                    }
                </nav>
            </Box>

            <Modal
                open={modalopen}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description" >

                <AddressInputModal onClose={handleClose} found={foundrst} onRst={handlerstAddress} />

            </Modal>
        </>
    );
}


const TextFieldStyle = {
    bgcolor: 'white', borderRadius: 2, width: 250,
}