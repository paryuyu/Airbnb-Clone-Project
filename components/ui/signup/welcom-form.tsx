import * as React from 'react';
import { Box, Button, Divider, IconButton, Container, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
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

type WelcomeForm = {
  onMove: (move: string) => void,
  onModal: (modal: boolean) => void
}

export const WelcomeForm: React.FC<WelcomeForm> = ({ onMove, onModal }) => {
  const [error, setError] = React.useState(false)
  const [passWord, setPassWord] = React.useState("");
  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false
  });

  const agreeClick = () => {

  }
  const degreeClick = () => {
    onMove("finalAgree")
  }

  return (
    <Container>
      <Box sx={{ ...style, p: 2, textAlign: "start" }}>
        <Box>
          <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>

            <IconButton onClick={() => onModal(false)}>
              <CloseIcon />
            </IconButton>

            <h4>회원가입 완료</h4>

          </Box>
          <Divider sx={{ mb: 3, mt: 1 }} />
          <Typography fontSize={26} fontWeight={"bold"} align={"center"}>에어비앤비에 오신 것을 환영합니다.</Typography>

          <Typography align='center' marginTop={2}>전 세계 숙소, 현지 레스토랑 및 독특한 체험을 찾아보세요.</Typography>
          <Button variant="contained" fullWidth sx={{ mt: 3, bt: 5, borderRadius: 3, bgcolor: "black" }} onClick={() => onModal(false)}>완료</Button>
        </Box>
      </Box>
    </Container>

  );
}
