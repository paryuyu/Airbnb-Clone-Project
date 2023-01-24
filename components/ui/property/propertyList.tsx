import { ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Types } from "../../../lib/model/dummy";

type props = {
  item: Types;
  onItem: (val: string) => void;
  arr: string;
}
function PropertyList({ item, onItem, arr }: props) {


  const handleClick: React.MouseEventHandler<HTMLDivElement> = (evt) => {
    if (evt) {
      onItem(item.property)
    }

  }

  return (<>
    {item.property === arr ?

      <Box 
      sx={[{ ...styletwo }, { "&:hover": { borderColor: "black" } }]} onClick={handleClick}>
        <Typography fontSize={20} fontWeight={'bold'}>{item.property}</Typography>
        <Typography fontSize={15}>{item.description}</Typography>

      </Box> :

      <Box sx={[{ ...style }, { "&:hover": { borderColor: "black" } }]} onClick={handleClick}>
        <Typography sx={{ ...propertyStyle }}>{item.property}</Typography>
        <Typography sx={{ ...descriptionStyle }}>{item.description}</Typography>

      </Box>

    }
  </>);
}

export default PropertyList;

const propertyStyle = {
  fontWeight: 'bold',
  fontSize: 20
}
const descriptionStyle = {
  fontSize: 15

}

const style = {
  border: '3px solid #ddd',
  padding: 3,
  maxWidth: '300px'
}

const styletwo = {
}