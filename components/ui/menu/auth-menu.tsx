import { MenuItem } from "@mui/material";
import RoofingIcon from '@mui/icons-material/Roofing';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import CottageIcon from '@mui/icons-material/Cottage';
import { signOut } from "next-auth/react";
import LogoutIcon from '@mui/icons-material/Logout';
import LuggageIcon from '@mui/icons-material/Luggage';
import { useRouter } from "next/router";
import Link from "next/link";
type authmenu = {
  onModal: (modal: boolean) => void;
}



export const AuthMenu: React.FC<authmenu> = ({ onModal }) => {

  const router = useRouter();




  return (

    <>

      <MenuItem style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }} onClick={() => { router.push('/trip') }}>
        <ListItemIcon >
          <LuggageIcon fontSize="small" sx={{ mr: 1.8, mb: 2 }} />여행
        </ListItemIcon>
      </MenuItem>
      <MenuItem style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }} onClick={() => { router.push('/host') }} >
        <ListItemIcon >
          <RoofingIcon fontSize="small" sx={{ mr: 1.8, mb: 2 }} />숙소관리
        </ListItemIcon>
      </MenuItem>
      <Divider></Divider>
      <MenuItem style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }} onClick={() => { signOut() }} >
        <ListItemIcon>
          <LogoutIcon fontSize="small" sx={{ mr: 1.8, mb: 2 }} />로그아웃
        </ListItemIcon>
      </MenuItem>

    </>
  )

}