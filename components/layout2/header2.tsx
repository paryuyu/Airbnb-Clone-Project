import * as React from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';

import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { AppBar, Button, Divider, Toolbar } from '@mui/material';
import ModeOfTravelIcon from '@mui/icons-material/ModeOfTravel';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { FaAirbnb } from 'react-icons/fa';
import { Modal } from '@mui/material';
import { useSession } from 'next-auth/react';
import { UnAuthMenu } from '../ui/menu/unauth-menu';
import { AuthMenu } from '../ui/menu/auth-menu';
import { ModalForm } from '../ui/signup/modal-form';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function HeaderTwo() {
  const { data, status } = useSession();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [modalopen, setModalOpen] = React.useState<boolean>(false);
  console.log(data)
  console.log(status)
  //메뉴  
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //모달
  const handleModalClose = () => {
    setModalOpen(false)
  }





  React.useEffect(() => {

    !async function () {
      let email = data?.user?.email
      let rst = await fetch('/api/account/emailFind', {
        method: "post",
        body: JSON.stringify({ email: email }),
        headers: { "Content-type": "application/json" }
      })

      let finalRst = await rst.json();

    }();

  }, [status])
  
  let url = process.env.NEXT_PUBLIC_SERVER_URL;
  return (
    <>
      <AppBar position="sticky" elevation={0}>
        <Toolbar variant="dense" sx={{ bgcolor: "white", color: "black", display: "flex", justifyContent: "space-between" }}  >
          <IconButton edge="start" color="inherit" sx={{ mr: 0 }} onClick={() => { router.push('/') }}>
            <FaAirbnb />
          </IconButton>

          <Box display={"flex"} flexDirection={"row"}>


            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Account settings">
                <IconButton onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}>
                  <AccountCircleIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}

          >
            
            {status == "unauthenticated" ? <UnAuthMenu onModal={(modal) => { setModalOpen(modal) }} /> : <AuthMenu onModal={(modal) => { setModalOpen(modal) }} />}
          </Menu>

        </Toolbar>
      </AppBar>

      <Modal
        open={modalopen}
        onClose={handleModalClose}
      >
        <ModalForm isShown={(modal) => setModalOpen(modal)} />
      </Modal>
<Divider/>
    </>

  );
}

