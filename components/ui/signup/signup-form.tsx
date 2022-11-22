import * as React from 'react';
import { Box, Modal, Button, TextField, Divider, IconButton, FormControl, InputLabel, InputAdornment, Input, OutlinedInput, Typography, Checkbox, FormLabel, FormControlLabel } from '@mui/material';
//비밀번호 아이콘
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { isConstructorDeclaration } from 'typescript';
import { hash } from 'bcryptjs';
import { json } from 'stream/consumers';
import { signIn, useSession } from 'next-auth/react';

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
    email: string,
    onMove?: (move: string) => void
    firstname?: string
    lastname?: string
    provider?: string
}

type DataUser = {
    email: string,
    image: string,
    name: string
}

type Data = {
    expires: string;
    user: DataUser
}


//데이터 타입때문에 오류뜨는 중
export const SignUp: React.FC<SignupProps> = ({ email, onMove, firstname, lastname, provider }) => {

    const { data, status } = useSession();
    const [regiRst, setRegiRst] = React.useState(null);
    const [first, setFirst] = React.useState<string>("");
    const [passWord, setPassWord] = React.useState("");
    const [last, setLast] = React.useState("");
    const [date, setDate] = React.useState("");
    const [marketingChk, setMarketingChk] = React.useState(false);
    const [marketingAgreeSt, setMarketingAgreeSt] = React.useState("degree");
    const [privacyAgreeChk, setPrivacyAgreeChk] = React.useState(false);
    const [finalEmail, setFinalEmail] = React.useState("");

    React.useEffect(() => {
        let first = firstname as string;
        let last = lastname as string;
        setFirst(first);
        setLast(last);
       
        if (data == null || !data) {
            setFinalEmail(email)
        } else if (data) {
            let email = data?.user?.email as string;
            setFinalEmail(email)
        }
    }, [])

    const [values, setValues] = React.useState({
        amount: "",
        password: "",
        weight: "",
        weightRange: "",
        showPassword: false
    });

    //비밀번호 인풋창 보여주기
    const handleChange = (val: any) => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setValues({ ...values, [val]: event.target.value });
        setPassWord(event.target.value)
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword
        });
    };
    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };


    //에러 state
    const [lastError, setlastError] = React.useState(false);
    const [firstError, setFirstError] = React.useState(false);
    const [dateError, setDateError] = React.useState(false);
    const [passWordError, setPassWordError] = React.useState(false);


    //버튼 클릭 시 에러체크
    const clickHandle = () => {
        console.log(last, first, date, finalEmail, passWord)

        if (last.length < 1) {
            setlastError(true)
        } else {
            setlastError(false)
        }

        if (first.length < 1) {
            setFirstError(true)
        } else {
            setFirstError(false)
        }

        if (date.length < 1) {
            setDateError(true)
        } else {
            setDateError(false)
        }

        if (passWord.length < 8) {
            setPassWordError(true)
        } else {
            setPassWordError(false)
        }

        
        if (!lastError && !firstError && !dateError && passWord.length >= 8 && privacyAgreeChk) {   

            fetch(`/api/account/register`, {
                method: `post`,
                body: JSON.stringify({
                    email: finalEmail, lastname: last, firstname: first, birthday: date, password: passWord, marketingAgreeDate: new Date(), privacyTermsAgreeDate: new Date(), marketingAgreeState: marketingAgreeSt,
                    antiDiscrimination: "degree"
                }),
                headers: {
                    "Content-type": "application/json"
                }
            })
                .then(rc => rc.json())
                .then((msg) => { setRegiRst(msg.result); console.log(msg, "msg") })
        }
    }


    //로그인
    async function Login() {
        const result = await signIn("credentials", {
            redirect: false,
            email: email, password: passWord
        });
        console.log(result, "login~")
        //크리덴셜일 때 firstAgree로 가주기.
        if(provider !== "google" && provider !== "kakao"){
            onMove && onMove("firstAgree");
        } else {
            window.close()
        }

    }

    React.useEffect(()=>{
        if (regiRst !== null && regiRst) {
            Login();
            console.log(regiRst,"regiRst")
            console.log("너니?????")
        } else {
            console.log("등록실패")
        }
    },[regiRst])
  
    
    //마케팅 동의 체크
    const hanldleMarketingChk = () => {
        setMarketingChk(current => !current)
        if (!marketingChk) {
            setMarketingAgreeSt("agree")
        }

    }

    //약관 동의
    const handlePrivacyChk = () => {
        setPrivacyAgreeChk(current => !current)
        console.log(privacyAgreeChk)
        //const [marketingChk, setMarketingChk] = React.useState(false);
        if (!privacyAgreeChk) {
            console.log(`privacyAgreeChk -> false가 체크`, privacyAgreeChk)
        }

    }



    return (
        <>

            <Box sx={{ ...style, p: 2, textAlign: "center" }}>
                <Box>
                    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <IconButton onClick={() => { onMove && onMove("email") }}>
                            <ArrowBackIosIcon />
                        </IconButton>
                        <h3 >회원가입 완료하기</h3>
                    </Box>

                    <Divider sx={{ mb: 3, mt: 1 }} />

                    <TextField
                        fullWidth
                        error={firstError}
                        id="outlined-required"
                        label="이름(예:길동)"
                        sx={{ mb: 1.8 }}

                        onChange={(evt) => { setFirst(evt.target.value) }}
                        value={first}
                    />

                    <TextField
                        fullWidth
                        error={lastError}
                        id="outlined-required"
                        label="성(예:홍)"
                        sx={{ mb: 1.8 }}
                        helperText="정부 발급 신분증에 표시된 이름과 일치하는지 확인하세요."
                        onChange={(evt) => { setLast(evt.target.value) }}
                        value={last}
                    />


                    <TextField
                        fullWidth
                        error={dateError}
                        id="outlined-required"
                        type="date"
                        sx={{ mb: 1.8 }}
                        helperText="만 18세 이상만 에어비앤비를 이용할 수 있습니다. 다른 사용자에게 회원님의 생년월일이 공개되지 않습니다."
                        onChange={(evt) => { setDate(evt.target.value) }}
                        value={date}
                    />

                    <TextField
                        fullWidth
                        id="outlined-required"
                        label="Email"
                        type="email"
                        value={finalEmail}
                        sx={{ mb: 1.8 }}
                        helperText="예약 확인과 영수증을 이메일로 보내드립니다."
                    />

                    <FormControl variant="outlined" fullWidth>
                        <InputLabel htmlFor="outlined-adornment-password">Password*</InputLabel>
                        <OutlinedInput
                            fullWidth
                            error={passWordError}
                            id="standard-adornment-password"
                            type={values.showPassword ? "text" : "password"}
                            value={values.password}
                            onChange={handleChange("password")}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>
                </Box>

                <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                    <Typography sx={{ fontSize: 12 }}>개인정보 수집 및 이용에 동의합니다.</Typography>
                    <Checkbox size={'small'} checked={privacyAgreeChk} onChange={handlePrivacyChk} />
                </Box>

                <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                    <Typography sx={{ fontSize: 12 }}>개인정보 수집 및 이용에 동의합니다.마케팅 이메일 수신을 원합니다(선택).</Typography>
                    <Checkbox size={'small'} checked={marketingChk} onChange={hanldleMarketingChk} />
                </Box>

                <Divider sx={{ mb: 3 }} />

                <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                    <Typography sx={{ fontSize: 12, fontWeight: "bold", textAlign: "start", mr: 2 }}>동의 및 계속하기를 선택하여 에어비앤비 서비스 약관, 결제 서비스 약관, 위치기반서비스 이용약관, 차별 금지 정책, 개인정보 처리방침에 동의합니다.</Typography>
                </Box>


                <Button variant="contained" fullWidth sx={{ mt: 3, borderRadius: 3, bgcolor: "black" }} color="error" onClick={clickHandle}>동의 및 계속하기</Button>

            </Box>


        </>

    );
}
