import { Typography, Box, Button, Modal } from "@mui/material";
import { useState, useEffect } from "react";
import { Textarea } from '@mui/joy';
import { useRouter } from "next/router";
import ToggleButton from '@mui/material/ToggleButton';
import DescriptionList from "../../../components/ui/description/description-list";
import { Grid } from "@mui/material";
import HostingModal from "../../../components/ui/hosting_modal/HostingModal";
export default function () {
  const [description, setDescription] = useState<string[]>([]);

  const router = useRouter();
  const itemId = router.query.itemId as string;

  async function descriptionUpdate() {
    let response = await fetch('/api/accomodation/newUpdate?_id=' + itemId, {
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
  const [open, setOpen] = useState<boolean>(false)
  const exitHandle = () => {

    setOpen(true)
  }


  return (<>

    <Box sx={{ display: 'flex', justifyContent: 'end', mr: 2, mt: 5 }}>
      <Button variant="contained" sx={[{ ...buttonSt }, { '&:hover': { backgroundColor: '#333' } }]} onClick={exitHandle}>저장 후 나가기</Button>
    </Box>

    <Typography sx={{ fontSize: 25, fontWeight: 'bold', textAlign: 'center', mb: 3 }}>
      숙소의 특징이 잘 드러나는 문구를 선택해주세요.
    </Typography>
    <Box sx={{ ...outlineBox }}>
      {des.map((one, index) => {
        return (
          <DescriptionList item={one} key={index} onDes={handleDescriptionList} des={description} />
        )
      })}
    </Box>
    <Box sx={{ ...buttonBox }}>
      <Button variant="contained" onClick={BackHandle} sx={{ ...button }}>뒤로</Button>
      <Button variant="contained" onClick={NextHandle} disabled={description.length === 0} sx={{ ...button }}>다음</Button>
    </Box>
    <Modal
      open={open}
      onClose={() => {
        setOpen(false)
      }
      }>
      <HostingModal onModal={() => { setOpen(false) }} />
    </Modal>
  </>);
}


const buttonBox = {
  display: 'flex', justifyContent: 'space-between',
  ml: 5, mr: 5
}

const button = {
  bgcolor: 'black',
  borderRadius: 5,
  width: 50,
  fontSize: 12,
  mt: 2, mb: 2,
  '&:hover': { 'backgroundColor': '#333' }
}
const outlineBox = {
  display: 'flex',
  flexWrap: 'wrap',
  width: '100%',
  gap: 2,
  padding: 2
}





const buttonSt = {
  bgcolor: 'black',
  borderRadius: 5,
  width: 120,
  fontSize: 12,
  mb: 2
}
