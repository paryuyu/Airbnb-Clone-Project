import * as React from 'react';
import { Box, Button, Divider, IconButton, Container, FormControl, InputLabel, OutlinedInput, InputAdornment, Typography, Chip } from '@mui/material';
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

type FinalAgree = {
  onMove: (move: string) => void,
  email: string

}

export const FinalAgreeForm: React.FC<FinalAgree> = ({ onMove, email }) => {
  const [error, setError] = React.useState(false)
  const [passWord, setPassWord] = React.useState("");

  const [delComplete, setDelComplete] = React.useState();
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



  const handleClick = ()=>{
    onMove("firstAgree")
  }

  const handleUserDelete = ()=>{
    fetch(`api/account/delete`,{
      method:`post`,
      body:JSON.stringify({email:email}),
      headers: {
        "Content-type":"application/json"
      }
    })
    .then(rc=>rc.json())
    .then(rst=>setDelComplete(rst.result))
  }

  React.useEffect(()=>{

    if(delComplete){
      onMove("deleteNotice")
    }

  },[delComplete])


  return (
    <Container>
      <Box sx={{ ...style, p: 2, textAlign: "start" }}>
        <Box>
          <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <IconButton onClick={() => { onMove("firstAgree") }}>
              < ArrowBackIosIcon />
            </IconButton>
            <h4>동의 절차</h4>
          </Box>

          <Divider sx={{ mb: 3, mt: 1 }} />
          <h2>정말 취소하시겠어요?</h2>

          <Typography sx={{fontWeight:"bold", mb:2}}>동의 절차가 필요한 이유</Typography>

          <Typography  sx={{ mb:2}}>에어비앤비 커뮤니티 차별반대 서약과 서비스 약관은 에어비앤비 커뮤니티와 에어비앤비가 서로에게 기대하는 바에 대한 커뮤니티의 이해를 돕기 위해 마련되었습니다. 에어비앤비 커뮤니티를 위한 반차별 약속과 서비스 약관에 관해 자세히 알아보세요.</Typography>


          <Typography sx={{fontWeight:"bold", mb:2}}>다시 회원 가입을 희망하는 경우</Typography>


          <Typography>마음이 바뀌면 언제든지 에어비앤비 서비스 약관과 커뮤니티 차별반대 서약에 동의하고 회원 가입을 완료하실 수 있습니다.</Typography>
        </Box>
        <Button variant="contained" fullWidth sx={[{ mt: 3, bt: 5, borderRadius: 3, bgcolor: "grey" },{'&:hover':{bgcolor:'#ddd',color:'white'}}]} onClick={handleClick} >돌아가기</Button>
        
        <Button variant="contained" fullWidth sx={[{ mt: 3, bt: 5, borderRadius: 3, bgcolor: "white" , color:"black" },{'&:hover':{bgcolor:'#333'}}]} onClick={handleUserDelete}>가입 취소하기</Button>
      </Box>
    </Container>

  );
}
