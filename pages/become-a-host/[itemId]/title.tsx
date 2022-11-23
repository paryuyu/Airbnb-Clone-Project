import { Typography, Box, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { Textarea } from '@mui/joy';
import { useRouter } from "next/router";

export default function () {
  const [title, setTitle] = useState('');
  const [error, setError] = useState(false);
  const router = useRouter();
  const itemId = router.query.itemId as string;

  useEffect(() => {
    if (title.length >= 32) {
      setError(true)
    }

  }, [title])


  async function titleUpdate() {
    let response = await fetch('/api/accomodation/newUpdate?_id=' + itemId, {
      method: 'post',
      body: JSON.stringify({ title: title }),
      headers: { 'Content-type': 'application/json' }
    })
    let json = await response.json();

    if (json.result) {
      router.push('/become-a-host/' + itemId + '/description')
    }
  }

  const NextHandle = () => {
    if (title.length >= 32) {
      alert('32글자를 초과하셨습니다')
      setError(true)
    } else {
      titleUpdate()
    }
  }

  const BackHandle =()=>{
    router.push('/become-a-host/' + itemId + '/photos')
  }

  return (<Box sx={{ ...outlineBox}}>

      <Typography sx={{ fontSize: 25, fontWeight: 'bold' ,textAlign:'center',mb:3 }}>이제 place에 이름을 지⁠어⁠주⁠세⁠요
        숙소 이름은 짧을수록 효과적입니다.
      </Typography>

      <Typography sx={{ fontSize: 18, fontWeight: '100', color: 'grey',mb:1 }}>나중에 언제든지 변경할 수 있으니, 너무 걱정하지 마세요.</Typography>
      
      <Textarea
        value={title}
        onChange={(evt) => { setTitle(evt.currentTarget.value) }}
        placeholder="장소의 이름을 적어주세요."
        size="lg"
        error={error}
        endDecorator={<Typography sx={{ ml: 'auto', fontSize: 17, fontWeight: '100', color: 'grey' }} >{title.length} / 32</Typography>}
        sx={{
          height: 200,
          width: 400
        }}
      />
 <Typography sx={{ fontSize: 13, fontWeight: '100', color: 'grey',mt:1 , textAlign:'end'}}>32글자를 초과할 수 없습니다.
      </Typography>
    <Box>
      <Button onClick={BackHandle} >뒤로</Button>
      <Button onClick={NextHandle} disabled={title.length === 0}>다음</Button>
    </Box>
  </Box>);
}


const outlineBox = {
  display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '85vh', alignItems: 'center'
}