import { MenuItem } from "@mui/material";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LoginIcon from '@mui/icons-material/Login';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import CottageIcon from '@mui/icons-material/Cottage';
import { signOut } from "next-auth/react";
import LogoutIcon from '@mui/icons-material/Logout';
type authmenu = {
onModal: (modal:boolean) => void;
}



export const AuthMenu: React.FC <authmenu> = ({onModal}) => {


return(

    <> <MenuItem style={{display:'flex',flexDirection:'column'}} >
    <ListItemIcon >
      <LogoutIcon fontSize="small" sx={{ mr: 1.8,mb:2 }} />로그아웃
    </ListItemIcon>

    <ListItemIcon>
      <LogoutIcon fontSize="small" sx={{ mr: 1.8 }} />숙소관리
    </ListItemIcon>
  </MenuItem>
</>
)
   
}