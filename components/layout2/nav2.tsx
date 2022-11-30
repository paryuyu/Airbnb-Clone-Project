import { Box, Button } from "@mui/material";

function NavTwo({onExit}:any) {


  return ( <> <Box sx={{ display: 'flex', justifyContent: 'end', mr: 2, mt: 5 }}>
  <Button variant="contained" sx={[{ ...buttonSt }, { '&:hover': { backgroundColor: '#333' } }]} onClick={()=>{onExit()}}>저장 후 나가기</Button>
</Box>
</> );
}

export default NavTwo;


const buttonSt = {
  bgcolor: 'black',
  borderRadius: 5,
  mb: 2
}