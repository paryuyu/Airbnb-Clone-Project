import { Box, Typography } from '@mui/material'
import { useEffect, useState,useContext } from 'react';
import { BackDropContext } from '../../../pages/_app';
type props = {
  item: string;
  onItem: (that: string) => void;
  pri: string;

}

export default function PrivacyList({ item, onItem, pri }: props) {
  const [detail, setDetail] = useState<string>('');

  useEffect(() => {
    switch (item) {
      case '개인실':
        setDetail('게스트는 개인실에서 숙박하지만, 일부 공간은 호스트나 다른 사람과 함께 사용할 수 있습니다.')
        break;
      case '공간전체':
        setDetail('게스트가 숙소 전체를 단독으로 사용합니다.')
        break;
      case '다인실':
        setDetail('게스트가 개인 공간 없이 호스트나 다른 사람과 함께 쓰는 침실이나 공용 공간에서 숙박합니다.')
        break;
    }
  }, [item])



  const handleClick = () => {
    onItem(item)
  }

  return (<>
    {item === pri ?

      <Box sx={[{ ...styletwo }, { "&:hover": { borderColor: "black" } }]} onClick={handleClick}>
        <Typography fontSize={20}>{item}</Typography>
        <Typography sx={{ ...descriptionStyle }}>{detail}</Typography>
      </Box> :
      <Box sx={[{ ...style }, { "&:hover": { borderColor: "black" } }]} onClick={handleClick}>
        <Typography sx={{ ...propertyStyle }}>{item}</Typography>
        <Typography sx={{ ...descriptionStyle }}>{detail}</Typography>

      </Box>

    }
  </>
  );
}


const propertyStyle = {
  fontSize: 20

}
const descriptionStyle = {
  fontSize: 15

}

const style = {
  display: 'flex',
  border: '3px solid #ddd',
  borderRadius: '10px',
  width: 'calc((100% - 32px) / 3)',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  padding: 3,
}

const styletwo = {
  display: 'flex',
  border: '3px solid black',
  borderRadius: '10px',
  width: 'calc((100% - 32px) / 3)',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  padding: 3,
}
