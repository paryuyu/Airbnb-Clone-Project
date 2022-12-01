import { Typography, Box, Button, Modal } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { Textarea } from '@mui/joy';
import { useRouter } from "next/router";
import ToggleButton from '@mui/material/ToggleButton';
import DescriptionList from "../../../components/ui/description/description-list";
import { Grid } from "@mui/material";
import HostingModal from "../../../components/ui/hosting_modal/HostingModal";
import FooterTwo from "../../../components/layout2/footer2";
import Head from "next/head";
import HeaderTwo from "../../../components/layout2/header2";
import NavTwo from "../../../components/layout2/nav2";
import { BackDropContext } from "../../_app";
export default function () {
  const [description, setDescription] = useState<string[]>([]);

  const BackCtx = useContext(BackDropContext);
  const router = useRouter();
  const itemId = router.query.itemId as string;

  async function descriptionUpdate() {
    BackCtx.setBackDrop(true)
    let response = await fetch('/api/accomodation/newUpdate?_id=' + itemId, {
      method: 'post',
      body: JSON.stringify({ description: description , step:9 }),
      headers: { 'Content-type': 'application/json' }
    })
    let json = await response.json();

    if (json.result) {
      BackCtx.setBackDrop(false)
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
    <Head><title>설명</title></Head>
    <HeaderTwo />
    <NavTwo onExit={exitHandle} />

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

    <FooterTwo onBack={BackHandle} onNext={NextHandle} datas={description.length} step={9} />

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
  mt: 2, mb: 2,
  '&:hover': { 'backgroundColor': '#333' }
}
const outlineBox = {
  display: 'flex',
  flexWrap: 'wrap',
  width: '60vw',
  margin: 'auto',
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
