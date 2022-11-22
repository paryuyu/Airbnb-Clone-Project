import * as React from 'react';
import { Box, Button, Divider, IconButton, Container, FormControl, InputLabel, OutlinedInput, InputAdornment, Typography, Chip } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { signIn } from "next-auth/react";
import { TimesOneMobiledataOutlined } from '@mui/icons-material';

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

type DelNotice = {
  onModal: (modal: boolean) => void,
  onMove: (move: string) => void,
}

export const DeleteNotice: React.FC<DelNotice> = ({ onMove , onModal}) => {
  const [error, setError] = React.useState(false)
  const [passWord, setPassWord] = React.useState("");
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



  const handleClick = () => {
    onMove("email")
  }

  return ( 
    <Container>
      <Box sx={{ ...style, p: 2, textAlign: "start" }}>
        <Box>
          <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <IconButton onClick={() => { onMove("firstAgree") }}>
              < ArrowBackIosIcon />
            </IconButton>
            <h4>가입취소</h4>
          </Box>

          <Divider sx={{ mb: 3, mt: 1 }} />
      


          <Typography sx={{ fontWeight: "bold", mb: 2 }}>다시 회원 가입을 희망하는 경우</Typography>


          <Typography>마음이 바뀌면 언제든지 에어비앤비 서비스 약관과 커뮤니티 차별반대 서약에 동의하고 회원 가입을 완료하실 수 있습니다.</Typography>
        </Box>
        <Button variant="contained" fullWidth sx={{ mt: 3, bt: 5, borderRadius: 3, bgcolor: "black" }} onClick={handleClick} >회원가입으로 돌아가기</Button>
        <Button variant="contained" fullWidth sx={{ mt: 3, bt: 5, borderRadius: 3, bgcolor: "white", color: "black" }} onClick={() => onModal(false)}>나가기</Button>
      </Box>
    </Container>

  );
}
