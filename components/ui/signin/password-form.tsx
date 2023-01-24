import * as React from 'react';
import { Box, Button, Divider, IconButton, Container, FormControl, InputLabel, OutlinedInput, InputAdornment } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { signIn } from "next-auth/react";

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
    onMove: (move: string) => void,
    onModal: (modal: boolean) => void,
    email: string
}

type SignInRst = {
    error: null | string,
    ok: boolean,
    status:number,
    url:string
}

export const PasswordLogin: React.FC<SignupProps> = ({ onMove, email, onModal }) => {
    const [error, setError] = React.useState(false)
    const [passWord, setPassWord] = React.useState(""); 
    const [signInRst, setSignInRst] = React.useState<SignInRst|null>(null);

    const [values, setValues] = React.useState({
        amount: "",
        password: "",
        weight: "",
        weightRange: "",
        showPassword: false
    });

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

    const handleClick = async () => {
        
        const result = await signIn("credentials", {
            redirect: false,
            email: email, password: passWord
        }) as typeof signInRst

        // console.log(result,'result---pw')

        if(result !== null && result!.ok){
            setSignInRst(result)
        }else if(!result!.ok){
            setError(true)
        }
        
    }

    React.useEffect(()=>{
        if(signInRst !==null && signInRst!.ok){
        //    console.log(signInRst,"signInRst")
            fetch("/api/account/emailFind",{
                method:"post",
                body:JSON.stringify({email:email}),
                headers:{"Content-type":"application/json"}
            }).then(rc=>rc.json())
            .then(rst=>{
                switch(rst.data.AntiDiscrimination){
                    case "degree":
                        onMove("firstAgree");
                        break;
                    case "agree":
                        onModal(false)
                        // console.log("로그인!")
                        break;
        }})
    }

    },[signInRst])


    return (
        <Container>
            <Box sx={{ ...style, p: 2, textAlign: "start" }}>
                <Box>
                    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <IconButton onClick={() => { onMove("email") }}>
                            < ArrowBackIosIcon />
                        </IconButton>
                        <h4>로그인</h4>
                    </Box>

                    <Divider sx={{ mb: 3, mt: 1 }} />
                    <h3>비밀번호를 입력해주세요.</h3>


                    <FormControl variant="outlined" fullWidth>
                        <InputLabel htmlFor="outlined-adornment-password">Password*</InputLabel>
                        <OutlinedInput
                            fullWidth
                            error={error}
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
                                        {values.showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}


                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>

                    {error ? <small style={{ color: "red" }}>비밀번호를 확인해주세요.</small> : <></>}

                </Box>
                <Button variant="contained" fullWidth sx={[{ mt: 3, bt: 5, borderRadius: 3, bgcolor: "black", color: "white" }, { "&:hover": { "backgroundColor": "#303030" , "color":"white"} }]} onClick={handleClick} >계속</Button>
            </Box>
        </Container>

    );
}
