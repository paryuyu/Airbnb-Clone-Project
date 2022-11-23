import { Typography, Box, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { Textarea } from '@mui/joy';
import { useRouter } from "next/router";
import ToggleButton from '@mui/material/ToggleButton';
import DescriptionList from "../../../components/ui/description/description-list";
import { Grid } from "@mui/material";
export default function () {
  const [description, setDescription] = useState<string[]>([]);

  const router = useRouter();
  const itemId = router.query.itemId as string;

  async function descriptionUpdate() {
    let response = await fetch('/api/accomodation/description?itemId=' + itemId, {
      method: 'post',
      body: JSON.stringify({ description: description }),
      headers: { 'Content-type': 'application/json' }
    })
    let json = await response.json();

    if (json.result) {
      router.push('/become-a-host/' + itemId + '/price')
    }

  }



  const NextHandle = () => {
    if (description.length !== 0) {
      descriptionUpdate()
    }
  }
  let handleDescriptionList = (val: string) => {
    if (description.includes(val)) {
      setDescription(description.filter(one => val !== one))
    } else {
      setDescription([...description, val])
    }
  }

  const BackHandle = () => {
    router.push('/become-a-host/' + itemId + '/title')
  }

  let des = ['평화로움', '독특함', '가족이 지내기에 적합', '세련됨', '중심부에 위치', '넓은 공간'];

  return (<Grid component={"main"} container  >

    <Grid item sx={{ display: "flex", flex: 1, bgcolor: "black", color: "white", height: '100vh', alignItems: "center", justifyContent: "center" }}
    >
      <Typography component="h1" variant="h5" textAlign={"center"}>
      숙소의 특징이 잘 드러나는 문구를 선택해주세요. 
      </Typography>
    </Grid>


    <Grid item sx={{ display: "flex", flex: 1, flexDirection: "column", height: '100vh', pr: 10, pl: 10, justifyContent: "center" }}>
      <Box sx={{...outlineBox}}>
        {des.map((one, index) => {
          return (
            <DescriptionList item={one} key={index} onDes={handleDescriptionList} des={description} />
          )
        })}
</Box>
      <Box sx={{...buttonBox}}>
        <Button variant="contained" onClick={BackHandle} sx={{...button}}>뒤로</Button>
        <Button variant="contained" onClick={NextHandle} disabled={description.length === 0}  sx={{...button}}>다음</Button>
      </Box>
    </Grid>
  </Grid>);
}


const outlineBox = {
  display: 'flex',
  flexWrap: 'wrap',
  width: '100%',
  gap: 2
}


const button = {
  width: 10, mt: 5, mb: 5, bgcolor: 'black',
  '&:hover': { 'backgroundColor': '#333' }
}

const buttonBox = {
  display: 'flex', justifyContent: 'space-around'

}