import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from 'react'

type props = {
  item: string;
  sp:string[];
  onSp:(val:string)=>void
}
function AmenityTwo({ item , onSp , sp} :props) {



  const handleClick = () => {
    onSp(item)
  }

  return (<>
    {sp.includes(item) ?
      <Box sx={[{ ...amenityoneBox }, { '&:hover': hover }]} onClick={handleClick}><Typography sx={{ ...text }}>{item}</Typography></Box> :
      <Box sx={[{ ...amenityBox }, { '&:hover': hover }]} onClick={handleClick}><Typography sx={{ ...text }}>{item}</Typography></Box>
    }
  </>);
}

export default AmenityTwo;

const amenityoneBox = {
  display: 'flex',
  border: '3px solid black',
  borderRadius: '10px',
  width: 'calc((100% - 32px) / 3)',
  height: 80,
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
}

const amenityBox = {
  display: 'flex',
  border: '1px solid #ddd',
  borderRadius: '10px',
  width: 'calc((100% - 32px) / 3)',
  height: 80,
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
}

const hover = { 'border': '3px solid black' }

const text = {
  fontSize: 16,
  textAlign: 'center'

}