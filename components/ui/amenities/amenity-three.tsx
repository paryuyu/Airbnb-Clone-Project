import { Box, Typography } from "@mui/material";

type props = {
  item: string;
  onSafty: (val: string) => void;
  safty: string[];
}
function AmenityThree({ item, onSafty, safty }: props) {

  const handleClick = () => {
    onSafty(item)
  }

  return (<>
    {safty.includes(item) ?


      <Box sx={[{ ...amenityoneBox }, { '&:hover': hover }]} onClick={handleClick}><Typography sx={{ ...text }}>{item}</Typography></Box> :


      <Box sx={[{ ...amenityBox }, { '&:hover': hover }]} onClick={handleClick}><Typography sx={{ ...text }}>{item}</Typography></Box>
    }
  </>);
}

export default AmenityThree;

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