import { MenuItem } from "@mui/material";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LoginIcon from '@mui/icons-material/Login';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import CottageIcon from '@mui/icons-material/Cottage';

type unauthmenu = {
onModal: (modal:boolean) => void;
}



export const UnAuthMenu: React.FC <unauthmenu> = ({onModal}) => {


return(

    <> <MenuItem onClick={(evt) => { if (evt) { onModal(true)} }}>
    <ListItemIcon >
      <LoginIcon fontSize="small" sx={{ mr: 1.8 }} />로그인
    </ListItemIcon>
  </MenuItem>

  <MenuItem onClick={(evt) => { if (evt) { onModal(true)} }}>
    <ListItemIcon >
      <HowToRegIcon fontSize="small" sx={{ mr: 1.8 }} /> 회원가입
    </ListItemIcon>
  </MenuItem>
  <Divider />

  <MenuItem>
    <ListItemIcon>
      <CottageIcon fontSize="small" />
    </ListItemIcon>
    숙소 호스트 되기
  </MenuItem>
  <MenuItem>
    <ListItemIcon>
      <DriveFileRenameOutlineIcon fontSize="small" />
    </ListItemIcon>
    체험 호스팅하기
  </MenuItem>
  <MenuItem >
    <ListItemIcon>
      <HelpOutlineIcon fontSize="small" />
    </ListItemIcon>
    도움말
  </MenuItem></>
)
   
}