import { Box, Divider, Typography } from "@mui/material";

export default function Footer() {
  return (<Box sx={boxStyle}>
    <Divider></Divider>
    <Typography sx={typoStyle}>© 2022 Airbnb, Inc. | Clone Coding Project 용 홈페이지입니다.</Typography>
  </Box>);
}

const boxStyle ={
  mt: 2, mb: 2
}

const typoStyle = {
  fontWeight: '100', fontSize: 15, ml: 2, mt: 1
}