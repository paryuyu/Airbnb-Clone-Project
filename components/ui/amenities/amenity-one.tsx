import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from 'react'

type props = {
  item: string;
  fac:string[];
  onFac:(val:string)=>void
}
function AmenityOne({ item,onFac ,fac}:props) {


  const handleClick = () => {
    onFac(item)
  }

  return (<>
    {fac.includes(item) ?


      <Box sx={[{ ...amenityoneBox }, { '&:hover': hover }]} onClick={handleClick}><Typography sx={{ ...text }}>{item}</Typography></Box> :


      <Box sx={[{ ...amenityBox }, { '&:hover': hover }]} onClick={handleClick}><Typography sx={{ ...text }}>{item}</Typography></Box>
    }
  </>);
}

export default AmenityOne;

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
  fontSize: 13,
  textAlign: 'center'

}