import { Box, Button } from "@mui/material";

export default function NavTwo({onExit}:any) {

  const handleExit = ()=>{
    onExit()
  }

  return ( <> <Box sx={boxStyle}>
  <Button variant="contained" sx={buttonSt} onClick={handleExit}>저장 후 나가기</Button>
</Box>
</> );
}

const buttonSt = {
  bgcolor: 'black',
  borderRadius: 5,
  mb: 2,
  "&:hover":{
    backgroundColor: '#333' 
  }
}

const boxStyle = {
  display: 'flex', 
  justifyContent: 'end',
   mr: 2,
   mt:1
}