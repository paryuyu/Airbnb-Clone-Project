import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from "next/router";
export default function HostingModal({ onModal }: any) {

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const router = useRouter();
  const handleClick = () => {
    onModal()
  router.push('/become-a-host')
  }

  return (<Box sx={{ ...style }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between' ,alignItems:'center',mb:1.5}}>
      <IconButton onClick={()=>{onModal()}} >
        <CloseIcon sx={{color:'black', fontSize:26}}/>
      </IconButton>
      <Typography variant="h5">저장 후 나가기</Typography>
    </Box>

    <Divider />
    <Typography sx={{textAlign:'center',mb:2,fontSize:16,mt:4}}>여기서 나가시면 <b style={{textDecoration:'underline'}}>이전 페이지</b>까지 저장됩니다.</Typography>

    
    <Typography sx={{textAlign:'center',fontSize:16,mt:2,fontWeight:'100'}}>정말 나가시겠습니까?</Typography>
    <Button variant="contained" sx={[{ bgcolor: 'black', borderRadius: 5, height: 26, fontSize: 13, mt: 2 }, { '&:hover': { bgcolor: '#333' } }]} fullWidth onClick={handleClick}>나가기</Button>
    <Typography sx={{textAlign:'center',fontSize:11,mt:1,fontWeight:'100'}}>이곳에서 저장된 숙소는 호스팅 홈페이지에서 확인하실 수 있습니다.</Typography>
  </Box>);
}
