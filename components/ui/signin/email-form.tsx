import * as React from 'react';
import { Box, Button, TextField, Divider, IconButton, Typography } from '@mui/material';
import { FcGoogle } from 'react-icons/fc';
import { RiKakaoTalkFill } from 'react-icons/ri';
//비밀번호 아이콘

import CloseIcon from '@mui/icons-material/Close';
import { useSession } from 'next-auth/react';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
};


type SignupProps = {
    onModal: (modal: boolean) => void,
    onMove: (move: string) => void,
    onEmail: (email: string) => void
}




export const EmailLogin: React.FC<SignupProps> = ({ onModal, onMove, onEmail }) => {

    const [emailtest, setEmailtest] = React.useState<string>("")
    const [error, setError] = React.useState(false)
    const [movechk, setMoveChk] = React.useState(null)
    const { data, status } = useSession();

    //이메일 정규식
    let pattern: RegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    let regtest = pattern.test(emailtest);

    React.useEffect(() => {
        if (emailtest.length > 1) {
                setError(true)
            console.log(error, "error")
            if (regtest) {
                setError(false)
            }
        }
    }, [emailtest, regtest])



    const handleChoiceMove = () => {
        if (regtest) {

            onEmail(emailtest);

            fetch("api/account/emailFind", {
                method: "post",
                body: JSON.stringify({ email: emailtest }),
                headers: { "Content-type": "application/json" }
            }
            ).then(rc => rc.json())
                .then(data => { setMoveChk(data.result); Move(data.result) })
        }
    }

    function Move(move: boolean) {
        //console.log(move, "왜 안되니")
        if (move) {
            console.log(move, "!@!@")
            onMove("password")
        } else {
            console.log(move, "#$#$")
            onMove("register")
        }

    }

    const handleGoogle = () => {
        console.log("google!")
        console.log(screenX, "screen") // 결과값 : 0
        console.log(screenY, "screen") // 결과값 : 0
        //popup 정중앙으로 보내는 공식
        let top = screenX + screen.height / 2 - 830 / 2;
        let left = screenY + screen.width / 2 - 550 / 2;

        //팝업창으로 띄우기
        window.open("http://localhost:3000/popup/g-auth", "popup", `width=550, height=830, top=${top}, left=${left}`);
        onModal(false);
    }

    const handleKaKao = () => {

        let top = screenX + screen.height / 2 - 830 / 2;
        let left = screenY + screen.width / 2 - 550 / 2;

        //팝업창으로 띄우기
        window.open("http://localhost:3000/popup/k-auth", "popup", `width=550, height=830, top=${top}, left=${left}`);

        //타입넣기
        onModal(false);
    }

    async function FindEmail(email: string) {
        console.log(email, "email")

        let rst = await fetch("api/account/emailFind", {
            method: "post",
            body: JSON.stringify({ email: data?.user!.email }),
            headers: { "Content-type": "application/json" }
        })

        let finalRst = await rst.json()
        //console.log(finalRst,"finalRst")
        if (!finalRst.result) {
            onMove("register")
            
        } else {
            console.log(finalRst,"final")
            if (finalRst.data.AntiDiscrimination == "degree" && status == "authenticated" ) {
                //onMove("firstAgree")
            } else {
                onModal(false)
            }
        }
    }


    React.useEffect(() => {

        if (status == "authenticated" && data !== null) {
            let email = data?.user!.email as string;
            FindEmail(email)
        }

    }, [status])




    return (
        <>
            <Box sx={{ ...style, p: 2, textAlign: "start" }}>
                <Box>
                    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <IconButton onClick={() => onModal(false)}>
                            <CloseIcon />
                        </IconButton>
                        <h4>로그인 또는 회원가입</h4>
                    </Box>

                    <Divider sx={{ mb: 3, mt: 1 }} />
                    <h3>에어비앤비에 오신 것을 환영합니다.</h3>

                    <TextField
                        fullWidth
                        error={error}
                        id="outlined-required"
                        label="Email"
                        type="email"
                        sx={{ mb: 0 }}
                        onChange={(val) => { setEmailtest(val.target.value) }}
                        value={emailtest}
                    />

                    {error ? <small style={{ color: "red" }}>이메일을 확인해주세요.</small> : <></>}

                </Box>
                <Button variant="contained" fullWidth sx={[{ mt: 3, bt: 5, borderRadius: 3, bgcolor: "black", color: "white" }, { "&:hover": { "backgroundColor": "grey", "color": "black" } }]}
                    onClick={handleChoiceMove}
                >계속</Button>
                <Divider sx={{ mt: 3 }}><Typography fontSize={12}>또는</Typography></Divider>
                <Button variant="contained" fullWidth sx={[{ mt: 3, bt: 5, borderRadius: 3, bgcolor: "white", color: "black" }, { "&:hover": { "backgroundColor": "#002147", "color": "white" } }]}
                    onClick={handleGoogle}
                    startIcon={<FcGoogle />}
                >
                    <Typography flexGrow={1} fontSize={13}>구글로 로그인</Typography>
                </Button>
                <Button variant="contained" fullWidth sx={[{ mt: 3, bt: 5, borderRadius: 3, bgcolor: "white", color: "black" }, { "&:hover": { "backgroundColor": "gold", "color": "white" } }]}
                    onClick={handleKaKao}
                    startIcon={<RiKakaoTalkFill />}
                >
                    <Typography flexGrow={1} fontSize={13}>카카오로 로그인</Typography>
                </Button>

            </Box>

        </>

    );
}
