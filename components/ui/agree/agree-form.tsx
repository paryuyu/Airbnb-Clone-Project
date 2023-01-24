import * as React from 'react';
import { Box, Button, Divider, IconButton, Container, FormControl, InputLabel, OutlinedInput, InputAdornment, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import { signIn, useSession } from "next-auth/react";

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

type AgreeForm = {
  onMove: (move: string) => void,
  email: string
}

export const AgreeForm: React.FC<AgreeForm> = ({ onMove, email }) => {
  const [agreestate, setAgreestate] = React.useState("degree");
  const [finalemail, setFinalEmail] = React.useState("")
  const {data, status} = useSession();

  React.useEffect(()=>{

    if(data == null || !data ){
      setFinalEmail(email)
    } else if(data){
      let email = data?.user?.email as string;
      setFinalEmail(email)
    }

  },[status])


  const agreeClick = async () => {
    // console.log(email, "email")
    
    fetch("api/account/update", {
      method: "post",
      body: JSON.stringify({ email: finalemail, agreestate: "agree" }),
      headers: { "Content-type": "application/json" }
    }).then(rc => rc.json()).then(rst => setAgreestate(rst.data.AntiDiscrimination))
   
      onMove("welcomeForm")
  }


  const degreeClick = () => {
    onMove("finalAgree")
  }
  

  return (
    <Container>
      <Box sx={{ ...style, p: 2, textAlign: "start" }}>
        <Box>
          <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <IconButton onClick={() => { onMove("email") }}>
              < ArrowBackIosIcon />
            </IconButton>
            <h4>커뮤니티 차별반대 서약</h4>
          </Box>

          <Divider sx={{ mb: 3, mt: 1 }} />
          <h2>에어비앤비는 누구나 어디에서나 우리 집처럼 편안함을 느낄 수 있는 커뮤니티를 지향합니다.</h2>

          <Typography>이를 위해 다음에 동의해 주실 것을 부탁드립니다.</Typography>

          <Typography>인종, 종교, 출신 국가, 민족, 피부색, 장애, 성별, 성 정체성, 성적 지향, 연령 등과 관계없이 에어비앤비 커뮤니티의 모든 사람을 존중하며 편견이나 선입견 없이 대하는 것에 동의합니다.</Typography>
        </Box>
        <Button variant="contained" fullWidth sx={[{ mt: 3, bt: 5, borderRadius: 3, bgcolor: "black" },{'&:hover':{bgcolor:'#333'}}]} onClick={agreeClick} >동의 및 계속하기</Button>
        <Button variant="contained" fullWidth sx={[{ mt: 3, bt: 5, borderRadius: 3, bgcolor: "white", color: "black" },{'&:hover':{bgcolor:'#ddd', color:'white'}}]} onClick={degreeClick}> 거절하기</Button>
      </Box>
    </Container>

  );
}
